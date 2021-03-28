<?php

db_update_sfera($db_id, $text); 

sendRequest('sendMessage',['chat_id'=>$id_chat, 'text'=>"И последний вопрос - введите Вашу среднюю заработную плату", "reply_markup" =>$reply]);


echo 'done p3';




?>