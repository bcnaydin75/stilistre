document.addEventListener('DOMContentLoaded', () => {

    const profileBtn = document.getElementById('profileBtn');
    const profileDropdown = document.getElementById('profileDropdown');

    // Profil butonu tıklanınca dropdown aç/kapat
    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Buton tıklanınca window’a gitmesin
            profileDropdown.style.display =
                (profileDropdown.style.display === 'block') ? 'none' : 'block';
        });

        // Dropdown dışına tıklanınca kapat
        document.addEventListener('click', (e) => {
            if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.style.display = 'none';
            }
        });
    }

    // Ziyaretçi Sayacı
    let count = localStorage.getItem('visitorCount');
    if (!count) {
        count = Math.floor(Math.random() * 1000) + 5000;
    } else {
        count = parseInt(count);
    }

    count++;
    localStorage.setItem('visitorCount', count);

    const counterElement = document.getElementById('visitorCount');
    let current = 0;
    const increment = Math.ceil(count / 100);

    const timer = setInterval(() => {
        current += increment;
        if (current >= count) {
            current = count;
            clearInterval(timer);
        }
        counterElement.textContent = current.toLocaleString();
    }, 20);

    // Sepete Ekle
    const addToCartButtons = document.querySelectorAll('.btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            if (e.target.textContent === "Sepete Ekle") {
                e.preventDefault();

                const cartBadge = document.querySelector('.fa-shopping-cart').nextElementSibling;
                let cartCount = parseInt(cartBadge.textContent);
                cartCount++;
                cartBadge.textContent = cartCount;

                this.textContent = "Sepete Eklendi!";
                this.style.backgroundColor = '#5cb85c';

                setTimeout(() => {
                    this.textContent = "Sepete Ekle";
                    this.style.backgroundColor = '';
                }, 2000);
            }
        });
    });

    // Newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input');
            if (emailInput.value) {
                alert(`Bültenimize abone olduğunuz için teşekkürler! ${emailInput.value}`);
                emailInput.value = '';
            }
        });
    }

    // Quick View
    const quickViewElements = document.querySelectorAll('.quick-view');
    quickViewElements.forEach(el => {
        el.addEventListener('click', function () {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            alert(`${productName} ürününü detaylı incelemek için yakında açılacak olan ürün sayfasını kullanabilirsiniz!`);
        });
    });

});
