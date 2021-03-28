<?php



sendRequest('sendMessage',['chat_id'=>$id_chat, 'text'=>"$first_name, спасибо за регистрацию!"]);
sendRequest('sendMessage',['chat_id'=>$id_chat, 'text'=>"Раз в месяц мы будем отправлять Вам информацию об использовании налога НДФЛ по введенным значениям"]);
sendRequest('sendMessage',['chat_id'=>$id_chat, 'text'=>"Вы сами можете убедиться, на какие нужды расходуются налоги и как Вы помогаете региону стать лучше!"]);
sendRequest('sendMessage',['chat_id'=>$id_chat, 'text'=>"Приятного дня!"]);

db_update_amount($db_id, $text);


?>