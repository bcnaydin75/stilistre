<?php
// Hata ayıklama ayarları
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Veritabanı bağlantı dosyasını dahil et
include_once '../db.php';

// Sadece POST isteği ile erişime izin ver
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Geçersiz istek metodu.']);
    exit;
}

// Gelen JSON verisini al
$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['categoryName'])) {
    echo json_encode(['success' => false, 'message' => 'Kategori adı boş olamaz.']);
    exit;
}

$categoryName = mysqli_real_escape_string($conn, $data['categoryName']);
$status = "Aktif"; // Varsayılan olarak aktif yapabilirsiniz

// SQL sorgusunu hazırla ve çalıştır
$sql = "INSERT INTO categories (category_name, status) VALUES (?, ?)";
$stmt = mysqli_prepare($conn, $sql);

if ($stmt === false) {
    echo json_encode(['success' => false, 'message' => 'Sorgu hazırlanamadı: ' . mysqli_error($conn)]);
    exit;
}

mysqli_stmt_bind_param($stmt, "ss", $categoryName, $status);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(['success' => true, 'message' => 'Kategori başarıyla eklendi.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Kategori eklenirken bir hata oluştu: ' . mysqli_stmt_error($stmt)]);
}
mysqli_stmt_close($stmt);
mysqli_close($conn);

?>