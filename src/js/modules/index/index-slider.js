const sliderLine = document.querySelector('.slider-line')
const slide = document.querySelector('.slider-slide')
const sliderButtons = document.querySelector('.slider-button')
const countSliderSlide = sliderLine.children.length

let sliderSlideWidth = slide.offsetWidth
let currenSliderSlide = 0

sliderButtons.addEventListener('click', (event) => {
    if (event.target.closest('.slider-button_prev')) {
        currenSliderSlide--
        if (currenSliderSlide < 0) {
            currenSliderSlide = countSliderSlide - 1
        }
        sliderLine.style.left = -sliderSlideWidth * currenSliderSlide + 'px'              
    } else if (event.target.closest('.slider-button_next')) {
        currenSliderSlide++
        if (currenSliderSlide > countSliderSlide - 1) {
            currenSliderSlide = 0
        }
        sliderLine.style.left = -sliderSlideWidth * currenSliderSlide + 'px' 
    }
})
window.addEventListener('resize',() => {
    sliderSlideWidth = slide.offsetWidth
    sliderLine.style.left = -sliderSlideWidth * currenSliderSlide + 'px'
});