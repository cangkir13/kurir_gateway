/**
 * @author lepek13
 * madul price of courier jne
 * set origin dan destination code
 * set value of response data
 * adding price with packge user
 * return respone after setting value of response
 */

const kurirJne = require('../../models/Kurir_jne');
const axios = require('axios');
const qs = require('querystring');
const priceuser = require('./PriceUser')

/* Find origin  */
const KodeSender = async(req) => {
    let data = await kurirJne.findOne({
            where:{
                kota:req.kota
            }
        })
    if (!data) {
        return false
    } else {
        return data.destination_code    
    }
}

/* Find destination  */
const KodeDestination = async(req) => {
    let data = await kurirJne.findOne({
            where:{
                kecamatan:req.kecamatan,
                kelurahan:req.kelurahan,
                kodepos:req.kodepos
            }
        })

    if (!data) {
        return false
    } else {
        return data.destination_code    
    }
}

/* send api to server courier  */
const Api_pricing = async(params) => {
    let param_post = {
        username:"KLINK",
        api_key:"76270305bef5d402220c96d59ac61977",
        from:params.origin,
        thru:params.destination,
        weight:parseFloat(params.berat)
    }

    let response_api = await axios({
        method:"POST",
        url:"http://apiv2.jne.co.id:10101/tracing/api/pricedev",
        headers:{
            "Content-Type":"multipart/form-data"
        },
        data:qs.stringify(param_post)
    }).then((result) => {
        
        return result.data
    }).catch((err) => {
        
        return err.response.data
        
    });

    return response_api
}

/* set data return to client  */
const packgingData = (args) => {
    let {sendApi, couriers, harga, berat, packge} = args
    let {courier, image} = couriers
    
    if(sendApi.status === false){
        return {status:false, courier, msg:sendApi.error}
    }else{
        let api = sendApi.price
        let dataprice = []
        for (let index = 0; index < api.length; index++) {
            let price = parseInt(api[index].price);
            let priceV = priceuser(packge.type, packge.price_packge, berat, price)
            let service_name = api[index].service_display;
            let etd = api[index].etd_from + '-' + api[index].etd_thru
            dataprice.push({
                price:priceV,
                service_name,
                etd,
                total:parseInt(priceV) + parseInt(harga)
            })
        }
        return {
            status:true,
            courier,
            image,
            packge:dataprice
        }
    }
}


const jne = async(params) => {
    let {UserData, courier, body} = params
    try {
        let berat = body.weight
        let harga = body.harga
        let {sender, receiver, packge} = UserData
        
        let originSender = {kota:sender.kota}
        let DestinatinReceiver = { kecamatan:receiver.kecamatan, kelurahan:receiver.kelurahan, kodepos:receiver.kodepos}
        
        let origin = await KodeSender(originSender);
        if(!origin){
            return {status:false, courier:courier.courier , msg:'Origin not found'}
        }
        let destination = await KodeDestination(DestinatinReceiver);

        if (!destination) {
            return {status:false, courier:courier.courier , msg:'Destination not found'}
        }

        let sendApi = await Api_pricing({origin, destination, berat})
        
        let Packagedata = packgingData({sendApi, couriers:courier, harga, berat, packge})
        
        return Packagedata
        
    } catch (error) {
        return {status:false, courier:courier.courier , msg:'Trouble in server -'+ error.message}
    }
    
}

module.exports = jne