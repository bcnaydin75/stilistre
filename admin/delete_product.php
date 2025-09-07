<?php
require_once '../db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['id'])) {
        $id = intval($_POST['id']);

        // Ürünü veritabanından sil
        $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
        $stmt->execute([$id]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Ürün başarıyla silindi.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Ürün bulunamadı.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Ürün ID belirtilmedi.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Geçersiz istek yöntemi.']);
}
?>
