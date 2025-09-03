<?php
// Hata ayıklama ayarları
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Veritabanı bağlantısını dahil et
include_once 'db.php';

// Sadece POST isteği ile erişime izin ver
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Geçersiz istek metodu.']);
    exit;
}

// category_id POST verisini kontrol et
if (!isset($_POST['category_id']) || empty($_POST['category_id'])) {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'message' => 'Kategori ID\'si eksik.']);
    exit;
}

$category_id = intval($_POST['category_id']);

try {
    // Veritabanı işlemleri: Önce kategoriye ait ürünlerin kategori ID'sini NULL yap
    // Bu, ürünlerin kaybolmasını önler ve kategori silinse bile ürünlerin kalmasını sağlar
    $update_query = "UPDATE products SET category_id = NULL WHERE category_id = ?";
    $stmt_update = mysqli_prepare($conn, $update_query);
    mysqli_stmt_bind_param($stmt_update, "i", $category_id);
    mysqli_stmt_execute($stmt_update);
    mysqli_stmt_close($stmt_update);

    // Kategori tablosundan ilgili kategoriyi sil
    $delete_query = "DELETE FROM categories WHERE id = ?";
    $stmt_delete = mysqli_prepare($conn, $delete_query);
    mysqli_stmt_bind_param($stmt_delete, "i", $category_id);
    
    if (mysqli_stmt_execute($stmt_delete)) {
        // Silme başarılıysa
        echo json_encode(['success' => true, 'message' => 'Kategori başarıyla silindi.']);
    } else {
        // Silme başarısızsa
        http_response_code(500); // Internal Server Error
        echo json_encode(['success' => false, 'message' => 'Kategori silinirken bir hata oluştu: ' . mysqli_error($conn)]);
    }
    
    mysqli_stmt_close($stmt_delete);

} catch (Exception $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['success' => false, 'message' => 'Veritabanı hatası: ' . $e->getMessage()]);
}

// Veritabanı bağlantısını kapat
mysqli_close($conn);
?>