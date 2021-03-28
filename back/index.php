<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

require_once __DIR__ . '/lib/rest.php';


/**
 * Налог = ((ЗП/0.87)*0.13) * кол-во месяцев
 */
function calc_price($amount, $month)
{
    $ndfl = (($amount / 0.87) * 0.13) * $month;
    $error = $ndfl * 0.15;      //погрешность

    $min_price = $ndfl - $error;
    $max_price = $ndfl + $error;

    return [
        'min' => ceil($min_price),
        'max' => ceil($max_price),
        'ndfl' => ceil($ndfl)
    ];
}


function get_contract($filter, $month = false, $word = false, $price = false)
{
    $res = GAV::callCurl($filter);

    if (!empty($res)) {

        // GAV::setLog($res, '123');

        return $res;
    } elseif ($month) {

        $date_start = ((new DateTime()))->modify("-" . MAX_DATE . " month");
        $date_end = $GLOBALS['date_end'];
        $filter['daterange'] = $date_start->format('d.m.Y') . '-' . $date_end->format('d.m.Y');

        $res = get_contract($filter, false, true);
        return $res;
    } elseif ($word) {

        unset($filter['productsearchlist']);
        $res = get_contract($filter, false, false, true);
        return $res;
    } elseif ($price) {

        unset($filter['pricerange']);
        $filter['sort'] = 'price';

        $res = get_contract($filter, false, false, false);
        return $res;
    } else {
        return 'false';
    }
}


function create_response($contract, $code = '', $body = [])
{
    global $prices;
    $other = ($contract['price'] > ($prices['ndfl'] * 2)) ? ceil($contract['price'] / $prices['ndfl']) - 1 : 0;

    $response = [
        'product' => str_replace(array("\r\n", "\r", "\n"), ' ', htmlspecialchars($contract['products'][0]['name'])),
        'customerName' => str_replace(array("\r\n", "\r", "\n"), ' ', htmlspecialchars($contract['customer']['fullName'])),
        'customerAddress' => str_replace(array("\r\n", "\r", "\n"), ' ', htmlspecialchars($contract['customer']['postalAddress'])),
        'execution' => [
            'startDate' => $contract['execution']['startDate'],
            'endDate' => $contract['execution']['endDate'],
        ],
        'price' => $contract['price'],
        'ndfl' => $prices['ndfl'],
        // 'url' => $contract['contractUrl'],
        'url' => 'https://spending.gov.ru/goscontracts/contracts/' . $contract['regNum'] . '/',
        'other' => $other,
        'code' => $code,
        'response' => [
            'amount' => $body['amount'],
            'start'  => $body['start']
        ]
    ];

    return $response;
}


$body = json_decode(file_get_contents('php://input'), true);
define('MAX_DATE', 12);


// $_GET = [
//     [
//         'id' => 50,
//         'First_name' => 'Всеволод',
//         'id_chat' => '216251169',
//         'id_client' => '216251169',
//         'level' => 6,
//         'region' => 61,
//         'word' => 'Сельское хозяйство',
//         'amount' => 51460
//     ],
//     [
//         'id' => 51,
//         'First_name' => 'Михаил',
//         'id_chat' => '1292510801',
//         'id_client' => '1292510801',
//         'level' => 6,
//         'region' => 56,
//         'word' => 'IT',
//         'amount' => 30000,
//     ]

// ];

if (!empty($body)) {


    $words = json_decode(file_get_contents(__DIR__ . '/data/word.json'), true);

    $date_end = new DateTime();
    $date_start = (new DateTime())->modify('-3 month');

    $prices = calc_price($body['amount'], $body['start']);

    $filter = [
        'pricerange' => $prices['min'] . '-' . $prices['max'],
        'currentstage' => 'EC',
        'customerregion' => ($body['region'] < 10) ? "0" . $body['region'] : $body['region'],
        'daterange' => $date_start->format('d.m.Y') . '-' . $date_end->format('d.m.Y'),
        'productsearchlist' => $words[$body['word']],
        'sort' => '-signDate',
        'perpage' => 1,
    ];

    $contract = get_contract($filter, true)['contracts']['data'][0];
    // GAV::setLog($contract);

    //сохранение данных в дб
    $code = substr(sha1(time()), 0, 16);

    $response = create_response($contract, $code, $body);

    $db_data = json_encode($response, JSON_UNESCAPED_UNICODE);


    $db = mysqli_connect($host, $username, $password, $databasename);
    $query = "INSERT INTO share VALUES(null, '$code', null, '$db_data')";
    $result = mysqli_query($db, $query);

    /* Освобождаем используемую память */
    mysqli_free_result($result);
    mysqli_close($db);


    header('Content-Type: application/json');

    // GAV::setLog(json_decode($response, true));

    echo json_encode($response);
} elseif (!empty($_GET)) {

    $words = json_decode(file_get_contents(__DIR__ . '/data/word.json'), true);
    $data = $_GET;

    for ($i = 0; $i < count($data); $i++) {
        $date_end = new DateTime();
        $date_start = (new DateTime())->modify('-3 month');

        $prices = calc_price($data[$i]['amount'], 1);

        $filter = [
            // 'pricerange' => $prices['min'] . '-' . $prices['max'],
            'currentstage' => 'EC',
            'customerregion' => $data[$i]['region'],
            'daterange' => $date_start->format('d.m.Y') . '-' . $date_end->format('d.m.Y'),
            'productsearchlist' => $words[$data[$i]['word']],
            'sort' => '-signDate',
            // 'perpage' => 50,
        ];

        $contract = get_contract($filter, false, true)['contracts']['data'];

        $index = array_rand($contract);
        $code = substr(sha1(time()), 0, 16);

        $data[$i]['response'] = create_response($contract[$index], $code, ['amount' => $data[$i]['amount'], 'start' => 1]);

        $db_data = json_encode($data[$i]['response'], JSON_UNESCAPED_UNICODE);


        $db = mysqli_connect($host, $username, $password, $databasename);
        $query = "INSERT INTO share VALUES(null, '$code', null, '$db_data')";
        $result = mysqli_query($db, $query);

        /* Освобождаем используемую память */
        mysqli_free_result($result);
        mysqli_close($db);
    }

    echo json_encode($data);
}
