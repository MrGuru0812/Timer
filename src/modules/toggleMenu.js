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
export default toggleMenu;
