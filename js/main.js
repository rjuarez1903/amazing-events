const cardsContainer = document.getElementById("cards-container")

const renderCards = () => {
    fetch('../events.json')
    .then((response) => response.json())
    .then((json) => {
        json.events.map(event => {
            let category = (event.category).replace(/\s+/g, '-').toLowerCase()
            let card = document.createElement('div')
            card.classList.add("col-xl-3", "col-lg-4", "col-sm-6")
            cardsContainer.append(card)
            card.innerHTML = `
            <div class="card rounded" style="width: 100%;">
                <img src="${event.image}}" class="card-img-top" alt="...">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div class="title-category">
                        <h5 class="card-title fw-bold text-center">${event.name}</h5>
                        <small class="rounded-pill my-1 ${category}">${event.category}</small>
                    </div>
                    <p class="card-text">${event.description}}</p>
                    <div class="d-flex justify-content-between align-items-center flex-wrap gap-1">
                        <p>Price: $${event.price} </p>
                        <a href="./details.html" class="btn btn-custom w-100">Show details</a>
                    </div>
                </div>
            </div>
            `
            console.log("Card created")
        })
    })
}

renderCards()