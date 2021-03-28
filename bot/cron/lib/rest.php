<?php
require_once __DIR__ . '/var.php';


class GAV
{

    const VERSION = '2.0.0';

    /**
     * Сохранение данных в лог файл
     *
     * @param array $arData массив данных для записи
     * @param string $desc описание массива
     * @return boolean
     */
    public static function setLog($arData, $desc = '')
    {
        $return = false;

        if (defined('C_REST_LOGS_SAVE') and C_REST_LOGS_SAVE === true) {

            if (defined("C_REST_LOGS_DIR")) {
                $path = C_REST_LOGS_DIR;
            } else {
                $path = __DIR__ . '/logs/';
            }

            $path .= date("Y-m-d") . '.log';

            // if (!file_exists($path)) {
            //     @mkdir($path, 0775, true);
            // }

            $log = date('d.m.Y H:i:s') . ' ' . $desc . PHP_EOL . print_r($arData, true);
            $return = file_put_contents($path, $log . PHP_EOL, FILE_APPEND);
        }

        return $return;
    }



    public static function callCurl($params)
    {

        $url = C_REST_WEB_HOOK_URL;
        $agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36';

        $sPostFields = http_build_query($params);

        try {

            if ($sPostFields) {
                $url .= '?' . $sPostFields;
            }

            $obCurl = curl_init();
            curl_setopt($obCurl, CURLOPT_URL, $url);
            curl_setopt($obCurl, CURLOPT_USERAGENT, $agent);
            curl_setopt($obCurl, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($obCurl, CURLOPT_REFERER, 'http://zakupki.gov.ru');
  
            curl_setopt($obCurl, CURLOPT_USERAGENT, 'Sellus-Hackathon CRest PHP ' . rand(0, 1000));

            if (defined("C_REST_IGNORE_SSL") && C_REST_IGNORE_SSL === true) {
                curl_setopt($obCurl, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($obCurl, CURLOPT_SSL_VERIFYHOST, false);
            }

            $out = curl_exec($obCurl);
            $info = curl_getinfo($obCurl);

            if (curl_errno($obCurl)) {
                $info['curl_error'] = curl_error($obCurl);
            }

            $result = json_decode($out, true);

            curl_close($obCurl);

            if (!empty($info['curl_error'])) {
                $result['error'] = 'curl_error';
                $result['error_information'] = $info['curl_error'];
            }

            // static::setLog(
            //     [
            //         'url'    => $url,
            //         // 'info'   => $info,
            //         'params' => $params,
            //         'result' => $result
            //     ],
            //     'callCurl'
            // );

            return $result;
        } catch (Exception $e) {
            static::setLog(
                [
                    'message' => $e->getMessage(),
                    'code' => $e->getCode(),
                    'trace' => $e->getTrace(),
                    'params' => $params
                ],
                'exceptionCurl'
            );

            return [
                'error' => 'exception',
                'error_exception_code' => $e->getCode(),
                'error_information' => $e->getMessage(),
            ];
        }

        return [
            'error' => 'unknown error',
        ];
    }
}
