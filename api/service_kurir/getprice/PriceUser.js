
const PriceUser = (type, fee, berat, price) => {
    switch (type) {
        case 1:
            /* price per 1/kg */
            return (parseInt(fee) * parseInt(berat)) + parseInt(price)
        case 2:
            /* price per packge */
            return parseInt(fee) + parseInt(price)
        default:
            return false
    }
}

module.exports = PriceUser