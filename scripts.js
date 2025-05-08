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

class Timer {
    constructor(hoursId, minutesId, secondsId, timerId, startId, stopId, resetId) {
        this.hoursInput = document.getElementById(hoursId);
        this.minutesInput = document.getElementById(minutesId);
        this.secondsInput = document.getElementById(secondsId);
        this.display = document.getElementById(timerId);
        this.startBtn = document.getElementById(startId);
        this.stopBtn = document.getElementById(stopId);
        this.resetBtn = document.getElementById(resetId);

        this.timer = null;
        this.totalSeconds = 0;
        this.isRunning = false;

        this.init();
    }

    init() {
        this.startBtn.addEventListener('click', () => this.start());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.resetBtn.addEventListener('click', () => this.reset());

        this.hoursInput.addEventListener('change', () => this.validateInput(this.hoursInput, 23));
        this.minutesInput.addEventListener('change', () => this.validateInput(this.minutesInput, 59));
        this.secondsInput.addEventListener('change', () => this.validateInput(this.secondsInput, 59));

        this.reset();
    }

    validateInput(input, max) {
        if (input.value > max) input.value = max;
        if (input.value < 0) input.value = 0;
        this.reset();
    }

    start() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.startBtn.disabled = true;
        this.stopBtn.disabled = false;

        this.timer = setInterval(() => {
            this.totalSeconds++;
            this.updateDisplay();
        }, 1000);
    }

    stop() {
        if (!this.isRunning) return;

        this.isRunning = false;
        clearInterval(this.timer);
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
    }

    reset() {
        this.stop();
        const hours = parseInt(this.hoursInput.value) || 23;
        const minutes = parseInt(this.minutesInput.value) || 50;
        const seconds = parseInt(this.secondsInput.value) || 0;

        this.totalSeconds = hours * 3600 + minutes * 60 + seconds;
        this.updateDisplay();
    }

    updateDisplay() {
        const days = Math.floor(this.totalSeconds / 86400);
        const remainingSeconds = this.totalSeconds % 86400;

        const hours = Math.floor(remainingSeconds / 3600);
        const minutes = Math.floor((remainingSeconds % 3600) / 60);
        const seconds = remainingSeconds % 60;

        const hh = hours.toString().padStart(2, '0');
        const mm = minutes.toString().padStart(2, '0');
        const ss = seconds.toString().padStart(2, '0');

        if (days > 0) {
            this.display.textContent = `${days}д ${hh}:${mm}:${ss}`;
        } else {
            this.display.textContent = `${hh}:${mm}:${ss}`;
        }
    }
}

window.onload = function() {
    createStars();
    new Timer('hours1', 'minutes1', 'seconds1', 'timer1', 'start1', 'stop1', 'reset1');
};
