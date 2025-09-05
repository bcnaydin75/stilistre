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