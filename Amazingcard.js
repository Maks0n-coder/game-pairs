import { Card } from "./Card.js"

export class AmazingCard extends Card {
  constructor(container, cardNumber, flip, image) {
    super(container, cardNumber, flip)
  }

  set cardNumber(value) {
    this._cardNumber = value
    const cardsImgArray = [
      '/img/1.jpg',
      '/img/2.jpg',
      '/img/3.jpg',
      '/img/4.jpg',
      '/img/5.jpg',
      '/img/6.jpg',
      '/img/7.jpg',
      '/img/8.jpg',
    ]

    const img = document.createElement('img')
    img.onerror = function() {
      const error = new Error('Ошибка: картинка не загрузилась')
      console.log(error)
      img.src = '/img/default.jpg'
    };
    img.src = cardsImgArray[value - 1]
    img.classList.add('card__img')
    console.log(img.src);
    this.card.appendChild(img);
  }

  get cardNumber() {
    return this._cardNumber;
  }
}
