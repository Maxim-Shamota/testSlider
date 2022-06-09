const images = document.querySelectorAll('.slider .slider-item img');
const sliderLine = document.querySelector('.slider .slider-wrapper');
let count = 0;
let width;

function init() {
    width = document.querySelector('.slider').offsetWidth;
    sliderLine.style.width = width * images.length + 'px';
    images.forEach(item => {
        item.style.width = width + 'px';
    });
    rollSlider();
}

init();
window.addEventListener('resize', init);

document.querySelector('.slider-next').addEventListener('click', function () {
    count++;
    if (count >= images.length) {
        count = 0;
    }
    rollSlider();
});

document.querySelector('.slider-prev').addEventListener('click', function () {
    count--;
    if (count < 0) {
        count = images.length - 1;
    }
    rollSlider();
});

function rollSlider() {
    sliderLine.style.transform = 'translate(-' + count * width + 'px)';
}

// touch

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

const logBlock = document.querySelector('.slider-wrapper');

let x1 = null;
let y1 = null;

function handleTouchStart(e) {
    x1 = e.touches[0].clientX;
    y1 = e.touches[0].clientY;
}

function handleTouchMove(e) {
    if (x1 === null || y1 === null) {
        return;
    }
    const x2 = e.touches[0].clientX;
    const y2 = e.touches[0].clientY;
    const xDiff = x1 - x2;
    const yDiff = y1 - y2;
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            count++;
            if (count >= images.length) {
                count = 0;
            }
            rollSlider();
        } else {
            count--;
            if (count < 0) {
                count = images.length - 1;
            }
            rollSlider();
        }
    }
    x1 = null;
    y1 = null;
}