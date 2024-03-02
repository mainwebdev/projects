<?php
  if(!empty($_POST)) {
    $to = 'novabroker@gmail.com'; // novabroker@gmail.com
    $subject = 'RCA';

    $message = '
      <html lang="en">
        <head>
          <title>'.$subject.'</title>
        </head>
        <body>
          <h2>RCA<h2>
          <p><b>Autovehicul înmatriculat:</b> '.$_POST['autovehicul_inmatriculat'].'</p>
          <p><b>Posesorul autovehicolului:</b> '.$_POST['posesorul_autovehicolului'].'</p>
          <p><b>Domiciliul persoanei asigurate:</b> '.$_POST['domiciliul_persoanei_asigurate'].'</p>
          <p><b>Tipul autovehiculului:</b> '.$_POST['tipul_autovehiculului'].'</p>
          <p><b>Capacitatea cilindrică:</b> '.$_POST['capacitatea_cilindrica'].'</p>
          <p><b>Numărul persoanelor:</b> '.$_POST['numarul_persoanelor'].'</p>
          <p><b>Valabilitatea poliței:</b> '.$_POST['valabilitatea_politei'].'</p>
          <p><b>Date despre conducători:</b></p>
          <ul>
            <li><b> - Stagiul minim persoanelor: </b>'.$_POST['date_despre_conducatori'][0]['stagiul_minim_persoanelor'].'</li>
            <li><b> - Varsta minima: </b>'.$_POST['date_despre_conducatori'][0]['varsta_minima'].'</li>
            <li><b> - De cate ori ati produs accidente in trecut: </b>'.$_POST['date_despre_conducatori'][0]['de_cate_ori_ati_produs_accidente_in_trecut'].'</li>
            <li><b> - Anii in care ati avut asigurare rca: </b>'.$_POST['date_despre_conducatori'][0]['anii_in_care_ati_avut_asigurare_rca'].'</li>
          </ul>

          <p><b>Tipul certificatului de înmatriculare:</b> '.$_POST['tipul_certificatului_de_inmatriculare'].'</p>
          <p><b>Nr certificatului de înmatriculare:</b> '.$_POST['nr_de_inregistrare'].'</p>
          <p><b>Nr de înregistrare:</b> '.$_POST['Nr_de_înregistrare'].'</p>
          <p><b>Date despre conducători:</b></p>
          <ul>
            <li><b> - Numele prenumele: </b>'.$_POST['conducatori_auto'][0]['numele_prenumele'].'</li>
            <li><b> - Codul personal: </b>'.$_POST['conducatori_auto'][0]['codul_personal'].'</li>
            <li><b> - Dreptul de posesiune a atovehiculului: </b>'.$_POST['conducatori_auto'][0]['dreptul_de_posesiune_a_atovehiculului'].'</li>
          </ul>

          <p><b>Livrare:</b> '.$_POST['livrare'].'</p>
          <p><b>Nume, Prenume:</b> '.$_POST['nume_prenume'].'</p>
          <p><b>Adresa Email:</b> '.$_POST['adresa_email'].'</p>
          <p><b>Telefon:</b> '.$_POST['telefon'].'</p>
          <p><b>data contractului precedent:</b> '.$_POST['data_contractului_precedent'].'</p>
          <p><b>adresa de ridicare:</b> '.$_POST['adresa_de_ridicare'].'</p>
          <p><b>Oraș:</b> '.$_POST['oras'].'</p>
          <p><b>Strada:</b> '.$_POST['strada'].'</p>
          <p><b>Nr:</b> '.$_POST['nr'].'</p>
          <p><b>Blocul:</b> '.$_POST['blocul'].'</p>
          <p><b>Scara:</b> '.$_POST['scara'].'</p>
          <p><b>Apartamentul:</b> '.$_POST['apartamentul'].'</p>
          <p><b>Plata cu cardul:</b> '.$_POST['apartamentul'].'</p>
          <p><b>Achitare prin curier:</b> '.$_POST['apartamentul'].'</p>
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