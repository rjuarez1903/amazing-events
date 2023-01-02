const cardsContainer   = document.getElementById("cards-container")
const inputSearch      = document.querySelector('input[type=search')
const checkboxCotainer = document.querySelector('checkboxContainer')

const renderCards = () => {
    let cards = []
    fetch('../events.json')
    .then((response) => response.json())
    .then((json) => {
        json.events.map(event => {
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
            categoryPill.className   = `rounded-pill my-1 ${category}`
            categoryPill.textContent = `${event.category}`
            cardText.textContent     = `${event.description}`
            cardFooter.className     = 'd-flex justify-content-between align-items-center flex-wrap gap-1'
            price.textContent        =  `Price: $${event.price} `
            a.href                   = './details.html'
            a.className              = 'btn btn-custom w-100'
            a.textContent            = 'Show details'

            card.append(div)
            div.append(img, cardBody)
            cardBody.append(titleCategory, cardText, cardFooter)
            titleCategory.append(cardTitle, categoryPill)
            cardFooter.append(price, a)
            cardsContainer.append(card)

            // Push card to the cards array
            cards.push(card)
        })
    })
}

renderCards()

// checkbox template

{/* <div class="form-check">
    <input class="form-check-input" type="checkbox" value="" id="food-fair">
    <label class="form-check-label" for="food-fair">
    Food fair
    </label>
</div> */}