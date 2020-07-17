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
export default togglePopUp;
