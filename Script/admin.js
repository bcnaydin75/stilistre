document.addEventListener('DOMContentLoaded', () => {
    const pageContent = document.getElementById('page-content');
    const pageTitle = document.querySelector('.top-bar h1');
    const navLinks = document.querySelectorAll('.main-nav ul li a');

    // Sayfa içeriklerini tutacak bir obje
    const pageTemplates = {
        dashboard: `
            <h2>Genel Bakış</h2>
            <p>Admin paneline hoş geldiniz! Buradan sitenizin genel istatistiklerini görebilirsiniz.</p>
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>Toplam Ürün</h3>
                    <p>1250</p>
                </div>
                <div class="stat-card">
                    <h3>Yeni Sipariş</h3>
                    <p>25</p>
                </div>
                <div class="stat-card">
                    <h3>Toplam Kullanıcı</h3>
                    <p>850</p>
                </div>
            </div>
        `,
        categories: `
            <h2>Kategoriler Yönetimi</h2>
            <form id="addCategoryForm">
                <div class="form-group">
                    <label for="categoryName">Kategori Adı:</label>
                    <input type="text" id="categoryName" name="categoryName" required>
                </div>
                <button type="submit" class="btn">Kategori Ekle</button>
            </form>
            <h3>Mevcut Kategoriler</h3>
            <table id="categoryList">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Kategori Adı</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>1</td><td>Erkek Giyim</td><td><button class="btn btn-sm">Düzenle</button> <button class="btn btn-sm delete-btn" data-type="category" data-id="1">Sil</button></td></tr>
                    <tr><td>2</td><td>Kadın Giyim</td><td><button class="btn btn-sm">Düzenle</button> <button class="btn btn-sm delete-btn" data-type="category" data-id="2">Sil</button></td></tr>
                </tbody>
            </table>
        `,
        products: `
            <h2>Ürünler Yönetimi</h2>
            <form id="addProductForm">
                <div class="form-group">
                    <label for="productName">Ürün Adı:</label>
                    <input type="text" id="productName" name="productName" required>
                </div>
                <div class="form-group">
                    <label for="productCategory">Kategori:</label>
                    <select id="productCategory" name="productCategory">
                        <option value="">Seçiniz</option>
                        <option value="1">Erkek Giyim</option>
                        <option value="2">Kadın Giyim</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="productBrand">Marka:</label>
                    <select id="productBrand" name="productBrand">
                        <option value="">Seçiniz</option>
                        <option value="1">Marka A</option>
                        <option value="2">Marka B</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="productPrice">Fiyat:</label>
                    <input type="number" id="productPrice" name="productPrice" step="0.01" required>
                </div>
                <div class="form-group">
                    <label for="productDescription">Açıklama:</label>
                    <textarea id="productDescription" name="productDescription" rows="4"></textarea>
                </div>
                <div class="form-group">
                    <label for="productImage">Ürün Görseli:</label>
                    <input type="file" id="productImage" name="productImage" accept="image/*">
                </div>
                <button type="submit" class="btn">Ürün Ekle</button>
            </form>
            <h3>Mevcut Ürünler</h3>
            <table id="productList">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ürün Adı</th>
                        <th>Kategori</th>
                        <th>Marka</th>
                        <th>Fiyat</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>1</td><td>T-shirt</td><td>Erkek Giyim</td><td>Marka A</td><td>99.99 TL</td><td><button class="btn btn-sm">Düzenle</button> <button class="btn btn-sm delete-btn" data-type="product" data-id="1">Sil</button></td></tr>
                    <tr><td>2</td><td>Kot Pantolon</td><td>Kadın Giyim</td><td>Marka B</td><td>199.99 TL</td><td><button class="btn btn-sm">Düzenle</button> <button class="btn btn-sm delete-btn" data-type="product" data-id="2">Sil</button></td></tr>
                </tbody>
            </table>
        `,
        brands: `
            <h2>Markalar Yönetimi</h2>
            <form id="addBrandForm">
                <div class="form-group">
                    <label for="brandName">Marka Adı:</label>
                    <input type="text" id="brandName" name="brandName" required>
                </div>
                <button type="submit" class="btn">Marka Ekle</button>
            </form>
            <h3>Mevcut Markalar</h3>
            <table id="brandList">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Marka Adı</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>1</td><td>Marka A</td><td><button class="btn btn-sm">Düzenle</button> <button class="btn btn-sm delete-btn" data-type="brand" data-id="1">Sil</button></td></tr>
                    <tr><td>2</td><td>Marka B</td><td><button class="btn btn-sm">Düzenle</button> <button class="btn btn-sm delete-btn" data-type="brand" data-id="2">Sil</button></td></tr>
                </tbody>
            </table>
        `,
        orders: `
            <h2>Siparişler Yönetimi</h2>
            <p>Burada tüm siparişleri görebilir, sipariş durumlarını güncelleyebilir ve detaylarını inceleyebilirsiniz.</p>
            <table>
                <thead>
                    <tr>
                        <th>Sipariş ID</th>
                        <th>Müşteri</th>
                        <th>Toplam Tutar</th>
                        <th>Durum</th>
                        <th>Tarih</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>#001</td><td>Ayşe Yılmaz</td><td>250.00 TL</td><td>Hazırlanıyor</td><td>2025-07-28</td><td><button class="btn btn-sm">Detay</button></td></tr>
                    <tr><td>#002</td><td>Mehmet Can</td><td>120.50 TL</td><td>Gönderildi</td><td>2025-07-27</td><td><button class="btn btn-sm">Detay</button></td></tr>
                </tbody>
            </table>
        `,
        users: `
            <h2>Kullanıcı Yönetimi</h2>
            <p>Sitenizdeki kullanıcıları yönetin, rol ve yetkilerini düzenleyin.</p>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ad Soyad</th>
                        <th>E-posta</th>
                        <th>Rol</th>
                        <th>Kayıt Tarihi</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>1</td><td>Admin User</td><td>admin@example.com</td><td>Admin</td><td>2024-01-01</td><td><button class="btn btn-sm">Düzenle</button></td></tr>
                    <tr><td>2</td><td>Deniz Aksoy</td><td>deniz@example.com</td><td>Müşteri</td><td>2024-05-15</td><td><button class="btn btn-sm">Düzenle</button></td></tr>
                </tbody>
            </table>
        `,
        settings: `
            <h2>Ayarlar</h2>
            <p>Sitenizin genel ayarlarını buradan yapılandırabilirsiniz.</p>
            <form>
                <div class="form-group">
                    <label for="siteName">Site Adı:</label>
                    <input type="text" id="siteName" value="Tekstil Mağazası">
                </div>
                <div class="form-group">
                    <label for="currency">Para Birimi:</label>
                    <select id="currency">
                        <option value="TL">TL</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                </div>
                <button type="submit" class="btn">Ayarları Kaydet</button>
            </form>
        `
    };

    // Sayfa yüklenir yüklenmez dashboard'u göster
    loadPage('dashboard');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            const page = e.target.dataset.page;
            loadPage(page);

            navLinks.forEach(nav => nav.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    function loadPage(pageName) {
        if (pageTemplates[pageName]) {
            pageContent.innerHTML = pageTemplates[pageName];
            const titleText = pageName.charAt(0).toUpperCase() + pageName.slice(1).replace(/([A-Z])/g, ' $1').trim();
            pageTitle.textContent = titleText;

            if (pageName === 'categories') {
                attachCategoryFormHandler();
                // Kategoriler sayfasında silme butonlarını dinle
                attachDeleteHandlers('category');
            } else if (pageName === 'products') {
                attachProductFormHandler();
                // Ürünler sayfasında silme butonlarını dinle
                attachDeleteHandlers('product');
            } else if (pageName === 'brands') {
                attachBrandFormHandler();
                // Markalar sayfasında silme butonlarını dinle
                attachDeleteHandlers('brand');
            }
        } else {
            pageContent.innerHTML = `<h2>Sayfa Bulunamadı</h2><p>Aradığınız sayfa mevcut değil.</p>`;
            pageTitle.textContent = 'Hata';
        }
    }

    // --- SİLME İŞLEVSELLİĞİ İÇİN GÜNCELLENMİŞ KODLAR ---

    function attachDeleteHandlers(type) {
        // Sayfadaki tüm silme butonlarını seçer
        const deleteButtons = document.querySelectorAll(`.delete-btn[data-type="${type}"]`);
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // `e.target` yerine `e.currentTarget` kullanarak, ikonun kendisine değil, butona tıklandığından emin oluruz.
                const id = e.currentTarget.dataset.id;
                const row = e.currentTarget.closest('tr');
                deleteItem(type, id, row);
            });
        });
    }

    function deleteItem(type, id, rowElement) {
        // Onay penceresi göster
        if (confirm(`Gerçekten bu ${type} öğesini silmek istediğinizden emin misiniz?`)) {
            // Evet derse, silme işlemini başlat
            // Buraya gerçek API çağrınızı ekleyeceksiniz (fetch, axios vb.)
            // Örneğin:
            // fetch(`/api/${type}/delete`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ id: id })
            // })
            // .then(response => response.json())
            // .then(data => {
            //     if (data.success) {
            //         rowElement.remove(); // Başarılıysa DOM'dan kaldır
            //         alert(`${type} başarıyla silindi.`);
            //     } else {
            //         alert(`Hata: ${type} silinemedi. Mesaj: ` + data.message);
            //     }
            // })
            // .catch(error => {
            //     console.error('Hata:', error);
            //     alert('Silme işlemi sırasında bir hata oluştu.');
            // });

            // Şimdilik sadece simülasyon yapıyoruz
            console.log(`Simülasyon: ${type} (ID: ${id}) siliniyor.`);
            rowElement.remove();
            alert(`${type} başarıyla silindi! (Bu sadece örnek, gerçek silme işlemi yok)`);
        }
    }

    // --- Örnek Form İşleyicileri ---

    function attachCategoryFormHandler() {
        const form = document.getElementById('addCategoryForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const categoryNameInput = document.getElementById('categoryName');
                const categoryName = categoryNameInput.value.trim();

                if (categoryName) {
                    console.log('Yeni Kategori Eklendi:', categoryName);
                    alert(`Kategori "${categoryName}" başarıyla eklendi! (Bu sadece örnek, gerçek veritabanı işlemi yok)`);
                    categoryNameInput.value = '';
                    updateCategoryList(categoryName);
                } else {
                    alert('Lütfen kategori adını girin.');
                }
            });
        }
    }

    function updateCategoryList(newCategoryName) {
        const categoryListBody = document.querySelector('#categoryList tbody');
        if (categoryListBody) {
            const newId = categoryListBody.children.length + 1;
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${newId}</td>
                <td>${newCategoryName}</td>
                <td><button class="btn btn-sm">Düzenle</button> <button class="btn btn-sm delete-btn" data-type="category" data-id="${newId}">Sil</button></td>
            `;
            categoryListBody.appendChild(newRow);
            const deleteButton = newRow.querySelector('.delete-btn');
            deleteButton.addEventListener('click', (e) => {
                deleteItem('category', newId, newRow);
            });
        }
    }

    function attachProductFormHandler() {
        const form = document.getElementById('addProductForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const productName = document.getElementById('productName').value.trim();
                const productCategory = document.getElementById('productCategory').value;
                const productBrand = document.getElementById('productBrand').value;
                const productPrice = document.getElementById('productPrice').value;
                const productDescription = document.getElementById('productDescription').value.trim();
                const productImage = document.getElementById('productImage').files[0];

                if (productName && productCategory && productBrand && productPrice) {
                    const productData = {
                        name: productName,
                        category: productCategory,
                        brand: productBrand,
                        price: parseFloat(productPrice),
                        description: productDescription,
                        image: productImage ? productImage.name : 'N/A'
                    };
                    console.log('Yeni Ürün Eklendi:', productData);
                    alert(`Ürün "${productName}" başarıyla eklendi! (Bu sadece örnek)`);
                    form.reset();
                    updateProductList(productData);
                } else {
                    alert('Lütfen tüm gerekli alanları doldurun.');
                }
            });
        }
    }

    function updateProductList(newProduct) {
        const productListBody = document.querySelector('#productList tbody');
        if (productListBody) {
            const newId = productListBody.children.length + 1;
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${newId}</td>
                <td>${newProduct.name}</td>
                <td>${newProduct.category}</td>
                <td>${newProduct.brand}</td>
                <td>${newProduct.price.toFixed(2)} TL</td>
                <td><button class="btn btn-sm">Düzenle</button> <button class="btn btn-sm delete-btn" data-type="product" data-id="${newId}">Sil</button></td>
            `;
            productListBody.appendChild(newRow);
            const deleteButton = newRow.querySelector('.delete-btn');
            deleteButton.addEventListener('click', (e) => {
                deleteItem('product', newId, newRow);
            });
        }
    }

    function attachBrandFormHandler() {
        const form = document.getElementById('addBrandForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const brandNameInput = document.getElementById('brandName');
                const brandName = brandNameInput.value.trim();

                if (brandName) {
                    console.log('Yeni Marka Eklendi:', brandName);
                    alert(`Marka "${brandName}" başarıyla eklendi! (Bu sadece örnek)`);
                    brandNameInput.value = '';
                    updateBrandList(brandName);
                } else {
                    alert('Lütfen marka adını girin.');
                }
            });
        }
    }

    function updateBrandList(newBrandName) {
        const brandListBody = document.querySelector('#brandList tbody');
        if (brandListBody) {
            const newId = brandListBody.children.length + 1;
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${newId}</td>
                <td>${newBrandName}</td>
                <td><button class="btn btn-sm">Düzenle</button> <button class="btn btn-sm delete-btn" data-type="brand" data-id="${newId}">Sil</button></td>
            `;
            brandListBody.appendChild(newRow);
            const deleteButton = newRow.querySelector('.delete-btn');
            deleteButton.addEventListener('click', (e) => {
                deleteItem('brand', newId, newRow);
            });
        }
    }
});

// Bu listener'lar, sayfa içeriği değiştiğinde yeniden atanmıyorsa
// bu şekilde kalabilir. Ancak, eğer formlar dinamik yükleniyorsa
// bu kodları da `loadPage` içindeki `attachCategoryFormHandler`
// fonksiyonuna entegre etmeniz daha doğru olur.

document.getElementById('saveCategoryBtn')?.addEventListener('click', function(e) {
    e.preventDefault(); 
    const categoryName = document.getElementById('categoryName').value;

    if (!categoryName) {
        alert('Kategori adı boş olamaz.');
        return;
    }

    fetch('add_category.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ categoryName: categoryName })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            window.location.reload();
        } else {
            alert('Hata: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Hata:', error);
        alert('İşlem sırasında bir hata oluştu.');
    });
});

document.getElementById('addCategoryBtn')?.addEventListener('click', function() {
    document.getElementById('categoryForm').style.display = 'block';
});


function attachDeleteHandlers(type) {
    const deleteButtons = document.querySelectorAll(`.delete-btn[data-type="${type}"]`);
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            const row = e.currentTarget.closest('tr');
            deleteItem(type, id, row);
        });
    });
}