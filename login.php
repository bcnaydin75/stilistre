<?php
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// Diğer kodlarınız...

// JSON çıktısı
header('Content-Type: application/json');

// Veritabanı bağlantısı
require_once 'db.php';

// Post verilerini al
$email = trim($_POST['email'] ?? '');
$password = trim($_POST['password'] ?? '');

if (empty($email) || empty($password)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'E-posta ve şifre zorunludur.'
    ]);
    exit;
}

// Kullanıcıyı bul
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Bu e-posta ile kayıtlı bir kullanıcı bulunamadı.'
    ]);
    exit;
}

$user = $result->fetch_assoc();

// Şifreyi kontrol et
if (!password_verify($password, $user['password'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Şifre yanlış.'
    ]);
    exit;
}

// Başarılı giriş
$_SESSION['user'] = [
    'id' => $user['id'],
    'username' => $user['username'],
    'email' => $user['email'],
    'role' => $user['role']
];

echo json_encode([
    'status' => 'success',
    'message' => 'Giriş Başarılı..'
]);
exit;
?>
