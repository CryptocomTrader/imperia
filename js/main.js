// Ініціалізація AOS (анімації при скролі)
AOS.init({
    duration: 1000,
    once: true
});

// Плавний скрол до секцій
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Зміна стилів навігації при скролі
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Валідація та обробка форми замовлення
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Отримання даних форми
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Тут можна додати відправку даних на сервер
    console.log('Дані замовлення:', data);
    
    // Показ повідомлення про успішне замовлення
    alert('Дякуємо за замовлення! Ми зв\'яжемося з вами найближчим часом.');
    
    // Закриття модального вікна
    const modal = bootstrap.Modal.getInstance(document.getElementById('orderModal'));
    modal.hide();
    
    // Очищення форми
    this.reset();
});

// Валідація та обробка контактної форми
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Отримання даних форми
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Тут можна додати відправку даних на сервер
    console.log('Контактні дані:', data);
    
    // Показ повідомлення про успішну відправку
    alert('Дякуємо за ваше повідомлення! Ми зв\'яжемося з вами найближчим часом.');
    
    // Очищення форми
    this.reset();
});

// Маска для телефону
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', function(e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
});

// Анімація цін
const prices = document.querySelectorAll('.new-price');
prices.forEach(price => {
    const priceValue = parseInt(price.textContent);
    let currentValue = 0;
    const step = priceValue / 100;
    
    const animate = () => {
        if (currentValue < priceValue) {
            currentValue += step;
            price.textContent = Math.round(currentValue) + ' грн';
            requestAnimationFrame(animate);
        } else {
            price.textContent = priceValue + ' грн';
        }
    };
    
    // Запуск анімації при появі елемента у viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(price);
});
