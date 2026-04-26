<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Capturamos usando los nombres exactos de los inputs del index
    $_SESSION['datos_registro'] = [
        'nombre' => $_POST['fname'],
        'segundo_nombre' => $_POST['sname'],
        'email' => $_POST['email']
    ];

    header("Location: register.php"); 
    exit();
}