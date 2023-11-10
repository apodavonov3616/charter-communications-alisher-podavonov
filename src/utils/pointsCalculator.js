function calculatePoints(price) {
    //round to nearest dollar
    let roundedPrice = Math.floor(price)

    //under $50 purhcase gets no points
    if (roundedPrice <= 50) return 0

    // <=$100 purchase gets a point per dollar spent between 50 and 100
    if (roundedPrice <= 100) return roundedPrice - 50

    // over $100 purchase gets 50 points for $50-100 range and 2 points for the rest
    return ((roundedPrice - 100) * 2) + 50
}

export default calculatePoints