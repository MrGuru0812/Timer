maskPhone('input[type=tel]');
const sendForm = () => {

    const errorMessage = 'Что то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
    const form = document.querySelectorAll('form');
    form.forEach(item => {
        const postData = formData => fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formData
        });
        const input = document.querySelectorAll('input');

        input.forEach(item => {
            console.log(item);
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
            postData(formData)
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('status network not 200.');
                    }
                    const input = item.querySelectorAll('input');
                    input.forEach(item => {
                        item.value = '';
                    });
                    statusMessage.textContent = successMessage;
                })
                .catch(error => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                });

        });

    });

};
export default sendForm;
