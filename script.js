function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.opacity = Math.random();
        star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);

        starsContainer.appendChild(star);
    }
}

class CountdownTimer {
    constructor(displayId, endTime) {
        this.display = document.getElementById(displayId);
        this.endTime = endTime;
        this.timer = null;
        this.start();
    }

    start() {
        this.updateDisplay();

        this.timer = setInterval(() => {
            this.updateDisplay();
        }, 1000);
    }

    updateDisplay() {
        const now = new Date().getTime();
        const diff = Math.floor((this.endTime - now) / 1000);

        if (diff <= 0) {
            clearInterval(this.timer);
            this.display.textContent = `0д 00:00:00`;
            return;
        }

        const days = Math.floor(diff / 86400);
        const remainingSeconds = diff % 86400;
        const hours = Math.floor(remainingSeconds / 3600);
        const minutes = Math.floor((remainingSeconds % 3600) / 60);
        const seconds = remainingSeconds % 60;

        const hh = hours.toString().padStart(2, '0');
        const mm = minutes.toString().padStart(2, '0');
        const ss = seconds.toString().padStart(2, '0');

        this.display.textContent = `${days}д ${hh}:${mm}:${ss}`;
    }
}

window.onload = function () {
    createStars();

    // 📌 Задаем ЖЁСТКУЮ дату окончания (например, 7 июля 2025 года, 00:00:00)
    const fixedEndDate = new Date('2025-07-07T00:00:00').getTime();

    new CountdownTimer('timerCountdown', fixedEndDate);
};
