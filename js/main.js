// Ініціалізація AOS (анімації при скролі)
AOS.init();

// Плавний скрол до секцій
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Обробка відправки форми
document.querySelector('form[name="contact"]').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = this.querySelector('input[name="name"]').value || 'Не вказано';
    const phone = this.querySelector('input[name="phone"]').value || 'Не вказано';
    const message = this.querySelector('textarea[name="message"]').value || 'Не вказано';
    
    try {
        // Відправляємо через новий webhook
        const response = await fetch('https://hook.eu2.make.com/44ts1ranli5d07hkyyew65f8tvm6q9gg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                phone: phone,
                message: message
            })
        });

        if (response.ok) {
            // Очищаємо форму
            this.reset();
            // Показуємо повідомлення про успіх
            alert('Дякуємо! Ми зв\'яжемося з вами найближчим часом.');
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Виникла помилка. Спробуйте пізніше.');
    }
});

// Маска для телефону
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', function(e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
});
