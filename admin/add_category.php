<?php
// Hata raporlamayı aç
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Veritabanı bağlantısını içeriyor (PDO bağlantısı sağlanmalı)
require_once __DIR__ . '/../db.php';

header('Content-Type: application/json');

// Sadece POST isteği ile çalışmasını sağla
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Geçersiz istek metodu.']);
    exit;
}

// Gelen veriyi al ve boş olup olmadığını kontrol et
$data = json_decode(file_get_contents("php://input"), true);
$categoryName = $data['categoryName'] ?? '';

if (empty($categoryName)) {
    echo json_encode(['success' => false, 'message' => 'Kategori adı boş olamaz.']);
    exit;
}

try {
    // Veritabanı bağlantısı `db.php`'den geliyor ve adı `$pdo`
    if (!isset($pdo)) {
        throw new Exception("Veritabanı bağlantısı kurulamadı. Lütfen db.php dosyasını kontrol edin.");
    }

    // SQL enjeksiyonuna karşı korumalı prepared statement kullan
    $stmt = $pdo->prepare("INSERT INTO categories (category_name) VALUES (?)");
    
    // Değerleri bağla
    $stmt->execute([$categoryName]);

    // Başarılı olursa son eklenen ID'yi al
    $newCategoryId = $pdo->lastInsertId();

    echo json_encode([
        'success' => true,
        'message' => 'Kategori başarıyla eklendi.',
        'id' => $newCategoryId,
        'category_name' => $categoryName
    ]);

} catch (PDOException $e) {
    // PDO hatalarını yakala
    echo json_encode(['success' => false, 'message' => 'Veritabanı hatası: ' . $e->getMessage()]);
} catch (Exception $e) {
    // Diğer genel hataları yakala
    echo json_encode(['success' => false, 'message' => 'Hata: ' . $e->getMessage()]);
}
?>