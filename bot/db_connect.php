<?php
/*
$host = "localhost";
$password = "TvpbBV0Y";
$username = "a0526953_tg";
$databasename = "a0526953_tg";
*/

function db_get($id_client)
{

	$host = "localhost";
	$password = "TvpbBV0Y";
	$username = "a0526953_tg";
	$databasename = "a0526953_tg";

	$db = mysqli_connect($host, $username, $password, $databasename) or die("error: Failed_connect_database");

	$query = "SELECT * FROM `SellUsBot` WHERE `id_client` = '$id_client'";
	$result = mysqli_query($db, $query) or die("Ошибка " . mysqli_error($db));
	$row = mysqli_fetch_assoc($result);

	/* Освобождаем используемую память */
	mysqli_free_result($result);
	mysqli_close($db);
	return ($row);
};

//сохранить пользователя в БД
function db_set($id_client, $id_chat, $name)
{

	$host = "localhost";
	$password = "TvpbBV0Y";
	$username = "a0526953_tg";
	$databasename = "a0526953_tg";

	$db = mysqli_connect($host, $username, $password, $databasename) or die("error: Failed_connect_database");

	$query = "INSERT INTO `SellUsBot` (`id`, `First_name`, `id_chat`, `id_client`, `level`) VALUES (NULL, '" . $name . "', '" . $id_chat . "', '" . $id_client . "', '1');";
	$result = mysqli_query($db, $query) or die("Ошибка " . mysqli_error($db));
	$row = mysqli_fetch_assoc($result);

	/* Освобождаем используемую память */
	mysqli_free_result($result);
	mysqli_close($db);
	return ($row);
};

//редактирвоание БД
function db_update_reg($db_id, $id_region)
{

	$host = "localhost";
	$password = "TvpbBV0Y";
	$username = "a0526953_tg";
	$databasename = "a0526953_tg";

	$db = mysqli_connect($host, $username, $password, $databasename) or die("error: Failed_connect_database");


	$query = "UPDATE `SellUsBot` SET `level` = '3', `region` = '" . $id_region . "' WHERE `SellUsBot`.`id` = $db_id;";
	$result = mysqli_query($db, $query) or die("Ошибка " . mysqli_error($db));
	$row = mysqli_fetch_assoc($result);

	/* Освобождаем используемую память */
	mysqli_free_result($result);
	mysqli_close($db);
	return ($row);
};

function db_update_sfera($db_id, $sfera)
{

	$host = "localhost";
	$password = "TvpbBV0Y";
	$username = "a0526953_tg";
	$databasename = "a0526953_tg";

	$db = mysqli_connect($host, $username, $password, $databasename) or die("error: Failed_connect_database");


	$query = "UPDATE `SellUsBot` SET `level` = '4', `word` = '" . $sfera . "' WHERE `SellUsBot`.`id` = $db_id;";
	$result = mysqli_query($db, $query) or die("Ошибка " . mysqli_error($db));
	$row = mysqli_fetch_assoc($result);

	/* Освобождаем используемую память */
	mysqli_free_result($result);
	mysqli_close($db);
	return ($row);
};

function db_update_amount($db_id, $amount)
{

	$host = "localhost";
	$password = "TvpbBV0Y";
	$username = "a0526953_tg";
	$databasename = "a0526953_tg";

	$db = mysqli_connect($host, $username, $password, $databasename) or die("error: Failed_connect_database");


	$query = "UPDATE `SellUsBot` SET `level` = '6', `amount` = '" . $amount . "' WHERE `SellUsBot`.`id` = $db_id;";
	$result = mysqli_query($db, $query) or die("Ошибка " . mysqli_error($db));
	$row = mysqli_fetch_assoc($result);

	/* Освобождаем используемую память */
	mysqli_free_result($result);
	mysqli_close($db);
	return ($row);
};


function del_user($id_user)
{
	$host = "localhost";
	$password = "TvpbBV0Y";
	$username = "a0526953_tg";
	$databasename = "a0526953_tg";

	$db = mysqli_connect($host, $username, $password, $databasename) or die("error: Failed_connect_database");


	$query = "DELETE FROM SellUsBot WHERE id_client='$id_user'";
	$result = mysqli_query($db, $query);

	/* Освобождаем используемую память */
	mysqli_free_result($result);
	mysqli_close($db);

	if (empty(mysqli_error($db))) {
		return 'Выписан из налогоплательщиков!';
	} else {
		return 'Что-то пошло не так!';
	}
}

function db_update_lvl($db_id, $lvl)
{

	$host = "localhost";
	$password = "TvpbBV0Y";
	$username = "a0526953_tg";
	$databasename = "a0526953_tg";

	$db = mysqli_connect($host, $username, $password, $databasename) or die("error: Failed_connect_database");


	$query = "UPDATE `SellUsBot` SET `level` = '" . $lvl . "' WHERE `SellUsBot`.`id` = $db_id;";
	$result = mysqli_query($db, $query) or die("Ошибка " . mysqli_error($db));
	$row = mysqli_fetch_assoc($result);

	/* Освобождаем используемую память */
	mysqli_free_result($result);
	mysqli_close($db);
	return ($row);
};

// Отправка сообщения в Телеграмм
function sendRequest($metod, $param = [])
{
	if (!empty($param)) {
		$url = BASE_URL . $metod . '?' . http_build_query($param);
	} else {
		$url = BASE_URL . $metod;
	}
	return json_decode(
		file_get_contents($url),
		JSON_OBJECT_AS_ARRAY
	);
}

// функция логирования
function logging($array, $text = '')
{
	$log = date('d.m.Y H:i:s') . ' ' . $text . ' ' . print_r($array, true);
	file_put_contents(__DIR__ . '/log.txt', $log . PHP_EOL, FILE_APPEND);
}
