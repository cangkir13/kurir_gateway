
const PriceUser = (type, fee, berat, price) => {
    switch (type) {
        case 1:
            return (parseInt(fee) * parseInt(berat)) + parseInt(price)
        case 2:
            return parseInt(fee) + parseInt(price)
        default:
            return false
    }
}

module.exports = PriceUser