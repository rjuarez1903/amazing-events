const upcomingCardsContainer = document.getElementById("upcoming-cards-container")
const searchBar              = document.querySelector('input[type="search"]')
const submitSearch           = document.querySelector('button[type="submit"]')
const categories             = getCategories()

submitSearch.addEventListener('click', searchEvent)

const renderUpcomingCards = () => {
    fetch('../events.json')
    .then((response) => response.json())
    .then((data) => {
        let currentDate = new Date(data.fechaActual)
        data.events.map(event => {
            let eventDate = new Date(event.date)
            if (eventDate > currentDate) {
                // Format event.category to use it as a CSS class
                let category = (event.category).replace(/\s+/g, '-').toLowerCase()
                
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
                a.href                   = './details.html'
                a.className              = 'btn btn-custom w-100'
                a.textContent            = 'Show details'

                // Set custom attribute to card
                card.setAttribute('data-name', event.name)

                // Add element to the DOM
                div.append(card)
                card.append(img, cardBody)
                cardBody.append(titleCategory, cardText, cardFooter)
                titleCategory.append(cardTitle, categoryPill)
                cardFooter.append(price, a)
                upcomingCardsContainer.append(div)
            }
        })
    })
}

function searchEvent(e) {
    e.preventDefault()
    let cards = document.getElementsByClassName('card')
    for (let card of cards) {
        if ((card.getAttribute('data-name').toLowerCase()).includes(searchBar.value.toLowerCase())) {
            card.parentElement.style.display = "flex"
            card.style.display = "flex"
        } else {
            card.parentElement.style.display = "none"
        }
    }
    searchBar.value = ''
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

renderUpcomingCards()