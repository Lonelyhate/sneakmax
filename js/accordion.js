const accordions = document.querySelectorAll('.accordion__item')

accordions.forEach(el => {
    el.addEventListener('click', (e) => {
        const self = e.currentTarget
        const control = self.querySelector('.accordion__control')
        const content = self.querySelector('.accrodion__content')
    
        self.classList.toggle('accordeion--open')
        if(self.classList.contains('accordeion--open')) {
            content.style.maxHeight = content.scrollHeight + 'px'
        } else {
            content.style.maxHeight = 0 + 'px'
        }
    })
})