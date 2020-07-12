
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
    countTimer('17 july 2020');

    //Menu
    const toggleMenu = () => {
        const body = document.querySelector('body'),
            menu = document.querySelector('menu'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu  = () => {
            menu.classList.toggle('active-menu');
        };
        body.addEventListener('click', () => {
            let target = event.target;
            target = target.closest('.menu');
            if (target) {
                handlerMenu();
            } else if (event.target.matches('.close-btn')) {
                handlerMenu();
            }
        });

        menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));
    };
    toggleMenu();

    //popap
    const togglePopUp = () =>  {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
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

        popup.addEventListener('click', event => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
                count = 0;
                popupContent.style.top = '10%';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';
                    count = 0;
                    popupContent.style.top = '10%';
                }
            }

        });
    };
    togglePopUp();

    //tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tabContent[i].classList.remove('d-none');
                    tab[i].classList.add('active');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');

                }
            }
        };
        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };
    tabs();
    //slider
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            // btn = document.querySelectorAll('.portfolio-btn'),
            dots = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content');
        let currentSlide = 0,
            interval;

        const createDot = () => { //создание точки
            const li = document.createElement('li');
            li.classList.add('dot');
            dots.appendChild(li);
            return li;
        };
        for (let i = 0; i < slide.length; i++) { //добавляем в список
            if (i < slide.length) {
                createDot();
            }
        }
        const dot = dots.querySelectorAll('.dot');


        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);

        };
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };
        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        };
        const startSlide = (time = 3000) => {
            interval =  setInterval(autoPlaySlide, time);
        };
        const stopSlide = () => {
            clearInterval(interval);
        };
        slider.addEventListener('click', event => {
            event.preventDefault();

            const target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });


        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') ||
            event.target.classList.contains('dot')) {
                stopSlide();
            }
        });
        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') ||
            event.target.classList.contains('dot')) {
                startSlide();
            }
        });

        startSlide(1500);
    };
    slider();
    //calc
    const calc = () => {
        const calcItem = document.querySelectorAll('.calc-item');
        calcItem.forEach(item => {
            item.addEventListener('input', e => {
                e.target.value = item.value.match(/^[0-9]*\.?[0-9]*$/, '');
            });
        });
    };
    calc();
    //command
    const dreamTeam = () => {
        const commandPhoto = document.querySelectorAll('.command__photo');
        commandPhoto.forEach(item => {
            item.addEventListener('mouseenter', e => {
                item.setAttribute('alt', e.target.src);
                e.target.src = e.target.dataset.img;
            });
            item.addEventListener('mouseleave', e => {
                e.target.src = e.target.alt;
            });
        });
    };
    dreamTeam();
});

