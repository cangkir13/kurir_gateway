const GlobalResApi = (body, datauser, response) => {
    let lengthRes = response.length
    let lengthFalse = response.filter(el => el.status === false)
    if (lengthRes === lengthFalse) {
        return {
            status_code:404,
            res:"no found price",
        }
    }
    return {
        status_code:200,
        res:{
            datauser,
            request:body,
            response_courier:response
        }
    }
} 

module.exports = GlobalResApi