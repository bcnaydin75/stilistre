<?php
session_start();
?>

<!DOCTYPE html>
<html lang="tr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stilistre - Modanın Kalbi</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="Style/index.css">
</head>

<body>
<header>
    
    
    <div class="container">
        <div class="header-top">
            <div class="logo">
                <h1>STİL<span>İSTRE</span></h1>
            </div>
            <div class="search-bar">
                <input type="text" placeholder="Aradığınız ürünü buraya yazın...">
                <button><i class="fas fa-search"></i> Ara</button>
            </div>
            <div class="header-icons">
                <div class="profile-dropdown-wrapper" style="position: relative;">
                    <button class="icon-btn" id="profileBtn">
                        <i class="fas fa-user"></i>
                    </button>

                    <?php if (isset($_SESSION['user'])): ?>
                    <div id="profileDropdown" style="
                        display: none;
                        position: absolute;
                        right: 0;
                        background: white;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                        border-radius: 5px;
                        width: 180px;
                        z-index: 1000;
                        font-family: 'Montserrat', sans-serif;
                    ">
                        <div style="padding: 10px 15px; border-bottom: 1px solid #eee; font-weight: 600; color: #333;"> 
                            <span id="dropdownUsername">
                                <?= htmlspecialchars($_SESSION['user']['username'] ?? 'Kullanıcı') ?>
                            </span>
                        </div>
                        <a href="settings.php" style="display: block; padding: 10px 15px; color: #555; text-decoration: none; border-bottom: 1px solid #eee;">Ayarlar</a>
                        <a href="logout.php" style="display: block; padding: 10px 15px; color: #555; text-decoration: none;">Çıkış Yap</a>
                    </div>
                    <?php else: ?>
                        <script>window.location.href = 'index.php';</script>
                    <?php endif; ?>
                </div>

                <button class="icon-btn" onclick="window.location.href='favorites.html'">
                    <i class="fas fa-heart"></i>
                    <span class="icon-badge">3</span>
                </button>
                <button class="icon-btn" onclick="window.location.href='market.html'">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="icon-badge">5</span>
                </button>
            </div>
        </div>
    </div>

    <nav>
        <div class="container">
            <ul>
                <li><a href="index.php"><i class="fas fa-home"></i> Anasayfa</a></li>
                <li><a href="women.php">Kadın</a></li>
                <li><a href="male.php">Erkek</a></li>
                <li><a href="kids.php">Çocuk</a></li>
                <li><a href="shoe.php">Ayakkabı</a></li>
            </ul>
        </div>
    </nav>
</header>



    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h2>Yaz Sezonu Fırsatları Sizi Bekliyor!</h2>
                <p>Yeni sezonun en trend parçaları, özel indirimler ve kampanyalarla Trend Sepeti'nde. Tarzınızı
                    keşfedin!</p>
                <a href="#" class="btn">Hemen Alışverişe Başla</a>
            </div>
        </div>
    </section>

    <section class="container">
        <div class="section-title">
            <h2>Kategoriler</h2>
        </div>

        <div class="categories">
            <div class="category-card">
                <div class="category-img">
                    <img src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                        alt="Kadın Giyim">
                </div>
                <div class="category-info">
                    <h3>Kadın Giyim</h3>
                    <p>450+ Ürün</p>
                </div>
            </div>

            <div class="category-card">
                <div class="category-img">
                    <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                        alt="Erkek Giyim">
                </div>
                <div class="category-info">
                    <h3>Erkek Giyim</h3>
                    <p>380+ Ürün</p>
                </div>
            </div>

            <div class="category-card">
                <div class="category-img">
                    <img src="https://images.unsplash.com/photo-1575425186775-b8de9a427e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                        alt="Çocuk Giyim">
                </div>
                <div class="category-info">
                    <h3>Çocuk Giyim</h3>
                    <p>320+ Ürün</p>
                </div>
            </div>

            <div class="category-card">
                <div class="category-img">
                    <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                        alt="Ayakkabı & Çanta">
                </div>
                <div class="category-info">
                    <h3>Ayakkabı</h3>
                    <p>280+ Ürün</p>
                </div>
            </div>
        </div>
    </section>

    <section class="container">
        <div class="section-title">
            <h2>Öne Çıkan Ürünler</h2>
        </div>

        <div class="products">
            <div class="product-card">
                <div class="product-img">
                    <img src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                        alt="Kadın Elbise">
                    <span class="product-badge">Yeni</span>
                    <div class="quick-view">Hızlı Görünüm</div>
                </div>
                <div class="product-info">
                    <h3>Yazlık Desenli Elbise</h3>
                    <span class="category">Kadın Giyim</span>
                    <div class="price">
                        <div class="current">₺349.99</div>
                        <div class="old">₺499.99</div>
                    </div>
                    <button class="btn" style="width: 100%; margin-top: 15px;">Sepete Ekle</button>
                </div>
            </div>

            <div class="product-card">
                <div class="product-img">
                    <img src="https://images.unsplash.com/photo-1521341057461-6eb5f40b07ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                        alt="Erkek Tişört">
                    <span class="product-badge">%25 İndirim</span>
                    <div class="quick-view">Hızlı Görünüm</div>
                </div>
                <div class="product-info">
                    <h3>Pamuklu Erkek Tişört</h3>
                    <span class="category">Erkek Giyim</span>
                    <div class="price">
                        <div class="current">₺129.99</div>
                        <div class="old">₺179.99</div>
                    </div>
                    <button class="btn" style="width: 100%; margin-top: 15px;">Sepete Ekle</button>
                </div>
            </div>

            <div class="product-card">
                <div class="product-img">
                    <img src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                        alt="Çocuk Eşofman">
                    <span class="product-badge">Popüler</span>
                    <div class="quick-view">Hızlı Görünüm</div>
                </div>
                <div class="product-info">
                    <h3>Çocuk Eşofman Takımı</h3>
                    <span class="category">Çocuk Giyim</span>
                    <div class="price">
                        <div class="current">₺199.99</div>
                        <div class="old">₺299.99</div>
                    </div>
                    <button class="btn" style="width: 100%; margin-top: 15px;">Sepete Ekle</button>
                </div>
            </div>

            <div class="product-card">
                <div class="product-img">
                    <img src="https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                        alt="Kadın Ayakkabı">
                    <span class="product-badge">Fırsat</span>
                    <div class="quick-view">Hızlı Görünüm</div>
                </div>
                <div class="product-info">
                    <h3>Kadın Spor Ayakkabı</h3>
                    <span class="category">Ayakkabı</span>
                    <div class="price">
                        <div class="current">₺449.99</div>
                        <div class="old">₺699.99</div>
                    </div>
                    <button class="btn" style="width: 100%; margin-top: 15px;">Sepete Ekle</button>
                </div>
            </div>
        </div>
    </section>

    <div class="container">
        <div class="visitor-counter">
            <h2 class="counter-title">Sitemizi Ziyaret Edenler</h2>
            <div class="counter-number" id="visitorCount">0</div>
            <p class="counter-text">Siz de trendin bir parçası olan binlerce müşterimizden biri olun!</p>
        </div>
    </div>

    <section class="container">
        <div class="newsletter">
            <h2>Fırsatlardan Haberdar Olun</h2>
            <p>Yenilikler, özel indirimler ve kampanyalardan haberdar olmak için bültenimize abone olun.</p>
            <form class="newsletter-form">
                <input type="email" placeholder="E-posta adresinizi girin" required>
                <button type="submit">Abone Ol</button>
            </form>
        </div>
    </section>

    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-col">
                    <h3>STİLİSTRE</h3>
                    <p>Türkiye'nin en trend giyim ve moda ürünleri tek platformda. Kalite ve uygun fiyat garantisi!</p>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-pinterest"></i></a>
                    </div>
                </div>

                <div class="footer-col">
                    <h3>Kategoriler</h3>
                    <ul>
                        <li><a href="women.html">Kadın Giyim</a></li>
                        <li><a href="male.html">Erkek Giyim</a></li>
                        <li><a href="kids.html">Çocuk Giyim</a></li>
                        <li><a href="shoe.html">Ayakkabı</a></li>

                    </ul>
                </div>

                <div class="footer-col">
                    <h3>Müşteri Hizmetleri</h3>
                    <ul>
                        <li><a href="#">Sipariş Takibi</a></li>
                        <li><a href="#">İade ve Değişim</a></li>
                        <li><a href="#">Teslimat Bilgileri</a></li>
                        <li><a href="#">Sıkça Sorulan Sorular</a></li>
                        <li><a href="#">Gizlilik Politikası</a></li>
                    </ul>
                </div>

                <div class="footer-col">
                    <h3>İletişim</h3>
                    <ul>
                        <li><i class="fas fa-map-marker-alt"></i> İstanbul, Türkiye</li>
                        <li><i class="fas fa-phone"></i> +90 212 123 4567</li>
                        <li><i class="fas fa-envelope"></i> info@stilistre.com</li>
                        <li><i class="fas fa-clock"></i> 09:00 - 18:00</li>
                    </ul>
                </div>
            </div>

            <div class="copyright">
                <p>&copy; 2025 Stilistre. Tüm hakları saklıdır.</p>
            </div>
        </div>
    </footer>
    <script src="Script/index-php.js"></script>

</body>

</html>