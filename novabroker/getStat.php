<?php
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
    header('Content-type: application/json');

    date_default_timezone_set('Europe/Chisinau');
    function setCurs(){
        global $conn;
        $date  = date('Y-m-d');
        $date_parse  = date('d.m.Y');
        $content =simplexml_load_file ('http://bnm.md/ro/official_exchange_rates?get_xml=1&date='.$date_parse);
        echo "[";
        $counter=0;
        foreach ($content->Valute as $key => $value) {
            if($counter) echo ",";
            echo json_encode($value);
            $counter++;
        }
        echo "]";
    }
    setCurs();
?>