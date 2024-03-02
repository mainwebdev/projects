<?php
  if(!empty($_POST)) {
    $to = 'novabroker@gmail.com'; // novabroker@gmail.com
    $subject = 'Casco';

    $message = '
      <html lang="en">
        <head>
          <title>'.$subject.'</title>
        </head>
        <body>
          <h2>Casco<h2>
          <p><b>Cu franciză 5%:</b> '.$_POST['cu_franciza'].'</p>
          <p><b>Categorie tip:</b> '.$_POST['categorie_tip'].'</p>
          <p><b>An producere:</b> '.$_POST['an_producere'].'</p>
          <p><b>Autovehicul înmatriculat:</b> '.$_POST['autovehicul_inmatriculat'].'</p>
          <p><b>Valoare de piață a autovehiculului:</b> '.$_POST['valoare_autovehiculului'].'</p>
          <br/>
          <p><b>Persoană:</b> '.$_POST['person_type'].'</p>
          <p><b>Numele, Prenumele asiguratului:</b> '.$_POST['numele_prenumele'][0]['numele_prenumele'].'</p>
          <p><b>Numărul de telefon:</b> '.$_POST['telefon'].'</p>
          <p><b>Adresa de email:</b> '.$_POST['adresa_email'].'</p>
          <p><b>Vârsta minimă a persoanelor admise la conducere:</b> '.$_POST['varsta_minima'].'</p>
          <p><b>Stagiul minim al persoanelor admise la conducere</b> '.$_POST['stagiul_minim'].'</p>
          <p><b>Am avut accidente în trecut:</b> '.$_POST['accidente_in_trecut'].'</p>
          <p><b>De câte ori ați produs accidente în trecut?:</b> '.$_POST['de_cate_ori'].'</p>
          <p><b>Valabilitatea poliței CASCO:</b> '.$_POST['valabilitatea_politei'].'</p>
          <p><b>Valabilitatea poliței din data:</b> '.$_POST['valabilitatea_politei_date'].'</p>
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