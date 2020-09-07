const $carouselBtnNext = document.querySelector(".carousel-btn-next")
const $carouselBtnPrev = document.querySelector(".carousel-btn-prev")

const getSlidePosition = ([slide, ...restSlides], index=0) => {
    return restSlides === undefined
        ? -1
        : slide.classList.contains("carousel-item-visible")
            ? index
            : getSlidePosition(restSlides, index + 1)
}

const mod = (a, b) => ((a % b) + b) % b

const moveSlide = (e) => {
    const $slides = document.querySelectorAll(".carousel-item")
    const currentPosition = getSlidePosition($slides)
    
    $slides[currentPosition].classList.remove("carousel-item-visible")
    
    const offset = e.target.name === "next" ? 1 : -1
    const nextPosition = mod(currentPosition + offset, $slides.length)
    
    $slides[nextPosition].classList.add("carousel-item-visible")
}

$carouselBtnNext.addEventListener("click", moveSlide)
$carouselBtnPrev.addEventListener("click", moveSlide)