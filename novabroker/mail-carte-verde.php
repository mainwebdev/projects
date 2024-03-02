<?php
  if(!empty($_POST)) {
    $to = 'novabroker@gmail.com'; // novabroker@gmail.com
    $subject = 'CARTE VERDE';

    $message = '
      <html lang="ru">
        <head>
          <title>'.$subject.'</title>
        </head>
        <body>
          <h2>Carte Verde<h2>
          <p><b>Selectați zona de asigurare „Carte Verde”:</b> '.$_POST['selectati_zona'].'</p>
          <p><b>Selectați valabilitatea asigurării:</b> '.$_POST['valabilitatea_asigurarii'].'</p>
          <p><b>Indicați data contractului precedent:</b> '.$_POST['data_contractului_precedent'].'</p>
          <p><b>Valabilă din data:</b> '.$_POST['valabila_din_data'].'</p>
          <p><b>Tipul certificatului de înmatriculare:</b> '.$_POST['tipul_certificatului'].'</p>
          <p><b>Nr certificatului de înmatriculare:</b> '.$_POST['nr_certificatului'].'</p>
          <p><b>Nr de înregistrare:</b> '.$_POST['nr_de_inregistrare'].'</p>
          <p><b>Numele, Prenumele conducătorului:</b> '.$_POST['numele_prenumele'].'</p>
          <p><b>Posesorul vehiculului:</b> '.$_POST['posesorul_vehiculului'].'</p>
          <p><b>Codul personal:</b> '.$_POST['codul_personal'].'</p>
          <p><b>Dreptul de posesiune a atovehiculului:</b> '.$_POST['dreptul_de_posesiune_a_atovehiculului'].'</p>
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