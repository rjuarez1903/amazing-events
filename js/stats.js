let events 

fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(json => {
        events = json.events
        const categories = Array.from(new Set(events.map(event => event.category)))
        getStats(events, categories)
    })    
    .catch(err => console.log(err))

const getStats = (events, categories) => {
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

const getCategoryStats = (stats, categories) => {
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