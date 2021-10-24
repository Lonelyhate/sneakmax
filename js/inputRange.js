const inputLeft = document.querySelector('#input-left')
const inputRight = document.querySelector('#input-right')
const thumbLeft = document.querySelector('.slider > .thumb.left')
const thumbRight = document.querySelector('.slider > .thumb.right')
const range = document.querySelector('.slider > .range')

function setLeftValue() {
    const _this = inputLeft
    const min = parseInt(_this.min)
    const max = parseInt(_this.max)

    _this.value = Math.min()
}

inputLeft.addEventListener('input', setLeftValue)