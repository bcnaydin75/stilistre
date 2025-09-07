<?php
header('Content-Type: application/json');
require_once '../db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $productName = $_POST['product_name'];
        $categoryId = $_POST['category_id'];
        $price = $_POST['price'];
        $discountPrice = $_POST['discount_price'];
        $stock = $_POST['stock'];
        $brand = $_POST['brand'];
        $description = $_POST['description'];

        if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            $uploadDir = '../uploads/';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }

            $imageName = time() . '_' . basename($_FILES['image']['name']);
            $imagePath = $uploadDir . $imageName;

            if (!move_uploaded_file($_FILES['image']['tmp_name'], $imagePath)) {
                throw new Exception("Görsel yüklenemedi.");
            }

            $imageUrl = 'uploads/' . $imageName;

            $stmt = $pdo->prepare("INSERT INTO products (product_name, category_id, price, discount_price, stock, brand, description, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$productName, $categoryId, $price, $discountPrice, $stock, $brand, $description, $imageUrl]);

            echo json_encode(['success' => true]);
            exit;
        } else {
            throw new Exception("Görsel dosyası geçersiz.");
        }

    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        exit;
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Geçersiz istek.']);
    exit;
}
?>
