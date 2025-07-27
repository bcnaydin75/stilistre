document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
    const mainContent = document.getElementById('mainContent');
    const dynamicContentArea = document.getElementById('dynamicContentArea'); // Yeni eklenen div
    const navLinks = document.querySelectorAll('.sidebar nav ul li a');
    const pageTitleElement = document.querySelector('.topbar h2'); // Topbar başlık elementi

    // Kategoriye göre marka listesi (simülasyon)
    // Başlangıçta bazı örnek markalar
    const categoryBrands = {
        'kadın-giyim': [
            { id: 1, name: 'ZARA', logo: 'https://via.placeholder.com/60x25?text=ZARA' },
            { id: 2, name: 'H&M', logo: 'https://via.placeholder.com/60x25?text=HM' },
            { id: 3, name: 'Mango', logo: 'https://via.placeholder.com/60x25?text=Mango' },
            { id: 4, name: 'Koton', logo: 'https://via.placeholder.com/60x25?text=Koton' }
        ],
        'erkek-giyim': [
            { id: 5, name: 'Mavi', logo: 'https://via.placeholder.com/60x25?text=Mavi' },
            { id: 6, name: 'US Polo Assn.', logo: 'https://via.placeholder.com/60x25?text=USPA' }
        ],
        'cocuk-giyim': [],
        'ayakkabi': [
            { id: 7, name: 'Nike', logo: 'https://via.placeholder.com/60x25?text=Nike' },
            { id: 8, name: 'Adidas', logo: 'https://via.placeholder.com/60x25?text=Adidas' }
        ],
        'aksesuar': []
        // Diğer kategoriler ve markalar eklenebilir
    };

    // Kategorileri dinamik olarak doldurmak için bir helper fonksiyon
    function getCategoryOptionsHTML(selectedCategory = '') {
        const categories = {
            'kadın-giyim': 'Kadın Giyim',
            'erkek-giyim': 'Erkek Giyim',
            'cocuk-giyim': 'Çocuk Giyim',
            'ayakkabi': 'Ayakkabı',
            'aksesuar': 'Aksesuar'
        };
        let optionsHtml = '<option value="">Kategori Seçin</option>';
        for (const value in categories) {
            optionsHtml += `<option value="${value}" ${selectedCategory === value ? 'selected' : ''}>${categories[value]}</option>`;
        }
        return optionsHtml;
    }

    // --- HTML İçerik Şablonları ---

    const dashboardContentHTML = `
                <div class="dashboard-widgets">
                    <div class="widget">
                        <i class="fas fa-shopping-bag icon"></i>
                        <h3>Bugünkü Siparişler</h3>
                        <span class="value">25</span>
                        <span class="description">+5 yeni sipariş</span>
                    </div>
                    <div class="widget">
                        <i class="fas fa-box icon"></i>
                        <h3>Stoktaki Ürünler</h3>
                        <span class="value">1240</span>
                        <span class="description">20 ürün düşük stoklu</span>
                    </div>
                    <div class="widget">
                        <i class="fas fa-users icon"></i>
                        <h3>Toplam Müşteri</h3>
                        <span class="value">5432</span>
                        <span class="description">+15 yeni üye</span>
                    </div>
                    <div class="widget">
                        <i class="fas fa-dollar-sign icon"></i>
                        <h3>Toplam Ciro (Bu Ay)</h3>
                        <span class="value">₺124.500</span>
                        <span class="description">%12 artış</span>
                    </div>
                </div>
                <div class="data-table">
                    <h3>Son Siparişler</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Sipariş ID</th>
                                <th>Müşteri</th>
                                <th>Tarih</th>
                                <th>Tutar</th>
                                <th>Durum</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>#1001</td><td>Zeynep Yılmaz</td><td>21.07.2025</td><td>₺450.00</td><td><span class="status-badge shipped">Kargolandı</span></td><td><button class="action-btn view">Detay</button></td></tr>
                            <tr><td>#1002</td><td>Ahmet Can</td><td>21.07.2025</td><td>₺220.50</td><td><span class="status-badge pending">Beklemede</span></td><td><button class="action-btn view">Detay</button></td></tr>
                            <tr><td>#1003</td><td>Elif Demir</td><td>20.07.2025</td><td>₺780.00</td><td><span class="status-badge delivered">Teslim Edildi</span></td><td><button class="action-btn view">Detay</button></td></tr>
                            <tr><td>#1004</td><td>Burak Kara</td><td>20.07.2025</td><td>₺125.99</td><td><span class="status-badge cancelled">İptal Edildi</span></td><td><button class="action-btn view">Detay</button></td></tr>
                            <tr><td>#1005</td><td>Ceren Toprak</td><td>19.07.2025</td><td>₺310.00</td><td><span class="status-badge processing">Hazırlanıyor</span></td><td><button class="action-btn view">Detay</button></td></tr>
                        </tbody>
                    </table>
                </div>
            `;

    const addProductFormHTML = `
                <div class="admin-section" id="addProductSection">
                    <h3>Yeni Ürün Ekle</h3>
                    <form id="addProductForm" class="admin-form">
                        <div class="form-group">
                            <label for="productName">Ürün Adı:</label>
                            <input type="text" id="productName" name="productName" placeholder="Örn: Pamuklu Oversize Tişört" required>
                        </div>
                        <div class="form-group">
                            <label for="productDescription">Açıklama:</label>
                            <textarea id="productDescription" name="productDescription" rows="5" placeholder="Ürünün detaylı açıklaması"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="productPrice">Fiyat (₺):</label>
                            <input type="number" id="productPrice" name="productPrice" step="0.01" min="0" placeholder="Örn: 199.99" required>
                        </div>
                        <div class="form-group">
                            <label for="productDiscountPrice">İndirimli Fiyat (₺):</label>
                            <input type="number" id="productDiscountPrice" name="productDiscountPrice" step="0.01" min="0" placeholder="Opsiyonel">
                        </div>
                        <div class="form-group">
                            <label for="productCategory">Kategori:</label>
                            <select id="productCategory" name="productCategory" required>
                                ${getCategoryOptionsHTML()}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="productBrand">Marka:</label>
                            <select id="productBrand" name="productBrand" required disabled>
                                <option value="">Önce kategori seçin</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="productStock">Genel Stok Miktarı:</label>
                            <input type="number" id="productStock" name="productStock" min="0" placeholder="Örn: 150 (Varyantları ayrı stoklayacaksanız boş bırakın)">
                        </div>
                        <div class="form-group">
                            <label for="productSku">SKU Kodu:</label>
                            <input type="text" id="productSku" name="productSku" placeholder="Benzersiz ürün kodu (opsiyonel)">
                        </div>

                        <h4>Ürün Resimleri</h4>
                        <div class="image-upload-group">
                            <label>Ana Görsel (URL veya Dosya):</label>
                            <div class="image-input-container">
                                <input type="url" id="productImageUrl1" name="productImageUrl1" placeholder="Görsel URL (https://...)" class="flex-grow">
                                <label for="productFileInput1" class="image-upload-btn"><i class="fas fa-upload"></i> Dosya Seç</label>
                                <input type="file" id="productFileInput1" name="productFileInput1" accept="image/*" class="hidden-file-input">
                                <span class="file-name-display" id="fileNameDisplay1">Dosya seçilmedi</span>
                            </div>

                            <label style="margin-top: 15px;">Ek Görsel 1 (URL veya Dosya):</label>
                            <div class="image-input-container">
                                <input type="url" id="productImageUrl2" name="productImageUrl2" placeholder="Görsel URL (opsiyonel)" class="flex-grow">
                                <label for="productFileInput2" class="image-upload-btn"><i class="fas fa-upload"></i> Dosya Seç</label>
                                <input type="file" id="productFileInput2" name="productFileInput2" accept="image/*" class="hidden-file-input">
                                <span class="file-name-display" id="fileNameDisplay2">Dosya seçilmedi</span>
                            </div>

                             <label style="margin-top: 15px;">Ek Görsel 2 (URL veya Dosya):</label>
                            <div class="image-input-container">
                                <input type="url" id="productImageUrl3" name="productImageUrl3" placeholder="Görsel URL (opsiyonel)" class="flex-grow">
                                <label for="productFileInput3" class="image-upload-btn"><i class="fas fa-upload"></i> Dosya Seç</label>
                                <input type="file" id="productFileInput3" name="productFileInput3" accept="image/*" class="hidden-file-input">
                                <span class="file-name-display" id="fileNameDisplay3">Dosya seçilmedi</span>
                            </div>
                        </div>

                        <h4>Varyantlar (Renk, Beden vb.)</h4>
                        <div id="productVariantsContainer">
                            <div class="variant-row">
                                <div class="form-group">
                                    <label>Tip (Örn: Renk)</label>
                                    <input type="text" name="variantType" placeholder="Renk" class="variant-type" required>
                                </div>
                                <div class="form-group">
                                    <label>Değer (Örn: Kırmızı)</label>
                                    <input type="text" name="variantValue" placeholder="Kırmızı" class="variant-value" required>
                                </div>
                                <div class="form-group">
                                    <label>Stok</label>
                                    <input type="number" name="variantStock" min="0" placeholder="0" class="variant-stock" value="0" required>
                                </div>
                                <div class="form-group">
                                    <label>Ek Fiyat (₺)</label>
                                    <input type="number" name="variantPrice" step="0.01" placeholder="0.00" class="variant-price" value="0">
                                </div>
                                <button type="button" class="remove-variant-btn" title="Varyantı Kaldır"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                        <button type="button" id="addVariantBtn" class="add-more-btn"><i class="fas fa-plus"></i> Varyant Ekle</button>

                        <div class="form-actions">
                            <button type="submit" class="submit-btn green"><i class="fas fa-save"></i> Ürünü Kaydet</button>
                            <button type="reset" class="submit-btn gray"><i class="fas fa-redo"></i> Temizle</button>
                        </div>
                    </form>
                </div>
            `;

    const ordersContentHTML = `
                <div class="admin-section" id="ordersSection">
                    <h3>Sipariş Yönetimi</h3>
                    <p>Burada tüm siparişlerinizi yönetebilir, durumlarını güncelleyebilir ve detaylarına ulaşabilirsiniz.</p>
                    <div class="data-table" style="margin-top: 25px;">
                        <table>
                            <thead>
                                <tr>
                                    <th>Sipariş ID</th>
                                    <th>Müşteri Adı</th>
                                    <th>Tarih</th>
                                    <th>Tutar</th>
                                    <th>Durum</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>#1006</td><td>Can Yılmaz</td><td>22.07.2025</td><td>₺180.00</td><td><span class="status-badge pending">Beklemede</span></td><td><button class="action-btn view">Detay</button></td></tr>
                                <tr><td>#1007</td><td>Deniz Aksoy</td><td>22.07.2025</td><td>₺520.50</td><td><span class="status-badge processing">Hazırlanıyor</span></td><td><button class="action-btn view">Detay</button></td></tr>
                                <tr><td>#1008</td><td>Ayşe Kara</td><td>21.07.2025</td><td>₺340.00</td><td><span class="status-badge shipped">Kargolandı</span></td><td><button class="action-btn view">Detay</button></td></tr>
                                <tr><td>#1009</td><td>Murat Efe</td><td>20.07.2025</td><td>₺675.00</td><td><span class="status-badge delivered">Teslim Edildi</span></td><td><button class="action-btn view">Detay</button></td></tr>
                                <tr><td>#1010</td><td>Gülşen Aydın</td><td>19.07.2025</td><td>₺99.99</td><td><span class="status-badge cancelled">İptal Edildi</span></td><td><button class="action-btn view">Detay</button></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `;

    const customersContentHTML = `
                <div class="admin-section" id="customersSection">
                    <h3>Müşteri Yönetimi</h3>
                    <p>Sitenize kayıtlı müşterilerinizi burada görüntüleyebilir ve yönetebilirsiniz.</p>
                    <div class="data-table" style="margin-top: 25px;">
                        <table>
                            <thead>
                                <tr>
                                    <th>Müşteri ID</th>
                                    <th>Ad Soyad</th>
                                    <th>E-posta</th>
                                    <th>Kayıt Tarihi</th>
                                    <th>Toplam Sipariş</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>#C001</td><td>Zeynep Yılmaz</td><td>zeynep@example.com</td><td>15.01.2024</td><td>12</td><td><button class="action-btn view">Detay</button> <button class="action-btn danger">Sil</button></td></tr>
                                <tr><td>#C002</td><td>Ahmet Can</td><td>ahmet@example.com</td><td>20.03.2024</td><td>8</td><td><button class="action-btn view">Detay</button> <button class="action-btn danger">Sil</button></td></tr>
                                <tr><td>#C003</td><td>Elif Demir</td><td>elif@example.com</td><td>01.06.2023</td><td>25</td><td><button class="action-btn view">Detay</button> <button class="action-btn danger">Sil</button></td></tr>
                                <tr><td>#C004</td><td>Burak Kara</td><td>burak@example.com</td><td>10.02.2025</td><td>3</td><td><button class="action-btn view">Detay</button> <button class="action-btn danger">Sil</button></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `;

    const brandsContentHTML = `
                <div class="admin-section" id="brandsSection">
                    <h3>Marka Yönetimi</h3>
                    <p>Yeni markalar ekleyebilir ve mevcut markaları düzenleyebilirsiniz.</p>
                    <form id="addBrandForm" class="admin-form" style="margin-top: 25px;">
                        <div class="form-group">
                            <label for="brandCategory">Kategori:</label>
                            <select id="brandCategory" name="brandCategory" required>
                                ${getCategoryOptionsHTML()}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="brandName">Marka Adı:</label>
                            <input type="text" id="brandName" name="brandName" placeholder="Örn: Nike, Adidas" required>
                        </div>
                        <div class="form-group">
                            <label for="brandLogo">Marka Logosu URL:</label>
                            <input type="url" id="brandLogo" name="brandLogo" placeholder="Marka logosunun URL'si (opsiyonel)">
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="submit-btn green"><i class="fas fa-plus"></i> Markayı Ekle</button>
                            <button type="reset" class="submit-btn gray"><i class="fas fa-redo"></i> Temizle</button>
                        </div>
                    </form>

                    <h4>Mevcut Markalar</h4>
                    <div class="data-table" style="margin-top: 25px;">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Kategori</th> <th>Marka Adı</th>
                                    <th>Logo</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody id="brandsTableBody">
                                </tbody>
                        </table>
                    </div>
                </div>
            `;

    const reportsContentHTML = `
                <div class="admin-section" id="reportsSection">
                    <h3>Raporlar ve Analizler</h3>
                    <p>İşletmenizin performansını takip etmek için çeşitli raporları burada bulabilirsiniz.</p>
                    <div class="reports-grid">
                        <div class="report-card">
                            <i class="fas fa-chart-bar report-icon"></i>
                            <h4>Satış Performans Raporu</h4>
                            <p>Belirli bir dönemdeki toplam satışları, ortalama sipariş değerini ve en çok satan ürünleri gösterir.</p>
                            <div class="placeholder-chart">Grafik Alanı (Örn: Çubuk Grafik)</div>
                        </div>
                        <div class="report-card">
                            <i class="fas fa-users report-icon"></i>
                            <h4>Müşteri Demografik Raporu</h4>
                            <p>Müşterilerinizin yaş, cinsiyet, coğrafi dağılım gibi demografik bilgilerini analiz eder.</p>
                            <div class="placeholder-chart">Grafik Alanı (Örn: Pasta Grafik)</div>
                        </div>
                        <div class="report-card">
                            <i class="fas fa-pallet report-icon"></i>
                            <h4>Stok ve Envanter Raporu</h4>
                            <p>Mevcut stok durumunu, azalan stok seviyelerini ve envanter değerini gösterir.</p>
                            <div class="placeholder-chart">Grafik Alanı (Örn: Line Grafik)</div>
                        </div>
                         <div class="report-card">
                            <i class="fas fa-money-bill-wave report-icon"></i>
                            <h4>Gelir Gider Raporu</h4>
                            <p>İşletmenizin belirli bir dönemdeki gelir ve gider dengesini sunar.</p>
                            <div class="placeholder-chart">Grafik Alanı (Örn: Çizgi Grafik)</div>
                        </div>
                         <div class="report-card">
                            <i class="fas fa-search-dollar report-icon"></i>
                            <h4>Pazarlama Kampanyası Raporu</h4>
                            <p>Yürüttüğünüz pazarlama kampanyalarının dönüşüm oranlarını ve ROI'sini (Yatırım Getirisi) izler.</p>
                            <div class="placeholder-chart">Grafik Alanı (Örn: Huni Grafik)</div>
                        </div>
                         <div class="report-card">
                            <i class="fas fa-truck report-icon"></i>
                            <h4>Kargo ve Teslimat Raporu</h4>
                            <p>Ortalama teslimat sürelerini, kargo maliyetlerini ve teslimat başarı oranlarını gösterir.</p>
                            <div class="placeholder-chart">Grafik Alanı (Örn: Bar Grafik)</div>
                        </div>
                    </div>
                </div>
            `;

    const settingsContentHTML = `
                <div class="admin-section" id="settingsSection">
                    <h3>Genel Ayarlar</h3>
                    <p>Sitenizin temel ayarlarını ve yönetici bilgilerini güncelleyin.</p>
                    <form id="generalSettingsForm" class="admin-form" style="margin-top: 25px;">
                        <div class="form-group">
                            <label for="siteName">Site Adı:</label>
                            <input type="text" id="siteName" name="siteName" value="Stilistre" required>
                        </div>
                        <div class="form-group">
                            <label for="adminEmail">Yönetici E-postası:</label>
                            <input type="email" id="adminEmail" name="adminEmail" value="admin@stilistre.com" required>
                        </div>
                        <div class="form-group">
                            <label for="currency">Para Birimi:</label>
                            <select id="currency" name="currency">
                                <option value="TRY">₺ - Türk Lirası</option>
                                <option value="USD">$ - Amerikan Doları</option>
                                <option value="EUR">€ - Euro</option>
                            </select>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="submit-btn green"><i class="fas fa-save"></i> Ayarları Kaydet</button>
                        </div>
                    </form>
                    <h4>Şifre Değiştir</h4>
                    <p>Güvenliğiniz için şifrenizi düzenli olarak güncelleyin.</p>
                    <form id="changePasswordForm" class="admin-form" style="margin-top: 25px;">
                        <div class="form-group">
                            <label for="currentPassword">Mevcut Şifre:</label>
                            <input type="password" id="currentPassword" name="currentPassword" required>
                        </div>
                        <div class="form-group">
                            <label for="newPassword">Yeni Şifre:</label>
                            <input type="password" id="newPassword" name="newPassword" required>
                        </div>
                        <div class="form-group">
                            <label for="confirmNewPassword">Yeni Şifre Tekrar:</label>
                            <input type="password" id="confirmNewPassword" name="confirmNewPassword" required>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="submit-btn green"><i class="fas fa-key"></i> Şifreyi Değiştir</button>
                        </div>
                    </form>
                </div>
            `;


    // --- Fonksiyonlar ---

    // İçerik yükleme fonksiyonu
    function loadContent(page) {
        let contentToLoad = '';
        let pageTitle = '';

        switch (page) {
            case 'dashboard':
                contentToLoad = dashboardContentHTML;
                pageTitle = 'Gösterge Paneli';
                break;
            case 'products':
                contentToLoad = addProductFormHTML;
                pageTitle = 'Ürünler';
                break;
            case 'orders':
                contentToLoad = ordersContentHTML;
                pageTitle = 'Siparişler';
                break;
            case 'customers':
                contentToLoad = customersContentHTML;
                pageTitle = 'Müşteriler';
                break;
            case 'brands':
                contentToLoad = brandsContentHTML;
                pageTitle = 'Markalar';
                break;
            case 'reports':
                contentToLoad = reportsContentHTML;
                pageTitle = 'Raporlar';
                break;
            case 'settings':
                contentToLoad = settingsContentHTML;
                pageTitle = 'Ayarlar';
                break;
            default:
                contentToLoad = `<div class="admin-section"><h3>${page} Sayfası Yapım Aşamasında...</h3><p>Burada ${page} ile ilgili içerik yer alacaktır.</p></div>`;
                pageTitle = page;
                break;
        }

        // Mevcut içeriği yavaşça gizle
        dynamicContentArea.style.opacity = '0';
        dynamicContentArea.style.transform = 'translateY(20px)';

        setTimeout(() => {
            dynamicContentArea.innerHTML = contentToLoad; // İçeriği dynamicContentArea'ya yükle
            pageTitleElement.textContent = pageTitle; // Topbar başlığını güncelle

            // İçerik yüklendikten sonra sayfa özelindeki event listener'ları bağla
            if (page === 'products') {
                setupProductFormListeners();
            } else if (page === 'brands') {
                setupBrandFormListeners();
            } else if (page === 'settings') {
                setupSettingsFormListeners();
            }

            // Yeni içeriği yavaşça göster
            dynamicContentArea.style.opacity = '1';
            dynamicContentArea.style.transform = 'translateY(0)';
        }, 200); // Kısa bir gecikme ile animasyon için
    }

    // Ürün ekleme formu için event listener'ları ayarlayan fonksiyon
    function setupProductFormListeners() {
        const addProductForm = document.getElementById('addProductForm');
        const productVariantsContainer = document.getElementById('productVariantsContainer');
        const addVariantBtn = document.getElementById('addVariantBtn');
        const productCategorySelect = document.getElementById('productCategory');
        const productBrandSelect = document.getElementById('productBrand');

        // Kategori seçimi değiştiğinde marka listesini güncelle
        if (productCategorySelect && productBrandSelect) {
            productCategorySelect.addEventListener('change', () => {
                const selectedCategory = productCategorySelect.value;
                productBrandSelect.innerHTML = ''; // Marka listesini temizle
                productBrandSelect.disabled = true; // Marka seçimini devre dışı bırak

                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Marka Seçin';
                productBrandSelect.appendChild(defaultOption);

                if (selectedCategory && categoryBrands[selectedCategory]) {
                    const brands = categoryBrands[selectedCategory];
                    brands.forEach(brand => {
                        const option = document.createElement('option');
                        option.value = brand.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'); // slug haline getir
                        option.textContent = brand.name;
                        productBrandSelect.appendChild(option);
                    });
                    productBrandSelect.disabled = false; // Marka seçimini etkinleştir
                } else if (selectedCategory) {
                    // Eğer seçilen kategori için kayıtlı marka yoksa
                    const noBrandsOption = document.createElement('option');
                    noBrandsOption.value = '';
                    noBrandsOption.textContent = 'Bu kategoriye ait marka bulunamadı.';
                    noBrandsOption.disabled = true; // Sadece bilgi amaçlı disabled, kullanıcı yine de ekleyebilir
                    productBrandSelect.appendChild(noBrandsOption);
                    productBrandSelect.disabled = false; // Kullanıcı belki yeni marka girmesi için bırakırız
                }
            });
        }


        // Resim dosya input'ları için isim gösterimi
        document.querySelectorAll('.image-input-container input[type="file"]').forEach(input => {
            input.addEventListener('change', function () {
                const fileNameDisplayId = `fileNameDisplay${this.id.replace('productFileInput', '')}`;
                const fileNameDisplay = document.getElementById(fileNameDisplayId);
                if (this.files && this.files.length > 0) {
                    fileNameDisplay.textContent = this.files[0].name;
                } else {
                    fileNameDisplay.textContent = 'Dosya seçilmedi';
                }
            });
        });


        // Varyant Ekle butonu
        if (addVariantBtn) {
            addVariantBtn.addEventListener('click', () => {
                const newVariantRow = document.createElement('div');
                newVariantRow.classList.add('variant-row');
                newVariantRow.innerHTML = `
                            <div class="form-group">
                                <label>Tip (Örn: Renk)</label>
                                <input type="text" name="variantType" placeholder="Renk" class="variant-type" required>
                            </div>
                            <div class="form-group">
                                <label>Değer (Örn: Kırmızı)</label>
                                <input type="text" name="variantValue" placeholder="Kırmızı" class="variant-value" required>
                            </div>
                            <div class="form-group">
                                <label>Stok</label>
                                <input type="number" name="variantStock" min="0" placeholder="0" class="variant-stock" value="0" required>
                                </div>
                            <div class="form-group">
                                <label>Ek Fiyat (₺)</label>
                                <input type="number" name="variantPrice" step="0.01" placeholder="0.00" class="variant-price" value="0">
                            </div>
                            <button type="button" class="remove-variant-btn" title="Varyantı Kaldır"><i class="fas fa-trash"></i></button>
                        `;
                productVariantsContainer.appendChild(newVariantRow);
            });
        }

        // Varyant Kaldır butonu (delegasyon yöntemi ile)
        if (productVariantsContainer) {
            productVariantsContainer.addEventListener('click', (e) => {
                if (e.target.closest('.remove-variant-btn')) { // Tıklanan element veya atası .remove-variant-btn ise
                    const variantRows = productVariantsContainer.querySelectorAll('.variant-row');
                    if (variantRows.length > 1) { // En az bir varyant kalsın
                        e.target.closest('.variant-row').remove();
                    } else {
                        alert("Ürünün en az bir varyantı bulunmalıdır.");
                    }
                }
            });
        }

        // Ürün Kaydet Formu Submit işlemi
        if (addProductForm) {
            addProductForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(addProductForm);
                const productData = {};

                // Ana form alanlarını topla
                productData.name = formData.get('productName');
                productData.description = formData.get('productDescription');
                productData.price = parseFloat(formData.get('productPrice')) || 0;
                productData.discountPrice = parseFloat(formData.get('productDiscountPrice')) || null;
                productData.category = formData.get('productCategory');
                productData.brand = formData.get('productBrand'); // Marka artık categoryBrands'den geliyor
                productData.generalStock = parseInt(formData.get('productStock')) || null;
                productData.sku = formData.get('productSku');

                // Resim URL'lerini ve dosya adlarını topla (simülasyon)
                productData.images = [];
                for (let i = 1; i <= 3; i++) {
                    const url = formData.get(`productImageUrl${i}`);
                    const fileInput = document.getElementById(`productFileInput${i}`);
                    if (url) {
                        productData.images.push({ type: 'url', value: url });
                    } else if (fileInput && fileInput.files.length > 0) {
                        // Gerçek projede bu dosya sunucuya yüklenir
                        productData.images.push({ type: 'file', fileName: fileInput.files[0].name, fileSize: fileInput.files[0].size });
                    }
                }

                // Varyantları topla
                productData.variants = [];
                productVariantsContainer.querySelectorAll('.variant-row').forEach(row => {
                    const type = row.querySelector('.variant-type').value;
                    const value = row.querySelector('.variant-value').value;
                    const stock = parseInt(row.querySelector('.variant-stock').value) || 0;
                    const price = parseFloat(row.querySelector('.variant-price').value) || 0;
                    if (type && value) {
                        productData.variants.push({ type, value, stock, price });
                    }
                });

                console.log('Yeni Ürün Bilgileri:', productData);
                alert('Ürün başarıyla kaydedildi! (Bu sadece bir önizleme/simülasyondur, veri gönderimi yapılmadı.)');

                addProductForm.reset(); // Formu temizle
                // Dosya isimlerini sıfırla
                document.querySelectorAll('.file-name-display').forEach(span => {
                    span.textContent = 'Dosya seçilmedi';
                });
                // İlk varyantı koru, fazlalarını sil
                const initialVariantRowHTML = `
                            <div class="variant-row">
                                <div class="form-group">
                                    <label>Tip (Örn: Renk)</label>
                                    <input type="text" name="variantType" placeholder="Renk" class="variant-type" required>
                                </div>
                                <div class="form-group">
                                    <label>Değer (Örn: Kırmızı)</label>
                                    <input type="text" name="variantValue" placeholder="Kırmızı" class="variant-value" required>
                                </div>
                                <div class="form-group">
                                    <label>Stok</label>
                                    <input type="number" name="variantStock" min="0" placeholder="0" class="variant-stock" value="0" required>
                                </div>
                                <div class="form-group">
                                    <label>Ek Fiyat (₺)</label>
                                    <input type="number" name="variantPrice" step="0.01" placeholder="0.00" class="variant-price" value="0">
                                </div>
                                <button type="button" class="remove-variant-btn" title="Varyantı Kaldır"><i class="fas fa-trash"></i></button>
                            </div>
                        `;
                productVariantsContainer.innerHTML = initialVariantRowHTML;

                // Marka seçimini başlangıç durumuna döndür
                productBrandSelect.innerHTML = '<option value="">Önce kategori seçin</option>';
                productBrandSelect.disabled = true;
            });
        }
    }

    // Marka ekleme formu için event listener'ları ayarlayan fonksiyon
    function setupBrandFormListeners() {
        const addBrandForm = document.getElementById('addBrandForm');
        const brandsTableBody = document.getElementById('brandsTableBody');
        const brandCategorySelect = document.getElementById('brandCategory');

        let nextBrandId = 0; // Otomatik ID ataması için
        // Mevcut categoryBrands içindeki en yüksek ID'yi bul
        for (const category in categoryBrands) {
            categoryBrands[category].forEach(brand => {
                if (brand.id > nextBrandId) {
                    nextBrandId = brand.id;
                }
            });
        }
        nextBrandId++; // Yeni eklenecek markanın ID'si


        // Markaları tabloya listeleme fonksiyonu
        function renderBrandsTable() {
            brandsTableBody.innerHTML = ''; // Tabloyu temizle
            const categoryMap = {
                'kadın-giyim': 'Kadın Giyim',
                'erkek-giyim': 'Erkek Giyim',
                'cocuk-giyim': 'Çocuk Giyim',
                'ayakkabi': 'Ayakkabı',
                'aksesuar': 'Aksesuar'
            };

            for (const categoryKey in categoryBrands) {
                const brandsInThisCategory = categoryBrands[categoryKey];
                const categoryName = categoryMap[categoryKey] || categoryKey; // Kategori adını al

                brandsInThisCategory.forEach(brand => {
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                                <td>${brand.id}</td>
                                <td>${categoryName}</td> <td>${brand.name}</td>
                                <td>${brand.logo ? `<img src="${brand.logo}" alt="${brand.name} Logo" style="height:25px; border-radius: 5px;">` : 'Yok'}</td>
                                <td>
                                    <button class="action-btn view">Düzenle</button>
                                    <button class="action-btn danger remove-brand" data-brand-id="${brand.id}" data-brand-category="${categoryKey}">Sil</button>
                                </td>
                            `;
                    brandsTableBody.appendChild(newRow);
                });
            }
        }

        renderBrandsTable(); // Sayfa yüklendiğinde mevcut markaları render et

        if (addBrandForm) {
            addBrandForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const brandCategory = brandCategorySelect.value;
                const brandName = document.getElementById('brandName').value;
                const brandLogo = document.getElementById('brandLogo').value;

                if (!brandCategory) {
                    alert('Lütfen bir kategori seçin.');
                    return;
                }
                if (!brandName) {
                    alert('Lütfen marka adını girin.');
                    return;
                }

                // Yeni markayı categoryBrands objesine ekle
                if (!categoryBrands[brandCategory]) {
                    categoryBrands[brandCategory] = [];
                }
                categoryBrands[brandCategory].push({
                    id: nextBrandId,
                    name: brandName,
                    logo: brandLogo
                });
                nextBrandId++; // ID'yi bir sonraki için hazırla

                renderBrandsTable(); // Tabloyu yeniden çiz

                alert(`'${brandName}' markası '${brandCategorySelect.options[brandCategorySelect.selectedIndex].text}' kategorisine başarıyla eklendi!`);
                addBrandForm.reset();
                console.log('Yeni Marka Eklendi:', categoryBrands);
            });
        }

        // Marka silme işlemi (delegasyon yöntemi)
        if (brandsTableBody) {
            brandsTableBody.addEventListener('click', (e) => {
                if (e.target.classList.contains('remove-brand')) {
                    const brandIdToRemove = parseInt(e.target.getAttribute('data-brand-id'));
                    const brandCategoryToRemove = e.target.getAttribute('data-brand-category');

                    if (confirm(`Bu markayı (ID: ${brandIdToRemove}) silmek istediğinizden emin misiniz?`)) {
                        if (categoryBrands[brandCategoryToRemove]) {
                            categoryBrands[brandCategoryToRemove] = categoryBrands[brandCategoryToRemove].filter(
                                brand => brand.id !== brandIdToRemove
                            );
                            renderBrandsTable(); // Tabloyu yeniden çiz
                            alert(`Marka (ID: ${brandIdToRemove}) silindi.`);
                            console.log('Marka Silindi, Güncel Markalar:', categoryBrands);
                        }
                    }
                }
            });
        }
    }

    // Ayarlar formu için event listener'ları ayarlayan fonksiyon
    function setupSettingsFormListeners() {
        const generalSettingsForm = document.getElementById('generalSettingsForm');
        const changePasswordForm = document.getElementById('changePasswordForm');

        if (generalSettingsForm) {
            generalSettingsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const siteName = document.getElementById('siteName').value;
                const adminEmail = document.getElementById('adminEmail').value;
                const currency = document.getElementById('currency').value;
                console.log('Genel Ayarlar Kaydedildi:', { siteName, adminEmail, currency });
                alert('Genel ayarlar başarıyla güncellendi!');
                // Gerçek projede burada backend'e ayarlar gönderilir.
            });
        }

        if (changePasswordForm) {
            changePasswordForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const currentPassword = document.getElementById('currentPassword').value;
                const newPassword = document.getElementById('newPassword').value;
                const confirmNewPassword = document.getElementById('confirmNewPassword').value;

                if (newPassword !== confirmNewPassword) {
                    alert('Yeni şifreler uyuşmuyor!');
                    return;
                }
                if (newPassword.length < 6) { // Basit kontrol
                    alert('Yeni şifre en az 6 karakter olmalıdır.');
                    return;
                }

                console.log('Şifre Değiştirme İstendi:', { currentPassword, newPassword });
                alert('Şifre değiştirme isteği alındı! (Güvenlik nedeniyle gerçek değişim backend tarafında olur)');
                changePasswordForm.reset();
                // Gerçek projede burada backend'e şifre değiştirme isteği atılır.
            });
        }
    }

    // --- Genel İşlevler ---

    // Sidebar açma/kapama işlevi
    if (sidebarToggleBtn && sidebar && mainContent) {
        sidebarToggleBtn.addEventListener('click', () => {
            if (window.innerWidth > 992) {
                sidebar.classList.toggle('collapsed');
            } else {
                sidebar.classList.toggle('open');
                document.body.classList.toggle('sidebar-open');
            }
            sidebarToggleBtn.classList.toggle('rotated');
        });
    }

    // Ekran boyutu değiştiğinde sidebar durumunu kontrol et
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            sidebar.classList.remove('open');
            document.body.classList.remove('sidebar-open');
            // Masaüstü boyutunda daraltılmış durumunu koru
            if (!sidebar.classList.contains('collapsed') && !sidebarToggleBtn.classList.contains('rotated')) {
                sidebar.classList.add('collapsed');
                sidebarToggleBtn.classList.add('rotated');
            }
        } else {
            // Mobil boyutunda sidebar'ı kapat
            sidebar.classList.remove('collapsed');
            sidebar.classList.remove('open');
            document.body.classList.remove('sidebar-open');
            sidebarToggleBtn.classList.remove('rotated');
        }
    });

    // Sayfa yüklendiğinde admin adını localStorage'dan al (simülasyon)
    const adminAvatar = document.querySelector('.admin-avatar');
    const adminNameSpan = document.querySelector('.admin-info span');

    const loggedInAdmin = localStorage.getItem('loggedInAdminUser');
    if (loggedInAdmin) {
        adminNameSpan.textContent = loggedInAdmin;
        adminAvatar.textContent = loggedInAdmin.charAt(0).toUpperCase();
    } else {
        adminNameSpan.textContent = "Admin Adı Soyadı";
        adminAvatar.textContent = "AD";
    }

    // Çıkış yap butonu işlevi
    const logoutLink = document.querySelector('.logout-section a');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('loggedInAdminUser');
            alert('Yönetici panelinden çıkış yapıldı!');
            window.location.href = 'index.html'; // Giriş sayfasına yönlendir (eğer varsa)
        });
    }

    // Sidebar menü aktif durumunu ve içerik yüklemeyi yönet
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');

            const pageId = this.getAttribute('data-page');
            loadContent(pageId);

            // Mobil cihazlarda menüye tıklayınca sidebar'ı kapat
            if (window.innerWidth <= 992) {
                sidebar.classList.remove('open');
                document.body.classList.remove('sidebar-open');
                sidebarToggleBtn.classList.remove('rotated');
            }
        });
    });

    // İlk yüklemede Gösterge Paneli'ni aktif yap ve içeriği yükle
    // Bu çağrının DOMContentLoaded içinde ve tüm elementler tanımlandıktan sonra olduğundan emin olmalıyız.
    const initialLoad = () => {
        const dashboardLink = document.querySelector('.sidebar nav ul li a[data-page="dashboard"]');
        if (dashboardLink) {
            dashboardLink.click();
        } else {
            console.error("Dashboard linki bulunamadı. Sayfa yükleme hatası.");
        }
    };

    // Sayfa tamamen yüklendiğinde initialLoad fonksiyonunu çağır
    initialLoad();

    // Başlangıçta sidebar daraltılmış olsun (masaüstü için)
    if (window.innerWidth > 992) {
        sidebar.classList.add('collapsed');
        sidebarToggleBtn.classList.add('rotated');
    }
});