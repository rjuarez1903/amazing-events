const cardsContainer = document.getElementById("cards-container")

// const renderCards = () => {
//     fetch('../events.json')
//     .then((response) => response.json())
//     .then((json) => {
//         json.events.map(event => {
//             let category = (event.category).replace(/\s+/g, '-').toLowerCase()
//             let card = document.createElement('div')
//             card.classList.add("col-xl-3", "col-lg-4", "col-sm-6")
//             cardsContainer.append(card)
//             card.innerHTML = `
//             <div class="card rounded" style="width: 100%;">
//                 <img src="${event.image}}" class="card-img-top" alt="...">
//                 <div class="card-body d-flex flex-column justify-content-between">
//                     <div class="title-category">
//                         <h5 class="card-title fw-bold text-center">${event.name}</h5>
//                         <small class="rounded-pill my-1 ${category}">${event.category}</small>
//                     </div>
//                     <p class="card-text">${event.description}}</p>
//                     <div class="d-flex justify-content-between align-items-center flex-wrap gap-1">
//                         <p>Price: $${event.price} </p>
//                         <a href="./details.html" class="btn btn-custom w-100">Show details</a>
//                     </div>
//                 </div>
//             </div>
//             `
//             console.log("Card created")
//         })
//     })
// }

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
            price.textContent        =  `$${event.price} `
            a.href                   = './details.html'
            a.className              = 'btn btn-custom w-100'
            a.textContent            = 'Show details'

            card.append(div)
            div.append(img, cardBody)
            cardBody.append(titleCategory, cardText, cardFooter)
            titleCategory.append(cardTitle, categoryPill)
            cardFooter.append(price, a)

            cardsContainer.append(card)

            console.log("Card created")

            cards.push(card)
            
        })
    })
}

renderCards()