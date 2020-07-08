
const greeting = document.getElementById('greeting'),
    dayOfWeek = document.getElementById('day-of-week'),
    newYear = document.getElementById('new-year'),
    timeHours = document.getElementById('time-hours'),
    timeMinutes = document.getElementById('time-minutes'),
    timeSeconds = document.getElementById('time-seconds');
//приветсвие
const today = new Date(),
    hours = today.getHours(),
    dayWeek = today.getDay();

if (hours >= 12  || hours <= 17) {
    greeting.textContent = 'Добрый день!';

} else if (hours >= 17 || hours <= 24) {
    greeting.textContent = 'Добрый вечер!';

} else if (hours >= 24 || hours <= 5) {
    greeting.textContent = 'Доброй ночи!';

} else {
    greeting.textContent = 'Доброе утро!';
}

// день недели
const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
dayOfWeek.textContent = 'Сегодня: ' + days[dayWeek];


// время
setInterval(() => {
    const date = new Date();

    date.getHours() < 10 ? timeHours.textContent = '0' + date.getHours() :
        timeHours.textContent = date.getHours();
    date.getMinutes() < 10 ? timeMinutes.textContent =  '0' + date.getMinutes() :
        timeMinutes.textContent = date.getMinutes();
    date.getSeconds() < 10 ? timeSeconds.textContent =  '0' + date.getSeconds() :
        timeSeconds.textContent = date.getSeconds();

}, 1000);

// до нового года
function getRemainingTime(newYear) {
    const newYearDate = new Date(newYear),
        todayDate = new Date(),
        stopDay = newYearDate.getTime(),
        thisDay = todayDate.getTime(),
        remainingDays = (stopDay - thisDay) / 1000,
        day = Math.floor(remainingDays / 60 / 60 / 24);

    return day;
}
getRemainingTime('1 january 2021');

newYear.textContent = 'До Нового Года отсалось: ' + getRemainingTime('1 january 2021') + ' дней!';



