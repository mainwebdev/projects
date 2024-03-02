<?php
  if(isset($_POST['phone'])) {
    $to = 'novabroker@gmail.com'; 
    $subject = 'Back call';
    $message = '
            <html lang="ru">
              <head>
                <title>'.$subject.'</title>
              </head>
              <body>
                <p><b>Phone:</b> '.$_POST['phone'].'</p>
              </body>
            </html>';
    $headers  = "Content-type: text/html; charset=utf-8 \r\n";
    $headers .= "From: Site <webmaster@example.com>\r\n";

    if (mail($to, $subject, $message, $headers)) {
      echo $message;
    } else {
      echo "<p>Error</p>";
    }
  } else {
    echo "<p>Error</p>";
  }
?>