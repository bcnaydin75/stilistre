<?php
// Hata ayıklama ayarlarını aç
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Veritabanı bağlantı dosyasını dahil et
// Bu dosya artık PDO bağlantısı sağlamalıdır.
include_once '../db.php';

// Veritabanı bağlantısını kontrol et
// include_once ile hata oluşursa PHP bir uyarı verir.
// `$pdo` nesnesinin varlığını kontrol ederek bağlantı hatasını yakalayabiliriz.
if (!isset($pdo)) {
    die("<div style='text-align:center; padding: 20px; background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; border-radius: 5px;'>
        Veritabanı bağlantısı kurulamadı. Lütfen 'db.php' dosyasını ve bağlantı bilgilerini kontrol edin.
    </div>");
}

// Tüm verileri çekme işlemi
try {
    // --- Dashboard verileri ---
    $total_products_query = $pdo->query("SELECT COUNT(*) as count FROM products");
    $total_products = $total_products_query->fetchColumn();

    $total_users_query = $pdo->query("SELECT COUNT(*) as count FROM users");
    $total_users = $total_users_query->fetchColumn();

    $total_categories_query = $pdo->query("SELECT COUNT(*) as count FROM categories");
    $total_categories = $total_categories_query->fetchColumn();

    // Düzeltme: Yalnızca en son eklenen ürünü çekmek için
    $latest_products_query = $pdo->query("
        SELECT p.id, p.product_name, p.price, p.stock, p.image_url, c.category_name
        FROM products p
        JOIN categories c ON p.category_id = c.id
        ORDER BY p.created_at DESC
        LIMIT 1
    ");
    $latest_product = $latest_products_query->fetch(PDO::FETCH_ASSOC);

    // --- Ürün Yönetimi verileri (Tüm Ürünler) ---
    $all_products_query = $pdo->query("
        SELECT p.id, p.product_name, p.price, p.stock, p.image_url, c.category_name
        FROM products p
        JOIN categories c ON p.category_id = c.id
        ORDER BY p.id DESC
    ");
    $all_products = $all_products_query->fetchAll(PDO::FETCH_ASSOC);

    // --- Kategori Yönetimi verileri ---
    $all_categories_query = $pdo->query("
        SELECT c.id, c.category_name, COUNT(p.id) as product_count, c.status
        FROM categories c
        LEFT JOIN products p ON c.id = p.category_id
        GROUP BY c.id
        ORDER BY c.id ASC
    ");
    $all_categories = $all_categories_query->fetchAll(PDO::FETCH_ASSOC);

    // --- Kullanıcı Yönetimi verileri ---
    $all_users_query = $pdo->query("
        SELECT id, username, email, created_at, role
        FROM users
        ORDER BY created_at DESC
    ");
    $all_users = $all_users_query->fetchAll(PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    // PDO hataları yakalanır
    die("<div style='text-align:center; padding: 20px; background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; border-radius: 5px;'>
        Veritabanı sorgularında bir hata oluştu: " . $e->getMessage() . "
    </div>");
}
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stilistre Admin Paneli</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="../Style/admin.css">
</head>
<body>
    <div class="sidebar">
        <div class="sidebar-header">
            <h2>STİL<span>İSTRE</span></h2>
        </div>
        <ul class="sidebar-menu">
            <li><a href="#" class="active" data-section="dashboard"><i class="fas fa-home"></i> <span class="menu-text">Dashboard</span></a></li>
            <li><a href="#" data-section="categories"><i class="fas fa-list"></i> <span class="menu-text">Kategoriler</span></a></li>
            <li><a href="#" data-section="products"><i class="fas fa-tshirt"></i> <span class="menu-text">Ürünler</span></a></li>
            <li><a href="#" data-section="users"><i class="fas fa-users"></i> <span class="menu-text">Kullanıcılar</span></a></li>
            <li><a href="index.html" ><i class="fas fa-sign-out-alt" ></i> <span class="menu-text" >Siteye Dön</span></a></li>
        </ul>
    </div>

    <div class="main-content">
        <div class="content">
            <div class="section active" id="dashboard">
                <h1 class="text-2xl font-bold mb-5">Dashboard</h1>
                
                <div class="dashboard-cards">
                    <div class="card stat-card">
                        <div class="stat-icon bg-primary">
                            <i class="fas fa-tshirt"></i>
                        </div>
                        <div class="stat-info">
                            <h3><?php echo htmlspecialchars($total_products); ?></h3>
                            <p>Toplam Ürün</p>
                        </div>
                    </div>
                    
                    <div class="card stat-card">
                        <div class="stat-icon bg-success">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-info">
                            <h3><?php echo htmlspecialchars($total_users); ?></h3>
                            <p>Toplam Kullanıcı</p>
                        </div>
                    </div>
                    
                 
                    <div class="card stat-card">
                        <div class="stat-icon bg-danger">
                            <i class="fas fa-list"></i>
                        </div>
                        <div class="stat-info">
                            <h3><?php echo htmlspecialchars($total_categories); ?></h3>
                            <p>Kategori</p>
                        </div>
                    </div>
                </div>
                
                <div class="table-container">
                    <div class="table-header">
                        <h2>En Son Eklenen Ürün</h2>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Ürün Adı</th>
                                <th>Kategori</th>
                                <th>Fiyat</th>
                                <th>Stok</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if (!empty($latest_product)): ?>
                                <tr>
                                    <td><?php echo htmlspecialchars($latest_product['product_name']); ?></td>
                                    <td><?php echo htmlspecialchars($latest_product['category_name']); ?></td>
                                    <td>₺<?php echo number_format($latest_product['price'], 2, ',', '.'); ?></td>
                                    <td><?php echo htmlspecialchars($latest_product['stock']); ?></td>
                                    <td class="action-buttons">
                                        <button class="action-btn edit-btn"><i class="fas fa-edit"></i></button>
                                        <button class="action-btn delete-btn"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            <?php else: ?>
                                <tr>
                                    <td colspan="5" class="text-center">Henüz eklenmiş ürün bulunmamaktadır.</td>
                                </tr>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="section" id="products">
                <div class="flex justify-between items-center mb-5">
                    <h1 class="text-2xl font-bold">Ürün Yönetimi</h1>
                    <button class="btn btn-primary" id="addProductBtn">Yeni Ürün Ekle</button>
                </div>
                
                <div class="table-container">
                    <div class="table-header">
                        <h2>Tüm Ürünler</h2>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Ürün Görseli</th>
                                <th>Ürün Adı</th>
                                <th>Kategori</th>
                                <th>Fiyat</th>
                                <th>Stok</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if (!empty($all_products)): ?>
                                <?php foreach ($all_products as $product): ?>
                                    <tr>
                                        <td><?php echo htmlspecialchars($product['id']); ?></td>
                                        <td><img src="<?php echo htmlspecialchars($product['image_url']); ?>" class="w-10 h-10 object-cover rounded"></td>
                                        <td><?php echo htmlspecialchars($product['product_name']); ?></td>
                                        <td><?php echo htmlspecialchars($product['category_name']); ?></td>
                                        <td>₺<?php echo number_format($product['price'], 2, ',', '.'); ?></td>
                                        <td><?php echo htmlspecialchars($product['stock']); ?></td>
                                        <td class="action-buttons">
                                            <button class="action-btn edit-btn"><i class="fas fa-edit"></i></button>
                                            <button class="action-btn delete-btn"><i class="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php else: ?>
                                <tr>
                                    <td colspan="7" class="text-center">Henüz eklenmiş ürün bulunmamaktadır.</td>
                                </tr>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
                
                <div class="form-container mt-8" id="productForm" style="display: none;">
                    <h2 class="text-xl font-bold mb-5">Yeni Ürün Ekle</h2>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="productName">Ürün Adı</label>
                            <input type="text" id="productName" placeholder="Ürün adını girin">
                        </div>
                        <div class="form-group">
                            <label for="productCategory">Kategori</label>
                            <select id="productCategory">
                                <option value="">Kategori seçin</option>
                                <?php foreach ($all_categories as $category): ?>
                                    <option value="<?php echo htmlspecialchars($category['id']); ?>"><?php echo htmlspecialchars($category['category_name']); ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="productPrice">Fiyat</label>
                            <input type="number" id="productPrice" placeholder="Ürün fiyatını girin">
                        </div>
                        <div class="form-group">
                            <label for="productDiscount">İndirimli Fiyat (Opsiyonel)</label>
                            <input type="number" id="productDiscount" placeholder="İndirimli fiyatı girin">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="productStock">Stok Adedi</label>
                            <input type="number" id="productStock" placeholder="Stok adedini girin">
                        </div>
                        <div class="form-group">
                            <label for="productBrand">Marka</label>
                            <input type="text" id="productBrand" placeholder="Marka adını girin">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="productDescription">Ürün Açıklaması</label>
                        <textarea id="productDescription" placeholder="Ürün açıklamasını girin"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="productImage">Ürün Görseli</label>
                        <input type="file" id="productImage">
                        <div class="image-preview">
                            <img id="previewImage" src="" alt="Önizleme">
                            <span id="noImageText">Görsel önizleme</span>
                        </div>
                    </div>
                    
                    <div class="form-footer">
                        <button class="btn" style="background: #ccc;">İptal</button>
                        <button class="btn btn-primary">Ürünü Ekle</button>
                    </div>
                </div>
            </div>
            
           <div class="section" id="categories">
    <div class="flex justify-between items-center mb-5">
        <h1 class="text-2xl font-bold">Kategori Yönetimi</h1>
        <button class="btn btn-primary" id="addCategoryBtn">Yeni Kategori Ekle</button>
    </div>
    
    <div class="table-container">
        <div class="table-header">
            <h2>Tüm Kategoriler</h2>
        </div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Kategori Adı</th>
                    <th>Ürün Sayısı</th>
                    <th>İşlemler</th>
                </tr>
            </thead>
            <tbody>
                <?php if (!empty($all_categories)): ?>
                    <?php foreach ($all_categories as $category): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($category['id']); ?></td>
                            <td><?php echo htmlspecialchars($category['category_name']); ?></td>
                            <td><?php echo htmlspecialchars($category['product_count']); ?></td>
                            <td class="action-buttons">
             <td class="action-buttons">
    <button class="action-btn delete-btn" data-id="<?php echo htmlspecialchars($category['id']); ?>" data-type="category">
        <i class="fas fa-trash"></i>
    </button>
</td>          
                          </td>
                        </tr>
                    <?php endforeach; ?>
                <?php else: ?>
                    <tr>
                        <td colspan="4" class="text-center">Henüz kategori bulunmamaktadır.</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
    
    <div class="form-container mt-8" id="categoryForm" style="display: none;">
        <h2 class="text-xl font-bold mb-5">Yeni Kategori Ekle</h2>
        
        <form id="addCategoryForm">
            <div class="form-group">
                <label for="categoryName">Kategori Adı</label>
                <input type="text" id="categoryName" name="categoryName" placeholder="Kategori adını girin" required>
            </div>
            
          <div class="form-footer">
    <button type="button" class="btn" onclick="document.getElementById('categoryForm').style.display='none';" style="background: #ccc;">İptal</button>
    
    <button type="submit" class="btn btn-primary">Kategoriyi Ekle</button>
</div>
        </form>
    </div>
</div>
            <div class="section" id="users">
                <h1 class="text-2xl font-bold mb-5">Kullanıcı Yönetimi</h1>
                
                <div class="table-container">
                    <div class="table-header">
                        <h2>Tüm Kullanıcılar</h2>
                        <button class="btn btn-primary">Yeni Kullanıcı Ekle</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Kullanıcı</th>
                                <th>E-posta</th>
                                <th>Kayıt Tarihi</th>
                                <th>Rol</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if (!empty($all_users)): ?>
                                <?php foreach ($all_users as $user): ?>
                                    <tr>
                                        <td><?php echo htmlspecialchars($user['id']); ?></td>
                                        <td>
                                            <div class="flex items-center gap-2">
                                                <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white"><?php echo htmlspecialchars(substr($user['username'], 0, 1)); ?></div>
                                                <div><?php echo htmlspecialchars($user['username']); ?></div>
                                            </div>
                                        </td>
                                        <td><?php echo htmlspecialchars($user['email']); ?></td>
                                        <td><?php echo date('d.m.Y', strtotime($user['created_at'])); ?></td>
                                        <td>
                                            <?php 
                                                $role_class = ($user['role'] == 'admin') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';
                                            ?>
                                            <span class="<?php echo htmlspecialchars($role_class); ?> text-xs px-2 py-1 rounded">
                                                <?php echo htmlspecialchars(ucfirst($user['role'])); ?>
                                            </span>
                                        </td>
                                        <td class="action-buttons">
                                            <button class="action-btn edit-btn"><i class="fas fa-edit"></i></button>
                                            <button class="action-btn delete-btn"><i class="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php else: ?>
                                <tr>
                                    <td colspan="6" class="text-center">Henüz kayıtlı kullanıcı bulunmamaktadır.</td>
                                </tr>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        // Section switching
        document.querySelectorAll('.sidebar-menu a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                document.querySelectorAll('.sidebar-menu a').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Hide all sections
                document.querySelectorAll('.section').forEach(section => {
                    section.classList.remove('active');
                });
                
                // Show the target section
                const sectionId = this.getAttribute('data-section');
                if (sectionId) {
                    document.getElementById(sectionId).classList.add('active');
                    
                    // Hide forms when switching sections
                    document.getElementById('productForm').style.display = 'none';
                    document.getElementById('categoryForm').style.display = 'none';
                }
            });
        });
        
        // Toggle product form
        document.getElementById('addProductBtn').addEventListener('click', function() {
            const form = document.getElementById('productForm');
            form.style.display = form.style.display === 'none' ? 'block' : 'none';
        });
        
        // Toggle category form
        document.getElementById('addCategoryBtn').addEventListener('click', function() {
            const form = document.getElementById('categoryForm');
            form.style.display = form.style.display === 'none' ? 'block' : 'none';
        });
        
        // Image preview functionality
        document.getElementById('productImage').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('previewImage').src = e.target.result;
                    document.getElementById('previewImage').style.display = 'block';
                    document.getElementById('noImageText').style.display = 'none';
                }
                reader.readAsDataURL(file);
            }
        });
    </script>
<div id="deleteConfirmationBox" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); z-index: 2000; justify-content: center; align-items: center;">
    <div class="confirmation-content" style="background: #fff; padding: 30px; border-radius: 10px; text-align: center; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);">
        <p style="font-size: 18px; margin-bottom: 20px;">Bu öğeyi silmek istediğinizden emin misiniz?</p>
        <button id="confirmDelete" class="btn btn-danger" style="margin-right: 10px;">Evet, Sil</button>
        <button id="cancelDelete" class="btn btn-secondary">İptal</button>
    </div>
</div>
<script src="../Script/admin.js"></script>
</body>
</html>