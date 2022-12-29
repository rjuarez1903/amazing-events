const checkboxes      = document.querySelectorAll('input[type="checkbox"]')
const noResults       = document.querySelector('.no-results')
const results         = document.querySelector('.results')
const btnShowCards    = document.querySelector('.btn-show-cards')
const btnClear        = document.querySelector('.btn-clear')
let displayedCards    = []
let categoriesChecked = Array.from(checkboxes).filter(checkbox => checkbox.checked == true)
console.log(categoriesChecked)

checkboxes.forEach(checkbox => checkbox.addEventListener('change', getCategoriesChecked))
btnShowCards.addEventListener('click', showAllCards)
btnClear.addEventListener('click', showAllCards)

const renderCards = () => {
    const cardsContainer  = document.getElementById('cards-container')
    fetch('../events.json')
    .then((response) => response.json())
    .then((data) => {
        data.events.map(event => {
            // Format event.category to use it as a CSS class
            let category = (event.category).replace(/\s+/g, '-').toLowerCase()

            // HTML template creation
            let div            = document.createElement('div')
            let card           = document.createElement('div')
            let img            = document.createElement('img')
            let cardBody       = document.createElement('div')
            let titleCategory  = document.createElement('div')
            let cardTitle      = document.createElement('h5')
            let categoryPill   = document.createElement('small')
            let cardText       = document.createElement('p')
            let cardFooter     = document.createElement('div')
            let price          = document.createElement('price')
            let a              = document.createElement('a')

            div.className            = 'col-xl-3 col-lg-4 col-sm-6'
            card.className           = 'card rounded'
            card.style.width         = '100%' 
            img.src                  = `${event.image}` 
            img.className            = 'card-img-top'
            img.alt                  = `${event.name}`
            cardBody.className       = 'card-body d-flex flex-column justify-content-between'
            titleCategory.className  = 'title-category'
            cardTitle.className      = `card-title fw-bold text-center`
            cardTitle.textContent    = `${event.name}`
            categoryPill.className   = `rounded-pill my-1 ${category}`
            categoryPill.textContent = `${event.category}`
            cardText.textContent     = `${event.description}`
            cardFooter.className     = 'd-flex justify-content-between align-items-center flex-wrap gap-1'
            price.textContent        =  `Price: $${event.price} `
            a.href                   = `./details.html?id=${event._id}`
            a.className              = 'btn btn-custom w-100'
            a.textContent            = 'Show details'

            // Set custom attribute to card
            card.setAttribute('data-name', event.name)
            card.setAttribute('data-category', event.category)

            // Add element to the DOM
            div.append(card)
            card.append(img, cardBody)
            cardBody.append(titleCategory, cardText, cardFooter)
            titleCategory.append(cardTitle, categoryPill)
            cardFooter.append(price, a)
            cardsContainer.append(div)

            displayedCards.push(card)
        })
    })
}

// Bootstrap validation handler
(() => {
    const searchBar = document.querySelector('input[type="search"]')
    const forms     = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
                results.textContent = `Showing results for: ${searchBar.value}`
            } 
            form.classList.add('was-validated')
            if (form.checkValidity()) {
                event.preventDefault()
                searchEvent()
                form.classList.remove("was-validated");
                form.reset();
            }
        }, false) 
    })
  })()

function searchEvent() {
    const searchBar     = document.querySelector('input[type="search"]')
    results.textContent = `Showing results for: ${searchBar.value}`
    results.classList.remove('d-none')
    results.classList.add('d-block')
    btnClear.classList.remove('d-none')
    btnClear.classList.add('d-block')
    let arrayCategoriesChecked = Array.from(categoriesChecked).map(categoryChecked => categoryChecked.value)

    let cardsArray = Array.from(document.getElementsByClassName('card'))
    if (displayedCards.length == 0) {
        let cardsToDisplay = cardsArray.filter(card => card.getAttribute('data-name').toLowerCase().includes(searchBar.value.toLowerCase())) 
        console.log('Call 1')
        displayCards(cardsToDisplay)
    } else if (categoriesChecked.length > 0) {
        let cardsToDisplay = cardsArray.filter(card => card.getAttribute('data-name').toLowerCase().includes(searchBar.value.toLowerCase()) && arrayCategoriesChecked.includes(card.getAttribute('data-category'))) 
        console.log('Call 2')
        displayCards(cardsToDisplay)
    } else {
        let cardsToDisplay = cardsArray.filter(card => card.getAttribute('data-name').toLowerCase().includes(searchBar.value.toLowerCase())) 
        console.log('Call 3')
        displayCards(cardsToDisplay)
    }
}

function displayCards(cards) {
    let cardsArray = Array.from(document.getElementsByClassName('card'))
    if (cards.length > 0) {
        if (noResults.classList.contains('d-block')) {
            noResults.classList.remove('d-block')
            noResults.classList.add('d-none')
            checkboxes.forEach(checkbox => checkbox.disabled = false)
            checkboxes.forEach(checkbox => checkbox.checked = true)
        }
        cardsArray.map(card => {
            card.parentElement.style.display = "none"
            if (cards.includes(card)) {
                card.parentElement.style.display = "flex"
                card.style.display               = "flex"
            } 
        })
        displayedCards = [].concat(cards)
        console.log(displayedCards)
    } else {
        cardsArray.map(card => card.parentElement.style.display = "none")
        noResults.classList.remove('d-none')
        noResults.classList.add('d-block')
        checkboxes.forEach(checkbox => checkbox.disabled = true)
        displayedCards = []
    }
}

function showAllCards() {
    results.textContent = 'Showing results for: '
    results.classList.add('d-none')
    results.classList.remove('d-block')
    btnClear.classList.add('d-none')
    btnClear.classList.remove('d-block')
    const cardsArray     = Array.from(document.getElementsByClassName('card'))
    let cardsToDisplay   = [].concat(cardsArray)
    displayCards(cardsToDisplay)
}

function getCategories() {
    let categories = []
    fetch('../events.json')
    .then((response) => response.json())
    .then((data) => {
        data.events.map(event => {
            if (!categories.includes(event.category)) {
                categories.push(event.category)
            }
        })
    })
    return categories
}

function getCategoriesChecked(e) {
    const cardsArray = Array.from(document.getElementsByClassName('card'))
    const categories = getCategories()
    let arrayCategoriesChecked = Array.from(categoriesChecked).map(categoryChecked => categoryChecked.value)
    if (!arrayCategoriesChecked.includes(e.target.value) && (e.target.checked)) {
        arrayCategoriesChecked.push(e.target.value)
        categoriesChecked.push(e.target)
        console.log('Se agrega')
    } else if (arrayCategoriesChecked.includes(e.target.value) && (!e.target.checked)) {
        console.log('Vuela')
        arrayCategoriesChecked.splice(arrayCategoriesChecked.indexOf(e.target.value), 1)
        categoriesChecked.splice(categoriesChecked.indexOf(e.target), 1)

    }
    console.log(arrayCategoriesChecked)
    console.log(categoriesChecked)
    filterByCategory(arrayCategoriesChecked)
}   

function filterByCategory(categories) {
    const cardsArray     = Array.from(document.getElementsByClassName('card'))
    let cardsToDisplay   = [].concat(cardsArray)
    search = getSearchValue()
    console.log(search)
    if (search != '') {
        if (categories.length == 0 || categories.length == cardsToDisplay.length) {
            console.log('Last')
            displayCards([])
        } else {
            cardsToDisplay = cardsArray.filter(card => categories.includes(card.getAttribute('data-category')) && card.getAttribute('data-name').toLowerCase().includes(search.toString().toLowerCase()))
            displayCards(cardsToDisplay)
        }
    } else {
        if (categories.length == 0 || categories.length == cardsToDisplay.length) {
            displayCards([])
        } else {
            cardsToDisplay = cardsArray.filter(card => categories.includes(card.getAttribute('data-category')))
            displayCards(cardsToDisplay)
        }
    }
}

function getSearchValue() {
    let search = ''
    if (results.textContent != 'Showing results for: ') {
        search = results.textContent.split(' ').slice(3)
    }
    return search
}

renderCards()