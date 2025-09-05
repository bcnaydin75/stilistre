<?php
// Başlık ve hata raporlama ayarları
// Bu satırları ekledik, emin olun hala duruyorlar
error_reporting(E_ALL);
ini_set('display_errors', 1);

// ... devamı
header('Content-Type: application/json');

// Gelen veriyi kontrol etmek için hata raporlamayı aç
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Gerekli veritabanı dosyasını dahil et
require_once '../db.php'; 

// Gelen JSON verisini al
$json_input = file_get_contents('php://input');
$data = json_decode($json_input, true);

// Gelen veriyi kontrol etmek için loglama yapın
file_put_contents('delete_log.txt', "Gelen ham veri: " . $json_input . "\n", FILE_APPEND);
file_put_contents('delete_log.txt', "Çözümlenmiş veri: " . print_r($data, true) . "\n", FILE_APPEND);

$categoryId = $data['id'] ?? null;

// Kategori ID'si boşsa hata mesajı dön
if (!$categoryId) {
    echo json_encode(['success' => false, 'message' => 'Geçersiz kategori ID\'si.']);
    exit;
}
// delete_category.php
try {
    // Kategori silme sorgusunu hazırla ve çalıştır
    $stmt = $pdo->prepare("DELETE FROM categories WHERE id = :id");
    
    // Bu satırı ekleyerek gönderilen ID'yi tekrar kontrol edelim
    file_put_contents('delete_log.txt', "Silinecek ID: " . $categoryId . "\n", FILE_APPEND);

    $stmt->bindParam(':id', $categoryId, PDO::PARAM_INT);
    
    if ($stmt->execute()) {
        // execute() metodu başarılıysa, kaç satırın etkilendiğini kontrol edelim
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Kategori başarıyla silindi.']);
        } else {
            // Hiçbir satır silinmediyse
            echo json_encode(['success' => false, 'message' => 'Silinecek kategori bulunamadı.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Kategori silinirken bir hata oluştu.']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Veritabanı hatası: ' . $e->getMessage()]);
}
?>