document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.sidebar-menu a');
    const sections = document.querySelectorAll('.section');

    const confirmationBox = document.getElementById('deleteConfirmationBox');
    const confirmDeleteBtn = document.getElementById('confirmDelete');
    const cancelDeleteBtn = document.getElementById('cancelDelete');

    let itemToDelete = null;

    // Sayfa değiştirme işlevini yönetir
    const switchSection = (sectionId) => {
        // Tüm navigasyon linklerinin aktif sınıfını kaldır
        navLinks.forEach(link => link.classList.remove('active'));

        // Doğru navigasyon linkine aktif sınıfını ekle
        const activeLink = document.querySelector(`.sidebar-menu a[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Tüm bölümleri gizle
        sections.forEach(section => section.classList.remove('active'));

        // İlgili bölümü göster
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Formları gizle (ekstra güvenlik için)
        const productForm = document.getElementById('productForm');
        if (productForm) productForm.style.display = 'none';

        const categoryForm = document.getElementById('categoryForm');
        if (categoryForm) categoryForm.style.display = 'none';
    };

    // Navigasyon linklerine tıklama olay dinleyicisi
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const section = e.target.closest('a').dataset.section;
            if (section) {
                e.preventDefault();
                switchSection(section);
            }
        });
    });

    // Sayfalar yüklendiğinde, dashboard'u aktif hale getir
    switchSection('dashboard');

    // "Yeni Ürün Ekle" butonuna tıklama olay dinleyicisi
    const addProductBtn = document.getElementById('addProductBtn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', () => {
            const form = document.getElementById('productForm');
            if (form) {
                form.style.display = form.style.display === 'none' ? 'block' : 'none';
            }
        });
    }

    // "Yeni Kategori Ekle" butonuna tıklama olay dinleyicisi
    const addCategoryBtn = document.getElementById('addCategoryBtn');
    if (addCategoryBtn) {
        addCategoryBtn.addEventListener('click', () => {
            const form = document.getElementById('categoryForm');
            if (form) {
                form.style.display = form.style.display === 'none' ? 'block' : 'none';
            }
        });
    }

    // Silme onayı ve işlemi (Önceki kodunuzdan)
    document.addEventListener('click', function (e) {
        const deleteBtn = e.target.closest('.delete-btn');
        if (deleteBtn) {
            const id = deleteBtn.getAttribute('data-id');
            const type = deleteBtn.getAttribute('data-type');
            const rowElement = deleteBtn.closest('tr');

            itemToDelete = { type, id, rowElement };
            if (confirmationBox) {
                confirmationBox.style.display = 'flex';
            }
        }
    });

    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', async () => {
            if (!itemToDelete) {
                return;
            }

            const { type, id, rowElement } = itemToDelete;

            try {
                // Backend'e silme isteği gönderme
                const response = await fetch(`../admin/delete_${type}.php`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: id }),
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    // Silme başarılıysa, tablo satırını kaldır
                    if (rowElement) {
                        rowElement.remove();
                    }
                } else {
                    // Hata mesajını göster
                }
            } catch (error) {
                // Ağ hatasını yakala
            } finally {
                // Onay kutusunu gizle ve durumu sıfırla
                if (confirmationBox) {
                    confirmationBox.style.display = 'none';
                }
                itemToDelete = null;
            }
        });
    }

    // Ürün görseli önizlemesi (Önceki kodunuzdan)
    const productImageInput = document.getElementById('productImage');
    if (productImageInput) {
        productImageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            const previewImage = document.getElementById('previewImage');
            const noImageText = document.getElementById('noImageText');

            if (file && previewImage && noImageText) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    previewImage.src = e.target.result;
                    previewImage.style.display = 'block';
                    noImageText.style.display = 'none';
                };
                reader.readAsDataURL(file);
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.sidebar-menu a');
    const sections = document.querySelectorAll('.section');

    const confirmationBox = document.getElementById('deleteConfirmationBox');
    const confirmDeleteBtn = document.getElementById('confirmDelete');
    const cancelDeleteBtn = document.getElementById('cancelDelete');

    // Form açma/kapama butonları
    const addProductBtn = document.getElementById('addProductBtn');
    const addCategoryBtn = document.getElementById('addCategoryBtn');

    let itemToDelete = null;

    // Sayfa değiştirme işlevini yönetir
    const switchSection = (sectionId) => {
        navLinks.forEach(link => link.classList.remove('active'));

        const activeLink = document.querySelector(`.sidebar-menu a[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        sections.forEach(section => section.classList.remove('active'));

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Tüm formları gizle
        const productForm = document.getElementById('productForm');
        if (productForm) productForm.style.display = 'none';

        const categoryForm = document.getElementById('categoryForm');
        if (categoryForm) categoryForm.style.display = 'none';
    };

    // Navigasyon linklerine tıklama olay dinleyicisi
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const section = e.target.closest('a').dataset.section;
            if (section) {
                e.preventDefault();
                switchSection(section);
            }
        });
    });

    // Butonlara tıklayınca formları göster/gizle
    if (addProductBtn) {
        addProductBtn.addEventListener('click', () => {
            const form = document.getElementById('productForm');
            if (form) {
                form.style.display = form.style.display === 'none' || form.style.display === '' ? 'block' : 'none';
            }
        });
    }

    if (addCategoryBtn) {
        addCategoryBtn.addEventListener('click', () => {
            const form = document.getElementById('categoryForm');
            if (form) {
                form.style.display = form.style.display === 'none' || form.style.display === '' ? 'block' : 'none';
            }
        });
    }

    // Başlangıçta dashboard'u aktif hale getir
    switchSection('dashboard');

    // Silme onayı ve işlemi
    document.addEventListener('click', function (e) {
        const deleteBtn = e.target.closest('.delete-btn');
        if (deleteBtn) {
            const id = deleteBtn.getAttribute('data-id');
            const type = deleteBtn.getAttribute('data-type');
            const rowElement = deleteBtn.closest('tr');

            itemToDelete = { type, id, rowElement };
            if (confirmationBox) {
                confirmationBox.style.display = 'flex';
            }
        }
    });

    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', () => {
            if (itemToDelete) {
                if (itemToDelete.rowElement) {
                    itemToDelete.rowElement.remove();
                }
            }
            if (confirmationBox) {
                confirmationBox.style.display = 'none';
            }
            itemToDelete = null;
        });
    }

    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', () => {
            if (confirmationBox) {
                confirmationBox.style.display = 'none';
            }
            itemToDelete = null;
        });
    }


    // Ürün görseli önizlemesi
    const productImageInput = document.getElementById('productImage');
    if (productImageInput) {
        productImageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            const previewImage = document.getElementById('previewImage');
            const noImageText = document.getElementById('noImageText');

            if (file && previewImage && noImageText) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    previewImage.src = e.target.result;
                    previewImage.style.display = 'block';
                    noImageText.style.display = 'none';
                };
                reader.readAsDataURL(file);
            }
        });
    }
});
const categoryAddForm = document.getElementById('addCategoryForm');
if (categoryAddForm) {
    categoryAddForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Formun normal gönderimini engelle

        const categoryNameInput = document.getElementById('categoryName');
        const categoryName = categoryNameInput.value.trim();

        if (categoryName === '') {
            return;
        }

        try {
            const response = await fetch('../admin/add_category.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ categoryName: categoryName }),
            });

            const result = await response.json();

            if (result.success) {
                categoryNameInput.value = ''; // Input alanını temizle
                // İsteğe bağlı: Kategori listesini dinamik olarak güncelle
                location.reload();
            } else {
            }
        } catch (error) {
            console.error('İstek hatası:', error);
        }
    });
}
const submitProductBtn = document.getElementById('submitProductBtn');

if (submitProductBtn) {
    submitProductBtn.addEventListener('click', async () => {
        const productName = document.getElementById('productName').value.trim();
        const productCategory = document.getElementById('productCategory').value;
        const productPrice = document.getElementById('productPrice').value.trim();
        const productDiscount = document.getElementById('productDiscount').value.trim() || 0;
        const productStock = document.getElementById('productStock').value.trim();
        const productBrand = document.getElementById('productBrand').value.trim();
        const productDescription = document.getElementById('productDescription').value.trim();
        const productImageInput = document.getElementById('productImage');
        const productImage = productImageInput.files[0];

        if (!productName || !productCategory || !productPrice || !productStock || !productBrand || !productDescription || !productImage) {
            alert("Lütfen tüm alanları doldurun ve görsel seçin.");
            return;
        }

        const formData = new FormData();
        formData.append('product_name', productName);
        formData.append('category_id', productCategory);
        formData.append('discount_price', productDiscount);
        formData.append('stock', productStock); formData.append('price', productPrice);
        formData.append('brand', productBrand);
        formData.append('description', productDescription);
        formData.append('image', productImage);

        try {
            const response = await fetch('../admin/add_product.php', {
                method: 'POST',
                body: formData
            });

            // JSON olmayan yanıt geldiğinde bu satır hata verir
            const resultText = await response.text();
            try {
                const result = JSON.parse(resultText);

                if (result.success) {
                    alert("Ürün başarıyla eklendi.");
                    location.reload();
                } else {
                    alert("Ürün eklenemedi: " + (result.message || 'Bilinmeyen hata.'));
                }

            } catch (parseError) {
                console.error("Geçersiz JSON yanıt:", resultText);
                alert("Sunucudan beklenmeyen yanıt geldi.");
            }

        } catch (error) {
            console.error("Fetch hatası:", error);
            alert("Bir hata oluştu.");
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const confirmationBox = document.getElementById('deleteConfirmationBox'); // Onay kutusu div'in id'si
    const confirmDeleteBtn = document.getElementById('confirmDelete');       // "Evet Sil" butonu
    const cancelDeleteBtn = document.getElementById('cancelDelete');         // "İptal" butonu

    let itemToDelete = null;  // Silinecek ürün bilgisi burada tutulacak

    // Silme butonlarına tıklanınca
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            if (!productId) {
                alert('Ürün ID bulunamadı!');
                return;
            }
            // Silinecek ürün ve ilgili satırı bul
            const row = button.closest('tr');
            itemToDelete = { productId, row };

            // Onay kutusunu göster
            confirmationBox.style.display = 'flex';
        });
    });

    // Onayla butonuna tıklandığında silme isteği gönder
    confirmDeleteBtn.addEventListener('click', async () => {
        if (!itemToDelete) return;

        try {
            const response = await fetch('delete_product.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: 'id=' + encodeURIComponent(itemToDelete.productId)
            });

            const result = await response.json();

            if (result.success) {
                // Başarılıysa satırı DOM'dan kaldır
                if (itemToDelete.row) {
                    itemToDelete.row.remove();
                }
                alert('Ürün başarıyla silindi.');
            } else {
            }
        } catch (error) {
            alert('Silme isteğinde hata oluştu: ' + error.message);
        } finally {
            confirmationBox.style.display = 'none';
            itemToDelete = null;
        }
    });

    // İptal butonu
    cancelDeleteBtn.addEventListener('click', () => {
        confirmationBox.style.display = 'none';
        itemToDelete = null;
    });
});
