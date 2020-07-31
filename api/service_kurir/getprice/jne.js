const kurirJne = require('../../models/Kurir_jne');

const pricing = async() => {
    
}
const jne = async(params) => {
    return {
        status:true,
        respose:{
            courier:params.courier,
            image:params.image,
        }
    }
}

module.exports = {jne}