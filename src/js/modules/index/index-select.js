const offersSelect = document.querySelector('.offers-category')
const allOffersLine = document.querySelectorAll('.offers-line')
const offersSpec = document.querySelector('.offers-spec')
const countSpec = offersSpec.children.length
const offersRest = document.querySelector('.offers-rest')
const countRest = offersRest.children.length

const toggleLine = () => {
    for (const line of allOffersLine) {
        line.classList.toggle('flex')
    }
}

let slideWidth = document.querySelector('.offers-spec .offers-item').offsetWidth
let currentRestSlide = 0
let currentSelect = 'spec'
offersSelect.addEventListener('click', (event) => {
    if (event.target.closest(".offers-radio")) {
        if (event.target.closest('.spec') && currentSelect !== 'spec') {
            currentSelect = 'spec'
            toggleLine()
        } else if (event.target.closest('.rest') && currentSelect !== 'rest') {
            currentSelect = 'rest'
            toggleLine()
        }
    } else if (event.target.closest(".offers-button")) {
        if (currentSelect === 'rest') {
            if (event.target.closest('.offers-button_prev')) {
                currentRestSlide--
                if (currentRestSlide < 0) {
                    currentRestSlide = countRest - 3
                }
                offersRest.style.left = -((slideWidth + (slideWidth / 9))*currentRestSlide) + 'px'               
            } else if (event.target.closest('.offers-button_next')) {
                currentRestSlide++
                if (currentRestSlide > countRest - 3) {
                    currentRestSlide = 0
                }
                offersRest.style.left = -((slideWidth + (slideWidth / 9))*currentRestSlide) + 'px'  
            }
        }
    }
})
window.addEventListener('resize',() => {
    if (currentSelect === 'rest') {
        slideWidth = document.querySelector('.offers-rest .offers-item').offsetWidth
        offersRest.style.left = -((slideWidth + (slideWidth / 9))*currentRestSlide) + 'px'
    }
});