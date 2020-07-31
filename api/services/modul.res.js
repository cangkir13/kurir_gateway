const modulRes = (status_code, response) => {
    const status_true = async() => {
        return {status:true, status_code, data:{response:response}}
    }

    const status_false = async() => {
        return {status:false, status_code, data:{msg:response}}
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