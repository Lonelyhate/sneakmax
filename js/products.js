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
                slideStart()

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
            // document.body.style.overflow = 'hidden'
            
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
        }
    })
}

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
                                        <button class="product__btn" aria-label="Добавить товар в корзину">
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

