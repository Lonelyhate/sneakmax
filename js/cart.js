const cartBtn = document.querySelector('.cart__btn')
const miniCart = document.querySelector('.mini-cart')

cartBtn.addEventListener('click', (e) => {
    miniCart.classList.toggle('mini-cart--visable')
})

document.addEventListener('click', (e) => {
    if(!e.target.classList.contains('cart__btn') && e.target.closest('.mini-cart') && !e.target.classList.contains('mini-cart')){
        miniCart.classList.remove('mini-cart--visable')
    }
})


