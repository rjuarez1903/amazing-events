async function getData() {
    const events = []
    await fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then((response) => response.json())
    .then(data => {
        data.events.map(event => events.push(event))
    })    
    console.log(events)
    const categories = getCategories(events)
    getStats(events, categories)
}

function getCategories(events) {
    const categories = []
    events.map(event => {
        if (!categories.includes(event.category)) {
            categories.push(event.category)
        }
    })
    return categories
}

function getStats(events, categories) {
    let stats = []
    events.map(event => {
        stats.push({
            eventName: event.name,
            category: event.category,
            percentageOfAssistance: (((event.assistance || event.estimate) * 100) / event.capacity).toFixed(2), 
            revenue: ((event.assistance || event.estimate) * event.price)
        })
    })
    console.log(stats)
    getCategoryStats(stats, categories)
}

function getCategoryStats(stats, categories) {
    let categoryStats = []
    stats.map(stat => {
        categoryStats.push({
            category: stat.category, 
            revenue: stat.revenue,
            percentageOfAssistance: stat.percentageOfAssistance
        })
    })
    console.log(categoryStats)
}

getData()