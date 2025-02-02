export class Card {

  _open = false
  _success = false

  constructor(container, cardNumber, flip) {
    this.container = container
    this.card = this.createElement()
    this.cardNumber = cardNumber
    this.flip = flip
  }

  createElement() {
    const card = document.createElement('div')
    card.classList.add('card')
    card.textContent = this._cardNumber
    this.container.append(card)

    card.addEventListener('click', () => {
      this.flip(this);
      if (this.open === false && this.success === false) {
        this.open = true
      }
    })

    return card
  }

  set cardNumber(value) {
    this._cardNumber = value
    this.card.textContent = value
  }
  get cardNumber() {
    return this._cardNumber
  }

  set open(value) {
    this._open = value
    value ? this.card.classList.add('open') : this.card.classList.remove('open')

  }
  get open() {
    return this._open
  }

  set success(value) {
    this._success = value
    value ? this.card.classList.add('success') : this.card.classList.remove('success')

  }
  get success() {
    return this._success
  }

}
