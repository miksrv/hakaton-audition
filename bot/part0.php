<?php




$name=$text;

$f=db_set($id_client, $id_chat, $name);








$keyboard = [
    ['Центральный','Северо-Западный'],
    ['Южный','Северо-Кавказский',],
    ['Приволжский', 'Уральский'],
    ['Сибирский', 'Дальневосточный'],
];





$resp = array("keyboard" => $keyboard, "resize_keyboard" => true, "one_time_keyboard" => true); 

$reply = json_encode($resp);



sendRequest('sendMessage',['chat_id'=>$id_chat, 'text'=>"Приятно познакомиться!"]);

sendRequest('sendMessage',['chat_id'=>$id_chat, 'text'=>"Выберите, в каком округе Вы проживаете?", "reply_markup" =>$reply]);





echo 'done p0';
