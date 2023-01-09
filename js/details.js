const cardDetailContainer = document.getElementById('card-detail-container')
const selectedId          = new URLSearchParams(location.search).get("id")
const tl                  = gsap.timeline({defaults: {duration: 1 }})

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
    loading.classList.add('d-none')
    cardDetailContainer.classList.remove('d-none')
    document.body.classList.add('bg-grey-gradient')
    tl.from("#card-detail-container", {y: 50, opacity: 0}, "-= 1")
})

const animateHeader = () => {
    tl.from('.navbar-brand', {x: -50, opacity: 0})
    tl.from('.navbar-nav', {x: 50, opacity: 0}, "-=1")
}

const renderCard = (event) => {
    let categoryDashed = event.category.replace(/\s+/g, '-').toLowerCase()
    cardDetailContainer.innerHTML = 
    `
    <div class="card-detail row rounded m-1">
        <img src="${event.image}" alt="${event.name}" class="col-lg-4 col-md-12" id="card-img-detail">
        <div class="col-lg-6 col-md-9 p-4 d-flex flex-column justify-content-center">
            <h1 class="fw-bold text-center mb-4" id="card-detail-title">${event.name}</h1>
            <div class="d-flex my-1 justify-content-between flex-wrap align-items-center w-100 gap-4 mb-4">
                <small class="rounded-pill ${categoryDashed}">${event.category}</small>
                <div class="d-flex flex-wrap gap-4">
                    <div class="d-flex align-items-center gap-1">
                        <i class="fa-solid fa-location-dot card-icon"></i>
                        <small class="p-0">${event.place}</small>
                    </div>
                    <div class="d-flex align-items-center gap-1">
                        <i class="fa-regular fa-calendar-days card-icon"></i> 
                        <small class="p-0">${event.date}</small>
                    </div>
                </div>
            </div>
            <p class="mt-2">${event.description}</p>
            <p class="mt-2 fw-bold my-0 fs-2 price-detail text-center">$${event.price}</p>
        </div>
        <div class="card-detail-footer col-lg-2 col-md-3 p-4 ${categoryDashed}">
            <div class="row h-100 align-items-center">
                <p class="col-lg-12 text-center"><span class="fw-bold fs-5">${event.capacity}</span><br>Capacity</p>
                <p class="col text-center"><span class="fw-bold fs-5"">${event.assistance || event.estimate}</span><br>${event.assistance ? 'Assistance' : 'Estimate'}</p>
            </div>            
        </div>
    </div>
    `
}

animateHeader()
