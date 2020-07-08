
window.addEventListener('DOMContentLoaded', () => {

    //Timer
    function countTimer(deadLine) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            const dateStop = new Date(deadLine).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);

            return {
                timeRemaining,
                hours,
                minutes,
                seconds,
            };
        }

        const updateClock = setInterval(() => {
            const timer = getTimeRemaining(),
                idTimer = document.getElementById('timer');

            timer.hours < 10 ? timerHours.textContent = '0' + timer.hours :
                timerHours.textContent = timer.hours;
            timer.minutes < 10 ?  timerMinutes.textContent = '0' + timer.minutes :
                timerMinutes.textContent = timer.minutes;
            timer.seconds < 10 ? timerSeconds.textContent = '0' + timer.seconds :
                timerSeconds.textContent =  timer.seconds;


            if (timer.timeRemaining > 0) {
                setTimeout(updateClock, 1000);
            } else if (timer.timeRemaining <= 0) {
                clearInterval(updateClock);

                idTimer.style.color = 'red';

                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }

        }, 1000);

    }
    countTimer('9 july 2020');

    //Menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu  = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);

        menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));
    };
    toggleMenu();

    //popap
    const togglePopUp = () =>  {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupContent = document.querySelector('.popup-content');
        let count = 0;

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                const popupModal = function popupModal() {
                    const width = document.documentElement.clientWidth;
                    if (width < 768) {
                        // убрать выполнение анимации
                        clearTimeout(popupModal, 10);
                    } else if (count < 200) { //выполнение анимации
                        count++;
                        popupContent.style.top = count + 'px';
                        setTimeout(popupModal, 10);
                    }
                };
                setTimeout(popupModal, 10);
            });
        });
        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
            count = 0;
            popupContent.style.top = '10%';
        });
    };
    togglePopUp();
});

