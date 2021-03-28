<?php
 
$i=0; //маршрутизатор


const TOKEN = '1599671048:AAGTBYLmiAgVjx4goqeha1j15woK-wSEJNA';
const BASE_URL = 'https://api.telegram.org/bot' . TOKEN . '/';

include 'db_connect.php'; // подключаем функции БД


include('https://github.com/TelegramBot/Api.git');
$update = json_decode(file_get_contents('php://input'), JSON_OBJECT_AS_ARRAY);


logging($update);

$id_chat = $update['message']['chat']['id']; // ID чата Телеграмм
$id_client = $update['message']['from']['id']; // ID пользователя
$text = $update['message']['text']; //Текст

if ($text == '/start') {
		include 'part_start.php';
 };

$i=db_get($id_client);

$first_name = $i['First_name'];
$db_id=$i['id'];
$i=$i['level'];

logging($i);
//$i=4;
switch ($i) {
	case 0:
        include 'part0.php';
        break;
    case 1:
        include 'part1.php';
        break;
    case 2:
        include 'part2.php';
        break;
    case 3:
        include 'part3.php';
        break;
    case 4:
        include 'part4.php';
        break;
    case 5:
        include 'part5.php';
        break;

}






?>
