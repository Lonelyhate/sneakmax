
function slideStart(num = 0) {
    const rightBtn = document.querySelector('.product-slider__right')
    const leftBtn = document.querySelector('.product-slider__left')
    const sliderWrapper = document.querySelector('.product-slider__wrapper')
    const slides = document.querySelectorAll('.product__slide')
    const prewSlides = document.querySelectorAll('.modal-preview__item')
    prewSlides[0].classList.add('modal-preview__item--active')
    let slideIndex = num
    let steps = slides[0].clientWidth
    sliderWrapper.style.width = steps * slides.length + 'px'
    rightBtn.addEventListener('click', () => {
        if(slideIndex >= slides.length - 1) {
            slideIndex = -1
        }
        slideIndex++
        prewSlides.forEach(slide => {slide.classList.remove('modal-preview__item--active')})
        prewSlides[slideIndex].classList.add('modal-preview__item--active')
        sliderWrapper.style.transform = `translateX(${steps * -slideIndex}px)`
    })
    leftBtn.addEventListener('click', () => {
        if(slideIndex < 1) {
            slideIndex = slides.length
        }
        slideIndex--
        prewSlides.forEach(slide => {slide.classList.remove('modal-preview__item--active')})
        prewSlides[slideIndex].classList.add('modal-preview__item--active')
        sliderWrapper.style.transform = `translateX(${steps * -slideIndex}px)`
    })
    prewSlides.forEach((item, i) => {
        item.setAttribute('data-slide', i)
        item.addEventListener('click', () => {
            prewSlides.forEach(slide => {slide.classList.remove('modal-preview__item--active')})
            slideIndex = item.getAttribute('data-slide')
            item.classList.add('modal-preview__item--active')
            sliderWrapper.style.transform = `translateX(${steps * -slideIndex}px)`
        })
    })
}
