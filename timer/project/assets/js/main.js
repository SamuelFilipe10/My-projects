const clock = document.querySelector('.clock');
const start = document.querySelector('.start');
const stopT = document.querySelector('.stop');
const restart = document.querySelector('.restart');
let seconds = 0;
let timer;

function startClock() {
    timer = setInterval(function() {
        seconds++;
        clock.innerHTML = secondsS(seconds);
    }, 1000);
}

function secondsS(s) {
    const date = new Date(s * 1000);

    return date.toLocaleTimeString('pt-BR', {
        hour12: false,
        timeZone: 'UTC',
    });
}

start.addEventListener('click', function(e) {
    clearInterval(timer);
    startClock();
})

stopT.addEventListener('click', function(e) {
    clearInterval(timer);
})

restart.addEventListener('click', function(e) {
    clearInterval(timer);
    clock.innerHTML = '00:00:00';
    seconds = 0;
})
