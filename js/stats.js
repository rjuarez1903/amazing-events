const tableData = document.getElementById('table-data')
const table     = document.querySelector('.table')
const tl        = gsap.timeline({defaults: {duration: 1 }})

fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(json => {
        events                      = json.events
        const currentDate           = new Date(json['currentDate'])
        const generalStats          = getGeneralStats(events)
        const upcomingEventsStats   = generalStats.filter(event => new Date(event.date) > currentDate)
        const pastEventsStats       = generalStats.filter(event => new Date(event.date) < currentDate)
        const finalStats            = {
            upcomingEvents: getCategoryStats(upcomingEventsStats),
            pastEvents: getCategoryStats(pastEventsStats),
            maxCapacity: getMax(generalStats, 'capacity'),
            maxAssistance: getMax(pastEventsStats, 'percentageOfAssistance'),
            minAssistance: getMin(pastEventsStats, 'percentageOfAssistance') 
        }
        console.log(finalStats)
        renderStats(finalStats)
    })    
    .catch(err => console.log(err))
    .finally(() => {
        loading.classList.add('d-none')
        table.classList.remove('d-none')
        tl.from(".table", {y: 50, opacity: 0}, "-=1")

    })

const animateHeader = () => {
    tl.from('.navbar-brand', {x: -50, opacity: 0})
    tl.from('.navbar-nav', {x: 50, opacity: 0}, "-=1")
}

const getGeneralStats = (events) => {
    let stats = []
    events.forEach(event => {
        stats.push({
            eventName: event.name,
            category: event.category,
            capacity: event.capacity,
            date: event.date,
            percentageOfAssistance: (((event.assistance || event.estimate) * 100) / event.capacity), 
            revenue: ((event.assistance || event.estimate) * event.price)
        })
    })
    return stats
}

const getCategoryStats = (stats) => {
    categoryStats = stats.reduce((acc, stat) => {
        let aux = Object.assign({}, acc)
        if (aux[stat.category]) {
            aux[stat.category].revenue += stat.revenue
            aux[stat.category].assistance += stat.percentageOfAssistance
        } else {
            aux[stat.category] = {
                revenue: stat.revenue, 
                assistance: stat.percentageOfAssistance}
        }
        return aux
    }, {})

    return(categoryStats)
}

const getMax = (events, criteria) => {
    const max = events.reduce((acc, event) => {
        return acc[criteria] > event[criteria] ? acc : event
    })
    return {eventName: max.eventName, max: max[criteria]}
}

const getMin = (events, criteria) => {
    const max = events.reduce((acc, event) => {
        return acc[criteria] < event[criteria] ? acc : event
    })
    return {eventName: max.eventName, min: max[criteria]}
}

const renderStats = (stats) => {
    console.log(stats)
    let tableDataHtml = ''
    tableDataHtml += 
    `<tr>
        <th>Event with the highest percentage of attendance</th>
        <th>Event with the lowest percentage of attendance</th>
        <th>Event with larger capacity</th>
    </tr>
    <tr>
        <td>${stats.maxAssistance.eventName} ${stats.maxAssistance.max.toFixed(2)}%</td>
        <td>${stats.minAssistance.eventName} ${stats.minAssistance.min.toFixed(2)}%</td>
        <td>${stats.maxCapacity.eventName} ${stats.maxCapacity.max}</td>
    </tr>
    `
    tableDataHtml += 
    `
    <tr>
        <th class="fs-3" colspan="3">Upcoming Events statistics by category</th>
    </tr>
    <tr>
        <th>Categories</th>
        <th>Revenues</th>
        <th>Percentage of attendance</th>
    </tr>
    `
    console.log(tableDataHtml)
    for (category in stats.upcomingEvents) {
        tableDataHtml += 
        `
        <tr>
            <td>${category}</td>
            <td>${stats.upcomingEvents[category].revenue}</td>
            <td>${stats.upcomingEvents[category].assistance.toFixed(2)}%</td>
        </tr>
        `
    }
    tableDataHtml += 
    `
    <tr>
        <th class="fs-3" colspan="3">Past Events statistics by category</th>
    </tr>
    <tr>
        <th>Categories</th>
        <th>Revenues</th>
        <th>Percentage of attendance</th>
    </tr>
    `
    console.log(tableDataHtml)
    for (category in stats.upcomingEvents) {
        tableDataHtml += 
        `
        <tr>
            <td>${category}</td>
            <td>${stats.pastEvents[category].revenue}</td>
            <td>${stats.pastEvents[category].assistance.toFixed(2)}%</td>
        </tr>
        `
    }
    tableData.innerHTML += tableDataHtml
}

animateHeader()
