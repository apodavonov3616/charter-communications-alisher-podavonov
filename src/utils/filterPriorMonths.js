function filterPriorMonths(jsonData, priorMonths = 3) {

    //setting the date cutoff based on number of prior months
    const priorDate = new Date();
    const currentMonth = priorDate.getMonth();
    priorDate.setMonth(currentMonth - priorMonths)

    // filter out for dates within the last 3 months
    return jsonData.filter((datum) => {
        return new Date(datum.date) > priorDate
    })

}

export default filterPriorMonths