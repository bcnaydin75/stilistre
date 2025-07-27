<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$host = "localhost";
$user = "root";
$pass = "";
$db   = "stilistredb";

$conn = mysqli_connect($host, $user, $pass, $db);

if (!$conn) {
    die("Veritabanına bağlanılamadı: " . mysqli_connect_error());
}

// Türkçe karakter desteği için:
mysqli_set_charset($conn, "utf8mb4");
?>
