<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

require_once __DIR__ . '/lib/rest.php';


if (!empty($_GET['code'])) {

    $code = $_GET['code'];
    $db = mysqli_connect($host, $username, $password, $databasename);
    $query = "SELECT * FROM share WHERE code='$code'";

    $result = mysqli_fetch_assoc(mysqli_query($db, $query));

    if (!empty($result)) {

        $response = $result['json'];

        header('Content-Type: application/json');

        print_r($response);
    } else {
        echo 'Ничего не найдено';
    }
}
