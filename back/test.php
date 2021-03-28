<?php
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
    $res = GAV::callCurl($filter)['contracts']['data'][0];

    if (!empty($res)) {
        return $res;
    } elseif ($month) {

        $date_start = ((new DateTime()))->modify("-" . MAX_DATE . " month");
        $date_end = $GLOBALS['date_end'];
        $filter['daterange'] = $date_start->format('d.m.Y') . '-' . $date_end->format('d.m.Y');

        $res = get_contract($filter, false, true);
        return $res;
    } elseif ($word) {

        unset($filter['productsearch']);
        $res = get_contract($filter, false, false, true);
        return $res;
    } elseif ($price) {

        unset($filter['pricerange']);
        $filter['sort'] = 'price';

        $res = get_contract($filter);
        return $res;
    } else {
        return 'false';
    }
}


function create_response($contract)
{
    global $prices;
    $other = ($prices['ndfl'] < ($contract['price'] * 2)) ? ceil($contract['price'] / $prices['ndfl']) : 0;

    $response = [
        'product' => $contract['products'][0]['name'],
        'customerName' => $contract['customer']['fullName'],
        'customerAddress' => $contract['customer']['postalAddress'],
        'execution' => [
            'startDate' => $contract['execution']['startDate'],
            'endDate' => $contract['execution']['endDate'],
        ],
        'price' => $contract['price'],
        'ndfl' => $prices['ndfl'],
        'url' => $contract['contractUrl'],
        'other' => $other
    ];

    return $response;
}


$body = [
    'start' => 8,
    'region' => 56,
    'amount' => 34000,
    'word' => 'Красота',
];

if (!empty($body)) {

    define('MAX_DATE', 12);
    $words = json_decode(file_get_contents(__DIR__ . '/data/word.json'), true);

    $date_end = new DateTime();
    $date_start = (new DateTime())->modify('-3 month');

    $prices = calc_price($body['amount'], $body['start']);

    $filter = [
        'pricerange' => $prices['min'] . '-' . $prices['max'],
        'currentstage' => 'EC',
        'customerregion' => $body['region'],
        'daterange' => $date_start->format('d.m.Y') . '-' . $date_end->format('d.m.Y'),
        'productsearchlist' => $words[$body['word']],
        'sort' => '-signDate',
        'perpage' => 1,
    ];

    $contract = get_contract($filter, true);
    $response = (create_response($contract));

    print_r($response);

    // //сохранение данных в дб
    // $code = substr(sha1(time()), 0, 16);
    // $db = mysqli_connect($host, $username, $password, $databasename);

    // $query = "INSERT INTO share VALUES(null, '$code', '$response', null)";

    // $result = mysqli_query($db, $query);

    // /* Освобождаем используемую память */
    // mysqli_free_result($result);
    // mysqli_close($db);
}
