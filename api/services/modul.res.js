/**
 * @param {200, 400 etc} status_code is http status code for server
 * @param {object or array object or ect} response return data value as response
 */

const modulRes = (status_code, response) => {
    const status_true = () => {
        return {status:true, status_code, response}
    }

    const status_false = () => {
        return {status:false, status_code, response}
    }

    const modul = () => {
        if (status_code >= 200 && status_code < 300) {
            return status_true();
        } else {
            return status_false();
        }
    }

    return {
        modul
    }

}

module.exports = modulRes