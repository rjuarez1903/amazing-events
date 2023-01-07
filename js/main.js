const loading           = document.getElementById('loading')
const main              = document.querySelector('main')
const sectionContainer  = document.getElementById('section-container')
const cardsContainer    = document.getElementById("cards-container")
const inputSearch       = document.querySelector('input[type="search"]')
const checkboxContainer = document.getElementById('checkbox-container')
let events 

fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(json => {
        events = json.events
        renderCategories(events, checkboxContainer)
        renderCards(events, cardsContainer)
        inputSearch.addEventListener('input', filter)
        checkboxContainer.addEventListener('change', filter)
    })
    .catch(err => console.log(err))
    .finally(() => {
        loading.classList.add('d-none')
        sectionContainer.classList.remove('d-none')
        main.classList.add('bg-grey-gradient')
        var tl = gsap.timeline({defaults: {duration: 1 }})
        tl.from(".cards-container", {y: 50, opacity: 0})
        .from(".cards-container .col-xl-3", {y: 50, opacity: 0, stagger: .3}, "-=.7")
    })

const renderCategories = (events, checkboxContainer) => {
    const categories = Array.from(new Set(events.map(event => event.category)))
    let checkboxContainerHtml = ''
    categories.forEach(category => {
        let categoryDashed = category.replace(/\s+/g, '-').toLowerCase()
        checkboxContainerHtml += 
        `   
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="${category}" id="${categoryDashed}">
            <label class="form-check-label" for="${categoryDashed}">
            ${category}
            </label>
        </div> 
        `
    })
    checkboxContainer.innerHTML = checkboxContainerHtml
}

const createCard = (event) => {
    // Format event.category to use it as a CSS class
    let categoryDashed = (event.category).replace(/\s+/g, '-').toLowerCase()

    // HTML template creation
    let card           = document.createElement('div')
    let div            = document.createElement('div')
    let img            = document.createElement('img')
    let cardBody       = document.createElement('div')
    let titleCategory  = document.createElement('div')
    let cardTitle      = document.createElement('h5')
    let categoryPill   = document.createElement('small')
    let cardText       = document.createElement('p')
    let cardFooter     = document.createElement('div')
    let price          = document.createElement('price')
    let a              = document.createElement('a')

    card.className           = 'col-xl-3 col-lg-4 col-sm-6'
    div.className            = 'card rounded'
    div.style.width          = '100%' 
    img.src                  = `${event.image}` 
    img.className            = 'card-img-top'
    img.alt                  = `${event.name}`
    cardBody.className       = 'card-body d-flex flex-column justify-content-between'
    titleCategory.className  = 'title-category'
    cardTitle.className      = `card-title fw-bold text-center`
    cardTitle.textContent    = `${event.name}`
    categoryPill.className   = `rounded-pill my-1 ${categoryDashed}`
    categoryPill.textContent = `${event.category}`
    cardText.textContent     = `${event.description}`
    cardFooter.className     = 'd-flex justify-content-between align-items-center flex-wrap gap-1'
    price.textContent        =  `Price: $${event.price} `
    a.href                   = `./details.html?id=${event._id}`
    a.className              = 'btn btn-custom w-100'
    a.textContent            = 'Show details'

    card.append(div)
    div.append(img, cardBody)
    cardBody.append(titleCategory, cardText, cardFooter)
    titleCategory.append(cardTitle, categoryPill)
    cardFooter.append(price, a)

    return card

}

const renderCards = (events, container) => {
    container.innerHTML = ''
    if (events.length > 0) {
        let fragment = document.createDocumentFragment()
        events.forEach(event => fragment.appendChild(createCard(event)))
        container.appendChild(fragment)
    } else {
        container.innerHTML = '<h3 class="text-center">No matches. Search again please.</h3>'
    }
}

const filter = () => {
    let checked            = Array.from(document.querySelectorAll(['input[type="checkbox"]:checked'])).map(checked => checked.value)
    let filteredByCategory = events.filter(event => checked.includes(event.category) || checked.length === 0)
    let filteredBySearch   = filteredByCategory.filter(event => event.name.toLowerCase().includes(inputSearch.value.toLowerCase()))
    renderCards(filteredBySearch, cardsContainer)
}

export { renderCategories, createCard, renderCards, filter }