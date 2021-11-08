const catalogList = document.querySelector('.catalog-list')
const catalogMore = document.querySelector('.catalog__more')
let prodQuantity = 6
let dataLength = null
const modal = document.querySelector('.modal')
const modalOverlay = document.querySelector('.modal__overlay')
const modalContent = document.querySelector('.modal__content')
const prodModal = document.querySelector('.product-modal')
const prodModalSlider = prodModal.querySelector('.product-slider__wrapper')
const prodModalInfo = prodModal.querySelector('.modal-info__wrapper')
const prodModalDescr = prodModal.querySelector('.modal-prod-descr')
const prodModalChars = prodModal.querySelector('.prod-chars')
const modalCart = document.querySelector('.modal__buy')
const modalCartOverlay = document.querySelector('.modal__overlay-buy')

const normalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const loadModalData = (id = 1) => {
    fetch('../resources/data/data.json')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        prodModalSlider.innerHTML = ''
        prodModalInfo.innerHTML = ''
        prodModalDescr.textContent = ''
        prodModalChars.innerHTML = ''

        for (let dataItem of data) {
            if (dataItem.id == id) {
                const slides = dataItem.gallery.map(image => {
                    return `
                        <div class='product__slide'>
                            <img src="${image}" alt="">
                        </div>
                    `
                })
                const preview = dataItem.gallery.map((image, idx) => {
                    return `
                        <div class="modal-preview__item data-slide="${idx}">
                            <img src="${image}" alt="">
                        </div>
                    `
                })
                const sizes = dataItem.sizes.map(size => {
                    return `
                    <li class="modal-sizes__item"><button class="modal-sizes__btn">${size}</button></li>
                    `
                })

                prodModalSlider.innerHTML = slides.join('')
                prodModalSlider.nextElementSibling.innerHTML = preview.join('')
                prodModalInfo.innerHTML = `
                <h3 class="modal-info__title">${dataItem.title}</h3>
                <div class="modal-info__rate">
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.04894 0.92705C7.3483 0.00573924 8.6517 0.00573965 8.95106 0.92705L10.0206 4.21885C10.1545 4.63087 10.5385 4.90983 10.9717 4.90983H14.4329C15.4016 4.90983 15.8044 6.14945 15.0207 6.71885L12.2205 8.75329C11.87 9.00793 11.7234 9.4593 11.8572 9.87132L12.9268 13.1631C13.2261 14.0844 12.1717 14.8506 11.388 14.2812L8.58779 12.2467C8.2373 11.9921 7.7627 11.9921 7.41221 12.2467L4.61204 14.2812C3.82833 14.8506 2.77385 14.0844 3.0732 13.1631L4.14277 9.87132C4.27665 9.4593 4.12999 9.00793 3.7795 8.75329L0.979333 6.71885C0.195619 6.14945 0.598395 4.90983 1.56712 4.90983H5.02832C5.46154 4.90983 5.8455 4.63087 5.97937 4.21885L7.04894 0.92705Z" fill="#F14F4F"/>
                    </svg>
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.04894 0.92705C7.3483 0.00573924 8.6517 0.00573965 8.95106 0.92705L10.0206 4.21885C10.1545 4.63087 10.5385 4.90983 10.9717 4.90983H14.4329C15.4016 4.90983 15.8044 6.14945 15.0207 6.71885L12.2205 8.75329C11.87 9.00793 11.7234 9.4593 11.8572 9.87132L12.9268 13.1631C13.2261 14.0844 12.1717 14.8506 11.388 14.2812L8.58779 12.2467C8.2373 11.9921 7.7627 11.9921 7.41221 12.2467L4.61204 14.2812C3.82833 14.8506 2.77385 14.0844 3.0732 13.1631L4.14277 9.87132C4.27665 9.4593 4.12999 9.00793 3.7795 8.75329L0.979333 6.71885C0.195619 6.14945 0.598395 4.90983 1.56712 4.90983H5.02832C5.46154 4.90983 5.8455 4.63087 5.97937 4.21885L7.04894 0.92705Z" fill="#F14F4F"/>
                    </svg>
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.04894 0.92705C7.3483 0.00573924 8.6517 0.00573965 8.95106 0.92705L10.0206 4.21885C10.1545 4.63087 10.5385 4.90983 10.9717 4.90983H14.4329C15.4016 4.90983 15.8044 6.14945 15.0207 6.71885L12.2205 8.75329C11.87 9.00793 11.7234 9.4593 11.8572 9.87132L12.9268 13.1631C13.2261 14.0844 12.1717 14.8506 11.388 14.2812L8.58779 12.2467C8.2373 11.9921 7.7627 11.9921 7.41221 12.2467L4.61204 14.2812C3.82833 14.8506 2.77385 14.0844 3.0732 13.1631L4.14277 9.87132C4.27665 9.4593 4.12999 9.00793 3.7795 8.75329L0.979333 6.71885C0.195619 6.14945 0.598395 4.90983 1.56712 4.90983H5.02832C5.46154 4.90983 5.8455 4.63087 5.97937 4.21885L7.04894 0.92705Z" fill="#F14F4F"/>
                    </svg>
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.04894 0.92705C7.3483 0.00573924 8.6517 0.00573965 8.95106 0.92705L10.0206 4.21885C10.1545 4.63087 10.5385 4.90983 10.9717 4.90983H14.4329C15.4016 4.90983 15.8044 6.14945 15.0207 6.71885L12.2205 8.75329C11.87 9.00793 11.7234 9.4593 11.8572 9.87132L12.9268 13.1631C13.2261 14.0844 12.1717 14.8506 11.388 14.2812L8.58779 12.2467C8.2373 11.9921 7.7627 11.9921 7.41221 12.2467L4.61204 14.2812C3.82833 14.8506 2.77385 14.0844 3.0732 13.1631L4.14277 9.87132C4.27665 9.4593 4.12999 9.00793 3.7795 8.75329L0.979333 6.71885C0.195619 6.14945 0.598395 4.90983 1.56712 4.90983H5.02832C5.46154 4.90983 5.8455 4.63087 5.97937 4.21885L7.04894 0.92705Z" fill="#F14F4F"/>
                    </svg>
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.04894 0.92705C7.3483 0.00573924 8.6517 0.00573965 8.95106 0.92705L10.0206 4.21885C10.1545 4.63087 10.5385 4.90983 10.9717 4.90983H14.4329C15.4016 4.90983 15.8044 6.14945 15.0207 6.71885L12.2205 8.75329C11.87 9.00793 11.7234 9.4593 11.8572 9.87132L12.9268 13.1631C13.2261 14.0844 12.1717 14.8506 11.388 14.2812L8.58779 12.2467C8.2373 11.9921 7.7627 11.9921 7.41221 12.2467L4.61204 14.2812C3.82833 14.8506 2.77385 14.0844 3.0732 13.1631L4.14277 9.87132C4.27665 9.4593 4.12999 9.00793 3.7795 8.75329L0.979333 6.71885C0.195619 6.14945 0.598395 4.90983 1.56712 4.90983H5.02832C5.46154 4.90983 5.8455 4.63087 5.97937 4.21885L7.04894 0.92705Z" fill="#F14F4F"/>
                    </svg>
                </div>
                <div class="modal-info__sizes">
                    <span class="modal-info__subtitle">Выберите размер</span>
                    <ul class="modal-info__sizes-list modal-sizes">
                        ${sizes.join('')}
                    </ul>
                </div>
                <div class="modal-info__price">
                    <span class="modal-info__current-price">${dataItem.price} ₽</span>
                    <span class="modal-info__old-price">${dataItem.oldPrice ? dataItem.oldPrice + ' ₽' : ''}</span>
                </div>
                `

                prodModalDescr.textContent = dataItem.description
                slideStart()
                let charsItems = ''
                Object.keys(dataItem.chars).forEach(function eachKey(key) {
                    charsItems += `<p class="prod-bottom__descr prod-chars__item">${key}: ${dataItem.chars[key]}</p>`
                })
                prodModalChars.innerHTML = charsItems
            }   
        }
    })
}


const setModalProduct = () => {
    document.querySelectorAll('.product__btn-view').forEach(el => {
        el.addEventListener('click', () => {
            modal.classList.add('modal--visable')
            modalOverlay.classList.add('modal__overlay--visable')
            modalContent.classList.add('modal__content--visable')
            document.body.style.overflow = 'hidden'
            
            const openBtnId = el.dataset.id
            loadModalData(openBtnId)
        })
    })

    modalOverlay.addEventListener('click', e => {
        if (e.target == modalOverlay) {
            modalOverlay.classList.remove('modal__overlay--visable')
            modalContent.classList.remove('modal__content--visable')
            // modal.classList.remove('modal--visable')
            document.body.style.overflow = ''
            setTimeout(() => {
                document.querySelector('.product-slider__wrapper').style.transform = 'translateX(0px)'
            }, 300)
        }
    })
}

const cartModalProduct = () => {
    modalCart.classList.add('modal__buy--visable')
    modalCartOverlay.classList.add('modal__overlay-buy--visable')
    document.querySelector('.modal__content-buy').classList.add('modal__content-buy--visable')

    modalCartOverlay.addEventListener('click', e => {
        if (e.target == modalCartOverlay) {
            modalCart.classList.remove('modal__buy--visable')
            modalCartOverlay.classList.remove('modal__overlay-buy--visable')
            document.querySelector('.modal__content-buy').classList.remove('modal__content-buy--visable')
        }
    })
}
document.querySelector('.mini-cart__btn').addEventListener('click', cartModalProduct)

if (catalogList) {
    const loadProducts = (quantity = 6) => {
        fetch('../resources/data/data.json')
        .then((data) => {
            return data.json()
        })
        .then((data) => {

            dataLength = data.length

            catalogList.innerHTML = ''

            for (let i = 0; i < dataLength; i++) {
                if (i < quantity) {
                    let item = data[i]
                    catalogList.innerHTML += `
                        <li class="catalog-list__item">
                            <acticle class="product">
                                <div class="product__image">
                                    <img src="${item.mainImage}" alt="${item.title}">
                                    <div class="product__btns">
                                        <button data-id="${item.id}" class="product__btn product__btn-view" aria-label="Показать информацию о товаре">
                                            <svg width="23" height="18" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9518 10.0664C16.9518 12.2489 15.1818 14.0176 12.9993 14.0176C10.8168 14.0176 9.0481 12.2489 9.0481 10.0664C9.0481 7.88264 10.8168 6.11389 12.9993 6.11389C15.1818 6.11389 16.9518 7.88264 16.9518 10.0664Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9975 19.1936C17.7575 19.1936 22.1113 15.7711 24.5625 10.0661C22.1113 4.3611 17.7575 0.938599 12.9975 0.938599H13.0025C8.2425 0.938599 3.88875 4.3611 1.4375 10.0661C3.88875 15.7711 8.2425 19.1936 13.0025 19.1936H12.9975Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </button>
                                        <button data-id="${item.id}" class="product__btn product__btn-cart" aria-label="Добавить товар в корзину">
                                            <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 6.57893H16.6038L13.0359 0.319309C12.8589 0.0083658 12.475 -0.093156 12.1784 0.0938088C11.8823 0.280773 11.7865 0.684867 11.9641 0.996475L15.1461 6.57893H4.85388L8.03587 0.996431C8.21348 0.684823 8.11767 0.280729 7.82164 0.0937645C7.52439 -0.0932003 7.14173 0.00832153 6.96411 0.319265L3.39617 6.57888H0V7.89468H1.35651L2.94432 16.8103C3.11033 17.7438 3.88547 18.421 4.78761 18.421H15.2124C16.1145 18.421 16.8896 17.7438 17.055 16.811L18.6434 7.89468H20C20 7.89468 20 6.57893 20 6.57893ZM15.8264 16.5688C15.7715 16.8797 15.5133 17.1053 15.2124 17.1053H4.78761C4.4867 17.1053 4.22854 16.8798 4.173 16.5681L2.62789 7.89468H17.3721L15.8264 16.5688Z" fill="white"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <h3 class="product__title">${item.title}</h3>
                                <span class="product__price">${normalPrice(item.price)} р</span>
                            </acticle>
                        </li>
                    `
                }
            }
        })
        .then(() => {
            cartLogic()
            setModalProduct()
        })
    }
    loadProducts(prodQuantity)


    catalogMore.addEventListener('click', (e) => {
        prodQuantity += 3
        loadProducts(prodQuantity)

        if (prodQuantity >= dataLength) {
            catalogMore.style.display = 'none'
        } else {
            catalogMore.style.display = 'block'
        }
    })

    
}

let price = 0
const cartCount = document.querySelector('.cart__count')
const miniCartList = document.querySelector('.mini-cart__list')
const fullPrice = document.querySelector('.mini-cart__summ')

const priceWithoutSpaces = (str) => {
    return str.replace(/\s/g, '');
};


const plusFullPrice = (currentPrice) => {
    return price += currentPrice
}

const minusFullPrice = (currentPrice) => {
    return price -= currentPrice
}

const printFullPrice = () => {
    fullPrice.textContent = `${normalPrice(price)} ₽`
}

const pritnQuantity = (num) => {
    cartCount.textContent = num
}

const lodadCartData = (id = 1) => {
    fetch('../resources/data/data.json')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        for (let dataItem of data) {
            if(dataItem.id == id) {
                miniCartList.insertAdjacentHTML('afterbegin', `
                    <li class="mini-cart__item" data-id="${dataItem.id}">
                        <article class="mini-cart__product mini-product">
                            <div class="mini-product__image">
                                <img src="${dataItem.mainImage}" alt="">
                            </div>
                            <div class="mini-product__content">
                                <div class="mini-product__text">
                                    <h3 class="mini-product__title">${dataItem.title}</h3>
                                    <span class="mini-product__price">${normalPrice(dataItem.price)} ₽</span>
                                </div>
                                <button class="mini-product__delete">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.5715 2.85715H13.5715V2.14285C13.5715 0.959387 12.6121 0 11.4287 0H8.57152C7.38805 0 6.42867 0.959387 6.42867 2.14285V2.85715H1.42865C1.03415 2.85715 0.714355 3.17695 0.714355 3.57145C0.714355 3.96595 1.03419 4.28571 1.42865 4.28571H2.20506L3.57151 19.3507C3.6052 19.7196 3.91537 20.0015 4.28581 20H15.7144C16.0848 20.0015 16.395 19.7196 16.4287 19.3507L17.7951 4.28571H18.5715C18.966 4.28571 19.2858 3.96591 19.2858 3.57141C19.2858 3.17691 18.966 2.85715 18.5715 2.85715ZM7.85722 2.14285C7.85722 1.74835 8.17702 1.42856 8.57152 1.42856H11.4287C11.8232 1.42856 12.143 1.74835 12.143 2.14285V2.85715H7.85726V2.14285H7.85722ZM15.0622 18.5714H4.93796L3.64295 4.28571H7.14296H16.3608L15.0622 18.5714Z" fill="#4D4D4D" fill-opacity="0.3"/>
                                        <path d="M7.8573 16.381C7.85722 16.38 7.85717 16.379 7.85709 16.378L7.14279 6.37805C7.11479 5.98355 6.77227 5.68647 6.3778 5.71447C5.9833 5.74247 5.68623 6.085 5.71423 6.47946L6.42853 16.4794C6.45519 16.854 6.76733 17.144 7.14283 17.143H7.19427C7.58781 17.1157 7.88467 16.7745 7.8573 16.381Z" fill="#4D4D4D" fill-opacity="0.3"/>
                                        <path d="M9.99994 5.71436C9.60544 5.71436 9.28564 6.03415 9.28564 6.42865V16.4286C9.28564 16.8231 9.60544 17.1429 9.99994 17.1429C10.3944 17.1429 10.7142 16.8231 10.7142 16.4286V6.42865C10.7142 6.03415 10.3944 5.71436 9.99994 5.71436Z" fill="#4D4D4D" fill-opacity="0.3"/>
                                        <path d="M13.6219 5.71423C13.2274 5.68623 12.8849 5.9833 12.8569 6.3778L12.1426 16.3778C12.1137 16.7712 12.4091 17.1136 12.8026 17.1425C12.8038 17.1426 12.8049 17.1427 12.8062 17.1428H12.8569C13.2324 17.1437 13.5445 16.8537 13.5712 16.4792L14.2855 6.47921C14.3135 6.08475 14.0164 5.74227 13.6219 5.71423Z" fill="#4D4D4D" fill-opacity="0.3"/>
                                    </svg>
                                </button>
                            </div>
                        </article>                    
                    </li>
                `);

                return dataItem
            }
        }
    })
    .then((item) => {
        plusFullPrice(item.price)
        printFullPrice()

        let countCart = document.querySelectorAll('.mini-cart__item').length
        if (countCart > 0) {
            cartCount.classList.add('cart__count--visable')
            pritnQuantity(countCart)
        }
    })
    .then(() => {
    })
}

const cartLogic = () => {
    const productBtn = document.querySelectorAll('.product__btn-cart')

    productBtn.forEach(el => {
        el.addEventListener('click', e => {
            const id = e.currentTarget.getAttribute('data-id')
            lodadCartData(id)

            e.currentTarget.classList.add('product__btn--disabled')
        })
    })

    miniCartList.addEventListener('click', e => {
        if(e.target.classList.contains('mini-product__delete')) {
            const self = e.target
            const parent = self.closest('.mini-cart__item')
            const price = parseInt(priceWithoutSpaces(parent.querySelector('.mini-product__price').textContent))
            const id = parent.getAttribute('data-id')

            document.querySelector(`.product__btn-cart[data-id="${id}"]`).classList.remove('product__btn--disabled')

            parent.remove()

            minusFullPrice(price)
            printFullPrice()

            let countCart = document.querySelectorAll('.mini-cart__item').length
            if (countCart == 0) {
                cartCount.classList.remove('cart__count--visable')
                pritnQuantity(countCart)
                document.querySelector('.mini-cart').classList.remove('mini-cart--visable')
            }
        }
    })
}

