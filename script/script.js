maskPhone('input[type=tel]');
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
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total'),
            calcItem = document.querySelectorAll('.calc-item');
        const countSum = () => {
            let total = 0;
            let  countValue = 1;
            let dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            totalValue.textContent = Math.floor(total);

        };

        calcBlock.addEventListener('change', e => {
            const target = e.target;
            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });

        calcItem.forEach(item => {
            item.addEventListener('input', e => {
                e.target.value = item.value.match(/^(0|[1-9]\d*)([.]\d+)?/g, '');
            });
        });
    };
    calc(100);
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
    //send-ajax-form
    const sendForm = () => {

        const errorMessage = 'Что то пошло не так...',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
        const form = document.querySelectorAll('form');
        form.forEach(item => {
            const postData = body => new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.addEventListener('readystatechange', () => {
                    if (request.readyState !== 4) {
                        return;
                    }
                    if (request.status === 200) {
                        const input = item.querySelectorAll('input');
                        input.forEach(item => {
                            item.value = '';
                        });
                        const response = JSON.parse(request.response);
                        resolve(response);
                    } else {
                        reject(request.status);
                    }
                });
                request.open('POST', './server.php');
                request.setRequestHeader('Content-Type', 'application/json');

                request.send(JSON.stringify(body));

            });
            const input = document.querySelectorAll('input');
            input.forEach(item => {
                item.addEventListener('input', e => {
                    if (item.name === 'user_name' || item.name === 'user_message') {
                        e.target.value = item.value.replace(/([^а-яА-Я ]\D*)([.]\D+)?/g, '');
                    }
                });
            });

            const statusMessage = document.createElement('div');

            statusMessage.style.cssText = `font-size: 2rem;
                                            color: white;`;
            item.addEventListener('submit', event => { // по нажатию на кнопку отправить
                event.preventDefault();
                item.appendChild(statusMessage);
                statusMessage.textContent = loadMessage;
                const formData = new FormData(item);
                const body = {};
                formData.forEach((val, key) => {
                    body[key] = val;
                });
                postData(body)
                    .then(() => {
                        statusMessage.textContent = successMessage;
                    })
                    .catch(error => {
                        statusMessage.textContent = errorMessage;
                        console.error(error);
                    });
            });

        });

    };
    sendForm();
});


