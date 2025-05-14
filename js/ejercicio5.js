  document.addEventListener('DOMContentLoaded', function() {
            const display = document.getElementById('display');
            const startBtn = document.getElementById('startBtn');
            const pauseBtn = document.getElementById('pauseBtn');
            const resetBtn = document.getElementById('resetBtn');
            
            let startTime;
            let elapsedTime = 0;
            let timerInterval;
            let isRunning = false;
            
            function formatTime(ms) {
                let date = new Date(ms);
                let hours = date.getUTCHours().toString().padStart(2, '0');
                let minutes = date.getUTCMinutes().toString().padStart(2, '0');
                let seconds = date.getUTCSeconds().toString().padStart(2, '0');
                let milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
                
                return `${hours}:${minutes}:${seconds}.${milliseconds}`;
            }
            
            function updateDisplay() {
                display.textContent = formatTime(elapsedTime);
            }
            
            function startTimer() {
                if (!isRunning) {
                    startTime = Date.now() - elapsedTime;
                    timerInterval = setInterval(function() {
                        elapsedTime = Date.now() - startTime;
                        updateDisplay();
                    }, 10);
                    isRunning = true;
                    toggleButtons();
                }
            }
            
            function pauseTimer() {
                if (isRunning) {
                    clearInterval(timerInterval);
                    isRunning = false;
                    toggleButtons();
                }
            }
            
            function resetTimer() {
                pauseTimer();
                elapsedTime = 0;
                updateDisplay();
                toggleButtons();
            }
            
            function toggleButtons() {
                startBtn.disabled = isRunning;
                pauseBtn.disabled = !isRunning;
            }
            
            startBtn.addEventListener('click', startTimer);
            pauseBtn.addEventListener('click', pauseTimer);
            resetBtn.addEventListener('click', resetTimer);
            
            updateDisplay();
        });