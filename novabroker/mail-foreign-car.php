<?php
  if(!empty($_POST)) {
    $to = 'mymail@gmail.com'; // novabroker@gmail.com
    $subject = 'Polița de asigurare a Bunurilor';

    $message = '
      <html lang="en">
        <head>
          <title>'.$subject.'</title>
        </head>
        <body>
          <h2>Polița de asigurare a Bunurilor<h2>
          <p><b>Obiectul asigurării:</b> '.$_POST['obiectul_asigurarii'].'</p>
          <p><b>Riscuri de asigurare:</b> '.$_POST['riscuri_de_asigurare'].'</p>
          <p><b>Valoarea pe piață a bunului:</b> '.$_POST['valoare_bunului'].'</p>
          <p><b>Persoană:</b> '.$_POST['person_type'].'</p>
          <p><b>Numele, Prenumele asiguratului:</b> '.$_POST['numele_prenumele'].'</p>
          <p><b>Numărul de telefon:</b> '.$_POST['telefon'].'</p>
          <p><b>Adresa de email:</b> '.$_POST['adresa_email'].'</p>
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