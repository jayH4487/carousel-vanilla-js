const $carouselBtnNext = document.querySelector(".carousel-btn-next")
const $carouselBtnPrev = document.querySelector(".carousel-btn-prev")
const $slides = document.querySelectorAll(".carousel-item")
const $indicators = document.querySelectorAll(".carousel-indicator")

const totalSlides = $slides.length

const initialClasses = () => {
    $slides[totalSlides - 1].classList.add("carousel-item-prev")
    $slides[0].classList.add("carousel-item-active")
    $slides[1].classList.add("carousel-item-next")

    $indicators[0].classList.add("carousel-indicator-active")
}
initialClasses()

const getSlidePosition = ([slide, ...restSlides], index=0) => {
    return restSlides === undefined
        ? -1
        : slide.classList.contains("carousel-item-active")
            ? index
            : getSlidePosition(restSlides, index + 1)
}

const mod = (a, b) => ((a % b) + b) % b

const removeClassNamesFromAllItems = (classNames, items) => {
    items.forEach(item => item.classList.remove(...classNames))
}

const moveSlide = (e) => {
    const currentPosition = getSlidePosition($slides)
    
    removeClassNamesFromAllItems(
        ["carousel-item-prev", "carousel-item-active", "carousel-item-next"],
        $slides
        )
    removeClassNamesFromAllItems(["carousel-indicator-active"], $indicators)
    
    const offset = e.target.name === "next" ? 1 : -1

    const previousSlide = mod(currentPosition + offset - 1, totalSlides)
    const activeSlide = mod(currentPosition + offset, totalSlides)
    const nextSlide = mod(currentPosition + offset + 1, totalSlides)
    
    $slides[previousSlide].classList.add("carousel-item-prev")
    $slides[activeSlide].classList.add("carousel-item-active")
    $slides[nextSlide].classList.add("carousel-item-next")

    $indicators[activeSlide].classList.add("carousel-indicator-active")
}

$carouselBtnNext.addEventListener("click", moveSlide)
$carouselBtnPrev.addEventListener("click", moveSlide)