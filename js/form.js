const tl = gsap.timeline({defaults: {duration: 1 }})

const animateHeader = () => {
    tl.from('.navbar-brand', {x: -50, opacity: 0})
    tl.from('.navbar-nav', {x: 50, opacity: 0}, "-=1")
}

const animateForm = () => {
    tl.from('form', {x: 50, opacity: 0}, "-=1")
}

animateHeader()
animateForm()