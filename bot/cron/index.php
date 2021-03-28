<?php
require_once __DIR__ . '/lib/rest.php';


/**
 * Запрос в телеграм
 *
 * @param string $method имя метода
 * @param array $params массив параметров
 * @return void
 */
function request_to_telegram($method, $params = null)
{
    $ch = curl_init();
    curl_setopt_array(
        $ch,
        array(
            CURLOPT_URL => 'https://api.telegram.org/bot' . TELEGRAM_TOKEN . '/' . $method,
            CURLOPT_POST => TRUE,
            CURLOPT_RETURNTRANSFER => TRUE,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_POSTFIELDS => $params
        )
    );
    $respon = json_decode(curl_exec($ch), true);

    return $respon;
}


/**
 * Сообщение от бота
 *
 * @param string $text сообщение пользователя
 * @return void
 */
function message_to_telegram($text, $chat_id, $reply = null)
{
    request_to_telegram('sendMessage', array('chat_id' => $chat_id, 'text' => $text, 'reply_markup' => $reply));
}


$db = mysqli_connect($host, $username, $password, $databasename);


$query = "SELECT * FROM SellUsBot";
$result = mysqli_query($db, $query);

while ($row = mysqli_fetch_assoc($result)) {
    $curl[] = $row;
};

$contracts = GAV::callCurl($curl);

print_r($contracts);

for ($i = 0; $i < count($contracts); $i++) {

    $text = '';
    if ($contracts[$i]['response']['other'] > 0) {
        $text = "Вы и " . $contracts[$i]['response']['other'] . ' человек поучавствовали в закупке!';
        message_to_telegram($text, $contracts[$i]['id_chat']);
    }
    message_to_telegram("Учреждение: " . $contracts[$i]['response']['customerName'] . ' приобрело ' . $contracts[$i]['response']['product'], $contracts[$i]['id_chat']);

    message_to_telegram('Детали доступны по ссылке: ' . $contracts[$i]['response']['url'], $contracts[$i]['id_chat']);

    message_to_telegram('Вы также можете поделиться своими результатами, используя ссылку: https://sellus-hackathon.ru/id/' . $contracts[$i]['response']['code'], $contracts[$i]['id_chat']);
}
