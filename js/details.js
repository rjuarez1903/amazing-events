const cardDetailContainer = document.getElementById('card-detail-container')

function showDetails() {
    let id = location.search.split("?id=").filter(Number)
    let selectedId = Number(id[0])
    fetch('../events.json')
    .then((response) => response.json())
    .then(data => {
        data.events.map(event => {
            console.log(event._id)
            if (event._id == selectedId) {
                cardDetailContainer.innerHTML = `
                                                <div class="card-detail row rounded m-1">
                                                    <div class="col-lg-6 card-details-img-container d-flex align-items-center">
                                                        <img src="${event.image}" alt="${event.name}" class="w-100">
                                                    </div>
                                                    <div class="col-lg-6 p-4">
                                                        <h1 class="fw-bold text-center" id="card-detail-title">${event.name}</h1>
                                                        <small class="rounded-pill my-1 cinema">${event.category}</small>
                                                        <small class="rounded-pill my-1 bg-success">Date: ${event.date}</small>
                                                        <p class="mt-2">${event.description}</p>
                                                        <p>Place: ${event.place}</p>
                                                        <p>Capacity: ${event.capacity}</p>
                                                        <p>Assistance/Estimate: ${event.assistance || event.estimate}</p>
                                                        <p>Price: $${event.price}</p>
                                                    </div>
                                                </div>
                `
            }
        })
    })
}

showDetails()