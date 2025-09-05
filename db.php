<?php
// Hata raporlamayı aç
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
    // Veritabanı bağlantı bilgileri
    $host = "localhost";
    $user = "root";
    $pass = "";
    $db   = "stilistredb";
    $charset = 'utf8mb4';

    // DSN (Veri Kaynağı Adı)
    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";

    // PDO seçenekleri
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Hataları istisna olarak göster
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,      // Varsayılan getirme modunu ayarla
        PDO::ATTR_EMULATE_PREPARES   => false,                // Hazırlanmış deyimleri kapat
    ];

    // PDO bağlantısı oluştur
    $pdo = new PDO($dsn, $user, $pass, $options);

} catch (\PDOException $e) {
    // Bağlantı hatası durumunda JSON formatında hata dön
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => 'Veritabanı bağlantı hatası: ' . $e->getMessage()]);
    exit;
}
?>