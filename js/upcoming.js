const cardsContainer    = document.getElementById("cards-container")
const inputSearch       = document.querySelector('input[type="search"]')
const checkboxContainer = document.getElementById('checkbox-container')
const data              = fetch('../events.json')
                        .then(response => response.json())
                        .then(json => json.events.map(event => event))
const currentDate       = fetch('../events.json')
                        .then(response => response.json())
                        .then(json => json["fechaActual"])                              
const checkboxesChecked = []

async function getDate() {
    const date = await currentDate
    return new Date(date)
} 

async function filterByDate() {
    const currentDate = await getDate()
    const eventsToDisplay = []
    const events          = await data
    events.map(event => {
        const eventDate = new Date(event.date)
        if (eventDate > currentDate) {
            eventsToDisplay.push(event)
        }
    })
    renderCards(eventsToDisplay)
    return eventsToDisplay
}

async function renderCards(cards) {
    cardsContainer.innerHTML = ''
    const eventsToDisplay    = []
    const events             = await data

    if (cards.length == 0) {
        eventsToDisplay.push(...events)
    } else {
        eventsToDisplay.push(...cards)
    }

    eventsToDisplay.forEach(event => {
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
    cardsContainer.append(card)
    })
}

async function getCategories() {
    const events = await data
    return Array.from(new Set(events.map(event => event.category)))
}

async function renderCategories() {
    let checkboxContainerHtml = ''
    const categories = await getCategories()
    categories.forEach(category => {
        let categoryDashed = (category).replace(/\s+/g, '-').toLowerCase()
        checkboxContainerHtml += 
    `   <div class="form-check">
            <input class="form-check-input" type="checkbox" value="${category}" id="${categoryDashed}">
            <label class="form-check-label" for="${categoryDashed}">
            ${category}
            </label>
        </div> 
    ` })
    checkboxContainer.innerHTML = checkboxContainerHtml
    return document.querySelectorAll('input[type="checkbox"]')
}

async function addCheckboxesListener() {
    const checkboxes = await renderCategories()
    checkboxes.forEach(checkbox => checkbox.addEventListener('change', crossFilter))
}

async function filterCategory(e, filterSearch) {
    if (e.target != inputSearch && e.target.checked) {
        checkboxesChecked.push(e.target.value)
    } else if (e.target != inputSearch && !e.target.checked) {
        checkboxesChecked.splice(checkboxesChecked.indexOf(e.target.value), 1)
    }
    if (filterSearch.length > 0 && checkboxesChecked.length > 0) {
        return filterSearch.filter(event => checkboxesChecked.includes(event.category))
    } else if (filterSearch.length > 0 && checkboxesChecked.length == 0) {
        return searchEvent()
    }
    return []
}

async function searchEvent() {
    const events = await filterByDate()
    return events.filter(event => event.name.toLowerCase().includes(inputSearch.value.toLowerCase()))
}

async function crossFilter(e) {
    const filterSearch = await searchEvent()
    const cards        = await filterCategory(e, filterSearch)
    if (cards.length > 0) {
        renderCards(cards)
    }
    else {
        cardsContainer.innerHTML = `<h3 class="text-center">No matches. Search again please.</h3>`
    }
}

filterByDate()
renderCategories()
addCheckboxesListener()

inputSearch.addEventListener('input', crossFilter)