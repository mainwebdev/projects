<?php
  if(!empty($_POST)) {
    $to = 'novabroker@gmail.com'; // novabroker@gmail.com
    $subject = 'Med';

    $message = '
      <html lang="en">
        <head>
          <title>'.$subject.'</title>
        </head>
        <body>
          <h2>Med<h2>

          <p><b>Teritoriul asigurat:</b> '.$_POST['teritoriul_asigurat'].'</p>
          <p><b>Suma de asigurare:</b> '.$_POST['suma_de_asigurare'].'</p>
          <p><b>Călătorii multiple:</b> '.$_POST['calatorii_multiple'].'</p>
          <p><b>Nr. de zile asigurate:</b> '.$_POST['nr_de_zile_asigurate'].'</p>
          <p><b>Data începerii asigurării:</b> '.$_POST['data_asigurarii']['from'].'</p>
          <p><b>Data finală a asigurării:</b> '.$_POST['data_asigurarii']['to'].'</p>
          <p><b>Scopul călătoriei:</b> '.$_POST['scopul_calatoriei'].'</p>
          <p><b>Călători:</b></p>
          <ul>
            <li><b> - Nume, Prenumele: </b>'.$_POST['travels'][0]['nume_prenumele'].'</li>
            <li><b> - Vârsta: </b>'.$_POST['travels'][0]['varsta'].'</li>
          </ul>
          <p><b>Riscul anulării călătoriei:</b> '.$_POST['riscul_anularii_calatoriei'].'</p>
          <p><b>Asigurarea bagajului:</b> '.$_POST['asigurarea_bagajului'].'</p>
          <p><b>Asiguratul:</b></p>
          <ul>
            <li><b> - Numele, Prenumele asiguratului: </b>'.$_POST['asiguratul'][0]['numele_prenumele'].'</li>
            <li><b> - Data nașterii: </b>'.$_POST['asiguratul'][0]['data_nasterii'].'</li>
            <li><b> - Nr. Pașaportului 1: </b>'.$_POST['asiguratul'][0]['nr_pasaportului_1'].'</li>
            <li><b> - Nr. Pașaportului 2: </b>'.$_POST['asiguratul'][0]['nr_pasaportului_2'].'</li>
            <li><b> - Domiciliul: </b>'.$_POST['asiguratul'][0]['domiciliul'].'</li>
          </ul>
          <p><b>Completează livrarea:</b> '.$_POST['livrare'].'</p>
          <p><b>Nume, Prenume:</b> '.$_POST['nume_prenume'].'</p>
          <p><b>Adresa Email:</b> '.$_POST['adresa_email'].'</p>
          <p><b>Telefon:</b> '.$_POST['telefon'].'</p>
          <p><b>Alege adresa de ridicare:</b> '.$_POST['adresa_de_ridicare'].'</p>
          <p><b>Oraș:</b> '.$_POST['oras'].'</p>
          <p><b>Strada:</b> '.$_POST['strada'].'</p>
          <p><b>Nr:</b> '.$_POST['nr'].'</p>
          <p><b>Blocul:</b> '.$_POST['blocul'].'</p>
          <p><b>Scara:</b> '.$_POST['scara'].'</p>
          <p><b>Apartamentul:</b> '.$_POST['apartamentul'].'</p>
          <p><b>Plata cu cardul:</b> '.$_POST['plata_cu_cardul'].'</p>
          <p><b>Achitare prin curier:</b> '.$_POST['achitare_prin_curier'].'</p>
        </body>
      </html>';

    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8 \r\n";
    $headers .= "From: Site <webmaster@example.com>\r\n";

    if (mail($to, $subject, $message, $headers)) {
      echo $message;
    } else {
      echo "<p>Error on mail send</p>";
    }
  } else {
    echo "<p>Error on ajax</p>";
  }
?>