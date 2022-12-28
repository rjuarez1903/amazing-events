const cardsContainer  = document.getElementById('cards-container')
const form            = document.querySelector('form')
const searchBar       = document.querySelector('input[type="search"]')
const submitSearch    = document.querySelector('button[type="submit"]')
const checkboxes      = document.querySelectorAll('input[type="checkbox"]')
const noResults       = document.querySelector('.no-results')
let displayedCards    = []
let categoriesChecked = []

checkboxes.forEach(checkbox => checkbox.addEventListener('change', getCategoriesChecked))

const renderCards = () => {
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

            div.className           = 'col-xl-3 col-lg-4 col-sm-6'
            
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
        // Display cards
        console.log('Displayed cards: ')
        displayedCards.forEach(card => console.log(card))
    })
}

(() => {
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            } else {
                event.preventDefault()
                if (displayedCards.length == 0) {
                    displayedCards = [].concat()
                }
                if (displayedCards == 0) {
                    cardsArray = Array.from(document.getElementsByClassName('card'))
                    let cardsToDisplay = cardsArray.filter(card => card.getAttribute('data-name').toLowerCase().includes(searchBar.value.toLowerCase())) 
                    console.log('Cards to display: ')
                    cardsToDisplay.forEach(card => console.log(card))
                    displayCards(cardsToDisplay)
                } else if (categoriesChecked.length > 0) {
                    let cardsToDisplay = displayedCards.filter(card => card.getAttribute('data-name').toLowerCase().includes(searchBar.value.toLowerCase()) && categoriesChecked.includes(card.getAttribute('data-category'))) 
                    console.log('Cards to display: ')
                    cardsToDisplay.forEach(card => console.log(card))
                    displayCards(cardsToDisplay)
                } else {
                    let cardsToDisplay = displayedCards.filter(card => card.getAttribute('data-name').toLowerCase().includes(searchBar.value.toLowerCase())) 
                    console.log('Cards to display: ')
                    cardsToDisplay.forEach(card => console.log(card))
                    displayCards(cardsToDisplay)
                }
            }
            form.classList.add('was-validated')
        }, false) 
    })
  })()

function displayCards(cards) {
    let cardsArray = Array.from(document.getElementsByClassName('card'))
    if (cards.length > 0) {
        if (noResults.classList.contains('d-block')) {
            noResults.classList.remove('d-block')
            noResults.classList.add('d-none')
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
        displayedCards = []
        console.log(displayedCards)
    }
}

async function getCategories() {
    let categories = []
    await fetch('../events.json')
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
    if (!categoriesChecked.includes(e.target.value) && (e.target.checked)) {
        categoriesChecked.push(e.target.value)
    } else if (categoriesChecked.includes(e.target.value) && (!e.target.checked)) {
        categoriesChecked.splice(categoriesChecked.indexOf(e.target.value), 1)
    }
    console.log(categoriesChecked)
    filterByCategory(categoriesChecked, searchBar)
}   

function filterByCategory(categories, searchBar) {
    const cardsArray     = Array.from(document.getElementsByClassName('card'))
    let cardsToDisplay   = [].concat(cardsArray)
    if (searchBar.value != '') {
        if (categories.length == 0 || categories.length == cardsToDisplay.length) {
            displayedCards = []
            for (let card of cardsToDisplay) {
                card.parentElement.style.display = "flex"
                card.style.display               = "flex"
                displayedCards.push(card)
            }
            console.log(displayedCards) 
        } else {
            cardsToDisplay = displayedCards.filter(card => categories.includes(card.getAttribute('data-category')))
            console.log(cardsToDisplay)
            displayedCards.map(card => {
                if (cardsToDisplay.includes(card)) {
                    card.parentElement.style.display = "flex"
                    card.style.display               = "flex"
                } else {
                    card.parentElement.style.display = "none"
                }
            })
        }
    } else {
        if (categories.length == 0 || categories.length == cardsToDisplay.length) {
            displayedCards = []
            for (let card of cardsToDisplay) {
                card.parentElement.style.display = "flex"
                card.style.display               = "flex"
                displayedCards.push(card)
            }
            console.log(displayedCards) 
        } else {
            displayedCards = []
            cardsToDisplay = cardsArray.filter(card => categories.includes(card.getAttribute('data-category')))
            console.log(cardsToDisplay)
            cardsArray.map(card => {
                if (cardsToDisplay.includes(card)) {
                    card.parentElement.style.display = "flex"
                    card.style.display               = "flex"
                    displayedCards.push(card)
                } else {
                    card.parentElement.style.display = "none"
                }
            })
            console.log(displayedCards)
        }
    }
}

renderCards()