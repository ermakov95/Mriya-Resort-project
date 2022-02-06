const body = document.querySelector('body');
const nav = document.querySelector('.nav');

const navServicesMain = document.querySelector('.nav-services-main');
const navServicesRooms = document.querySelector('.nav-services-rooms');
const navServicesMedicine = document.querySelector('.nav-services-medicine');

const navSliderLine = document.querySelector('.nav-slider-line');
const navSlide = document.querySelector('.nav-slide');
const navSliderButtons = document.querySelector('.nav-slider-buttons');

const abortShowns = () => {
    for (const el of navServicesMain.children) {
        el.classList.remove('nav-services-shown');
    }
};

let menuIsOpen = false;
let isDesktop = false;
let currentSlide = 0;
const sliderASync = async (count = 0) => {
    const slide = currentSlide
    for (const el of navSliderButtons.children) {
        el.style.background='#fff'
    }
    navSliderButtons.children[currentSlide].style.background='#D9C287'
    await setTimeout(async () => {
        if (slide === currentSlide) {
            await setTimeout(async () => {
                if (slide === currentSlide) {
                    await setTimeout(async () => {
                        if (slide === currentSlide && menuIsOpen && isDesktop) {
                                currentSlide++
                                if (currentSlide >= 3) {currentSlide = 0}
                                const width = navSlide.offsetWidth
                                navSliderLine.style.left = -width * currentSlide + 'px';
                                sliderASync()
                        }
                    }, 1000)
                }
            }, 1000)
        }
    }, 1000)
};

if (nav.offsetWidth >= 768) {
    isDesktop = true
}

let scroll
nav.addEventListener('mousedown', (event) => {
    if (event.target.closest(".nav-toggle_close") || event.target.closest(".nav-toggle_open")) {
        abortShowns()
        menuIsOpen = !menuIsOpen
        if (!isDesktop && menuIsOpen) {
            scroll = window.pageYOffset
            window.scrollTo(0, 0)
        } 
        body.classList.toggle('nav-opened');
        if (!isDesktop && !menuIsOpen) {
            window.scrollTo(0, scroll)
        }
        if (isDesktop && menuIsOpen) {
            sliderASync()
        }
    } else  if (event.target.closest(".nav-services-main")) {
        if (event.path[1].classList.contains('nav-services-item')) {
            if (!event.path[1].classList.contains('nav-services-shown')) {
                abortShowns()
                event.path[1].classList.add('nav-services-shown');
            } else {
                abortShowns()
            }
        }
    } else  if (event.target.closest(".nav-slider-buttons button")) {
        for (const el of event.path[1].children) {
            el.style.background='#fff'
        }
        event.path[0].style.background='#D9C287'
        const width = navSlide.offsetWidth
        if (event.target.closest(".nav-slider-buttons__button_first")) {
            navSliderLine.style.left = '0px';
            currentSlide = 0
            sliderASync()
        } else if (event.target.closest(".nav-slider-buttons__button_second")) {
            navSliderLine.style.left = -width + 'px';
            currentSlide = 1
            sliderASync()
        } else if (event.target.closest(".nav-slider-buttons__button-third")) {
            navSliderLine.style.left = -width * 2 + 'px';
            currentSlide = 2
            sliderASync()
        }
    }
})

navServicesMain.addEventListener('mouseover', (event) => {
    if (event.path[1].classList.contains('nav-services-item') && isDesktop) {
        abortShowns()
        event.path[1].classList.add('nav-services-shown');
    }
})
window.addEventListener('resize',() => {
    if (!isDesktop && nav.offsetWidth >= 768) {
        isDesktop = true
        if (menuIsOpen) {
            sliderASync()
        }
    } else if (nav.offsetWidth < 768) {
        isDesktop = false
    }
    navSliderLine.style.left = -navSlide.offsetWidth * currentSlide + 'px';
});
