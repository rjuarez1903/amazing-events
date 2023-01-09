const tl = gsap.timeline({defaults: {duration: 1 }})

const animateForm = () => {
    tl.from('form', {x: 50, opacity: 0})
}

animateForm()