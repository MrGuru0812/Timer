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
export default dreamTeam;
