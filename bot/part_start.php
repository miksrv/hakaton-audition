<?php


sendRequest('sendMessage',['chat_id'=>$id_chat, 'text'=>'Добро пожаловать в "Калькулятор расчета налогов от "Sell-us"']);
sendRequest('sendMessage',['chat_id'=>$id_chat, 'text'=>'В этом сервисе можно получать уведомления о том, как с помощью Ваших налогов НДФЛ Ваш регион становится лучше!']);
sendRequest('sendMessage',['chat_id'=>$id_chat, 'text'=>'Перед тем как начать, подскажите, как к Вам обращаться?']);




exit;



?>