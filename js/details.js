const cardDetailContainer = document.getElementById('card-detail-container')
const selectedId          = new URLSearchParams(location.search).get("id")

fetch('https://mindhub-xj03.onrender.com/api/amazing')
.then((response) => response.json())
.then(data => {
    data.events.map(event => {
        if (event._id == selectedId) {
            renderCard(event)
        }
    })
})
.catch(err => console.log(err))
.finally(() => {
    document.body.classList.add('bg-grey-gradient')
    var tl = gsap.timeline({defaults: {duration: 1 }})
    tl.from("#card-detail-container", {y: 50, opacity: 0})
})

const renderCard = (event) => {
    cardDetailContainer.innerHTML = 
    `
    <div class="card-detail row rounded m-1 d-flex align-items-center">
        <div class="col-lg-6 card-details-img-container d-flex align-items-center">
            <img src="${event.image}" alt="${event.name}" class="w-100 rounded">
        </div>
        <div class="col-lg-6 p-4">
            <h1 class="fw-bold text-center" id="card-detail-title">${event.name}</h1>
            <div class="d-flex my-1 justify-content-between flex-wrap align-items-center w-100 gap-2">
                <small class="rounded-pill cinema">${event.category}</small>
                <div class="d-flex align-items-center">
                    <i class="fa-regular fa-calendar-days"></i> 
                    <small>${event.date}</small>
                </div>
            </div>
            <p class="mt-2">${event.description}</p>
                <div class="row">
                    <p class="col-sm-6 text-center">Place: <span>${event.place}</span></p>
                    <p class="col-sm-6 text-center">Capacity: ${event.capacity}</p>
                    <p class="col-sm-6 text-center">${event.assistante ? 'Assistance' : 'Estimate'}: ${event.assistance || event.estimate}</p>
                    <p class="col-sm-6 text-center">Price: $${event.price}</p>
                </div>
        </div>
    </div>
    `
}