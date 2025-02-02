let x = 15
export function countdown () {
  document.getElementById('timer').style.display = 'flex'
  document.getElementById('timer-tick').innerHTML = x + ' сек';
  x--;
  setTimeout(() => {
    if (x > 0 && document.querySelector('.btn')) {
      return
    }
    if (x < 0) {
      clearTimeout(timer);
      let restart = confirm('Время вышло! Если ответите ОК игра начнётся сначала, если ОТМЕНА, игра продолжится без таймера ')
      restart ? location.reload() : console.log('Продолжаем игру');
    } else {
      setTimeout(countdown, 1000);
    }
  }, 100)
}
