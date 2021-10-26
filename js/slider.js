const rightBtn = document.querySelector('.product-slider__right')
const leftBtn = document.querySelector('.product-slider__left')
const sliderWrapper = document.querySelector('.product-slider__wrapper')
const slides = document.querySelectorAll('.product__slide')
const prewSlides = document.querySelectorAll('.modal-preview__item')
let steps = slides[0].clientWidth
let slideIndex = 0
sliderWrapper.style.width = steps * slides.length + 'px'
rightBtn.addEventListener('click', () => {
    if(slideIndex >= slides.length - 1) {
        slideIndex = -1
    }
    slideIndex++
    sliderWrapper.style.transform = `translateX(${steps * -slideIndex}px)`
})
leftBtn.addEventListener('click', () => {
    if(slideIndex < 1) {
        slideIndex = slides.length
    }
    slideIndex--
    sliderWrapper.style.transform = `translateX(${steps * -slideIndex}px)`
})
prewSlides.forEach((item, i) => {
    item.setAttribute('data-slide', i)
    item.addEventListener('click', () => {
        slideIndex = item.getAttribute('data-slide')
        sliderWrapper.style.transform = `translateX(${steps * -slideIndex}px)`
    })
})
