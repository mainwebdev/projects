<?php
  if((isset($_POST['name'])) && (isset($_POST['company'])) && (isset($_POST['email'])&& $_POST['message']!="")) {
    $to = 'email@gmail.com';
    $subject = 'Get users';

    $message = '
      <html lang="en">
        <head>
          <title>'.$subject.'</title>
        </head>
        <body>
          <h2>Get users<h2>
          <p>Имя: '. $_POST['name'] .'</p>
          <p>Фамилия: '. $_POST['company'] .'</p>
          <p>Email: '. $_POST['email'] .'</p>
          <p>Email: '. $_POST['message'] .'</p>
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