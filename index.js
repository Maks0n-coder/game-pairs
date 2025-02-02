import { Card } from "./Card.js";
import { AmazingCard } from "./Amazingcard.js";
import { countdown } from "./timer.js";

// Переменные
const container = document.getElementById('container')
const playingField = document.getElementById('game')
let firstCard = null
let secondCard = null
let arr = []

// Функция создания чекбокса
function checkbox() {
  const checkBlock = document.createElement('div')
  checkBlock.classList.add('check-block')
  const checkDiv = document.createElement('div')
  checkDiv.classList.add('check')
  const checkInput = document.createElement('input')
  checkInput.classList.add('check')
  checkInput.id = 'check'
  checkInput.type = 'checkbox'
  const checkLabel = document.createElement('label')
  checkLabel.setAttribute('for', 'check')

  checkInput.addEventListener('input', () => {
    checkInput.checked ? true : false
  })
  checkDiv.append(checkInput, checkLabel)
  checkBlock.append(checkDiv)
  container.append(checkBlock)
  return checkInput
}

//функция создания элемента
function elem(el, className, text) {
  const element = document.createElement(el)
  element.classList.add(className)
  element.innerHTML = text
  container.append(element)
}

// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

function createNumbersArray(count) {
  arr = []
  for (let i = 1; i <= count / 2; i++) {
    arr.push(i, i)
  }
  return arr
}

// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// Этап 3. Создайте функцию flip отвечающую за логику игры

function flip(card) {
  if (this.card.classList.contains('open')) {
    return
  }

  if (firstCard !== null && secondCard !== null) {
    if (firstCard.cardNumber !== secondCard.cardNumber) {

      firstCard.open = false;
      secondCard.open = false;
      firstCard = null;
      secondCard = null;
    }
  }

  if (firstCard === null) {
    firstCard = card
  } else {
    secondCard = card
  }

  if (firstCard !== null && secondCard !== null) {
    if (firstCard.cardNumber === secondCard.cardNumber) {
      firstCard.success = true;
      secondCard.success = true;
      firstCard = null;
      secondCard = null;
    }
  }

  if (arr.length === document.querySelectorAll('.success').length) {
    setTimeout(() => {
      let restart = confirm('Вы выйграли сыграем ещё раз?')
      if(restart) {
        location.reload()
      } else {
        alert('спасибо за игру!')
        location.reload()
      }
    }, 100)
  }
}

// Этап 4. Функция начало игры

function startGame(count) {
  const button = document.createElement('button')
  button.classList.add('btn')
  count === 4 ? button.textContent = `Игра на ${count} карты` : button.textContent = `Игра на ${count} карт`
  container.append(button)

  button.addEventListener('click', () => {
    countdown ()
    let cardArr = createNumbersArray(count)
    let cardShuffleArr = shuffle(cardArr)

    for (let cardNum of cardShuffleArr) {
      if (document.getElementById('check').checked) {
        new AmazingCard(playingField, cardNum, flip)
        let removePadding = document.querySelectorAll('.card')
        for (let el of removePadding) {
          el.style.padding = 0
        }
      } else {
        new Card(playingField, cardNum, flip)
      }
    }

    document.querySelector('.difficult-title').remove()
    document.querySelector('.checkbox-title').remove()
    document.querySelector('.check-block').remove()
    document.querySelector('.manual-text').remove()
    document.querySelector('.checkbox-text').remove()
    let btnAll = document.querySelectorAll('.btn')
    for (let btn of btnAll) {
      btn.remove()
    }

  })
}

elem('h2', 'difficult-title', 'Выберите сложность')
startGame(4)
startGame(8)
startGame(16)
elem('h2', 'checkbox-title', 'Выберите цифры или изображения')
checkbox()
elem('p', 'checkbox-text', 'Если меня включить, то на открытых картах вместо цифр будут изображения')
elem('p', 'manual-text', 'ПРАВИЛА ИГРЫ <br> Компьютер разложит карты «рубашкой» вверх. За один ход игрок должен открыть любые две карточки. Если образовалась пара, они остаются открытыми. Если числа или картинки на перевёрнутых карточках отличаются, карты закрываются. Игра продолжается до тех пор пока все карты не будут открыты.')
