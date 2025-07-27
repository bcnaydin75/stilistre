<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

require_once 'db.php'; // mysqli bağlantı (önceki verdiğim db.php)

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$confirm = $_POST['confirm'] ?? '';

if (!$name || !$email || !$password || !$confirm) {
    echo json_encode(['status' => 'error', 'message' => 'Lütfen tüm alanları doldurun.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status' => 'error', 'message' => 'Geçerli bir e-posta girin.']);
    exit;
}

if ($password !== $confirm) {
    echo json_encode(['status' => 'error', 'message' => 'Şifreler uyuşmuyor.']);
    exit;
}

if (strlen($password) < 6) {
    echo json_encode(['status' => 'error', 'message' => 'Şifre en az 6 karakter olmalı.']);
    exit;
}

// email var mı kontrol et
$sql = "SELECT id FROM users WHERE email = ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, 's', $email);
mysqli_stmt_execute($stmt);
mysqli_stmt_store_result($stmt);

if (mysqli_stmt_num_rows($stmt) > 0) {
    echo json_encode(['status' => 'error', 'message' => 'Bu e-posta zaten kayıtlı.']);
    exit;
}

mysqli_stmt_close($stmt);

// şifreyi hashle ve ekle
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'user')";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, 'sss', $name, $email, $hashedPassword);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(['status' => 'success', 'message' => 'Kayıt başarılı. Giriş yapabilirsiniz.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Bir hata oluştu, lütfen tekrar deneyin.']);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
