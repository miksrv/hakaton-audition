Часть 1
Давайте подведем итог того, как сейчас мы видим задачу:
Пользователь заполняет некоторую форму
По формуле: Налог = ((ЗП/0.87)*0.13) * кол-во месяцев
получаем искомую сумму налога
Делаем запрос на поиск выигранной закупки с фильтрами:
1. Дата
2. Регион
Сортировка по дате выиграша лота, по убыванию
Набираем закупки до суммы "Налог", пропуская закупки с "минус-словами"
Выводим пользователю список закупок с ссылками и информацией о ней
...
Часть 2
Приложение можно подключить через iframe на другие сайты, где оно так же рассчитывает/калькулирует
При подключении можно передать параметры, на основании которых можно сразу (минуя анкету) выводить значения
...
Часть 3
В приложении есть функция "поделиться результатами в соцсетях", которые будет делать небольшую публикацию
...
Часть 4
В приложении будет ссылка на Telegram-бот, при подписке - заполняем анкету и подписываемся на формат ежемесячных уведомлений
Раз в месяц (например 10ого числа, как у большинства ЗП) приложение будет брать получаемый налог по формуле ((ЗП/0.87)*0.13) * 1, находить случайный лот в закупках за текущий месяц и делать расчет по принципу:
Находим кол-во людей: (Сумма выигранной закупки - Налог)/ (СреднююЗпПоРегионуЗП/0.87)*0.13) * 1, округляем остаток >0 до следующего целого числа
Выводим сообщение:
Вы и НайденноеКол-воЛюдей в месяц.год обеспечили город:
выигранная закупка и ссылка