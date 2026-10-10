// ===== Переключение экранов =====
function nextScreen(num) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen' + num).classList.add('active');
}

// ===== Выбор еды → экран 6 =====
function chooseFood(food) {
    localStorage.setItem('chosenFood', food);
    nextScreen(6);
}

// ===== Выбор напитка → финал =====
function chooseDrink(drink) {
    localStorage.setItem('chosenDrink', drink);
    nextScreen(7);
    showFinalChoices();
}

// ===== Показ выбора на финале =====
function showFinalChoices() {
    const foodEl = document.getElementById('finalFood');
    const drinkEl = document.getElementById('finalDrink');
    const food = localStorage.getItem('chosenFood');
    const drink = localStorage.getItem('chosenDrink');

    if (foodEl && food) foodEl.textContent = `🍽️ Твой выбор: ${food}`;
    if (drinkEl && drink) drinkEl.textContent = `🥤 Пить будешь: ${drink}`;
}

// ===== Убегающие кнопки =====
function makeDodgingButton(btn, messages) {
    if (!btn) return;
    let count = 0;

    function move() {
        count++;
        btn.textContent = messages[Math.min(count, messages.length - 1)];
        const scale = Math.max(0.5, 1 - count * 0.07);
        const x = (Math.random() - 0.5) * 180;
        const y = (Math.random() - 0.5) * 140;
        btn.style.transform = `translate(calc(-50% + ${x}px), ${y}px) scale(${scale})`;
        if (count >= 8) {
            btn.style.opacity = '0';
            btn.style.pointerEvents = 'none';
        }
    }

    if ('ontouchstart' in window) {
        btn.addEventListener('touchstart', e => { e.preventDefault(); move(); }, { passive: false });
    } else {
        btn.addEventListener('mouseenter', move);
    }
    btn.addEventListener('click', e => { e.preventDefault(); move(); });
}

makeDodgingButton(document.getElementById('canBtn'),
    ['Могу 🤔', 'Уверена?', 'Не поймала 😜', 'Мимо!', 'Ещё разок', 'Хи-хи', 'Не тут-то было', 'Сдавайся 😏']);
makeDodgingButton(document.getElementById('disagreeBtn'),
    ['Не согласна 😤', 'Уверена?', 'Подумай ещё', 'Не-не-не 😜', 'Мимо!', 'Хи-хи', 'Не тут-то было', 'Сдавайся 😏']);

// ===== Фоновые сердечки =====
const heartsBg = document.getElementById('heartsBg');
const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '🌸', '✨'];

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
    heart.style.animationDuration = (Math.random() * 6 + 6) + 's';
    heart.style.animationDelay = Math.random() * 3 + 's';
    heartsBg.appendChild(heart);
    setTimeout(() => heart.remove(), 15000);
}
setInterval(createHeart, 700);
for (let i = 0; i < 6; i++) setTimeout(createHeart, i * 300);