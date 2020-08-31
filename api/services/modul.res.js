/**
 * 
 * @param {200, 400 etc} status_code is http status code for server
 * @param {object or array object or ect} response return data value as response
 */

const modulRes = (status_code, response) => {
    const status_true = async() => {
        return {status:true, status_code, response}
    }

    const status_false = async() => {
        return {status:false, status_code, response}
    }

    const modul = async() => {
        if (status_code >= 200 && status_code < 300) {
            return await status_true();
        } else {
            return await status_false();
        }
    }

    return {
        modul
    }

}

module.exports = modulRes