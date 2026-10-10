document.getElementById('openBtn').addEventListener('click', function () {
    const secret = document.getElementById('secret');
    secret.classList.remove('hidden');
    this.textContent = '💖';
    this.disabled = true;
    this.style.cursor = 'default';
});