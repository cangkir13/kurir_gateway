/**
 * @author lepek13
 * madul price of courier jne
 * set origin dan destination code
 * set value of response data
 * return respone after setting value of response
 */


const soap = require('soap')
const priceuser = require('./PriceUser')

/* api courier */
const Api_pricing = async(args) => {
    let {origin, destination, berat} = args
    let url = 'http://api.rpxholding.com/wsdl/rpxwsdl.php?wsdl';
    let requestArgs = {
        user:"rpxklink",
        password:"rpx123klink",
        origin_postal_code:origin,
        destination_postal_code: destination,
        service_type:"",
        weight:parseFloat(berat),
        disc:0,
        format:"JSON",
        account_number:"758025921"
    }
    // console.log(requestArgs);
    
    let rpxClient = await  soap.createClientAsync(url);
    let result = await rpxClient.getRatesPostalCodeAsync(requestArgs);
    let data = JSON.parse(result[0].return.$value).RPX.DATA;
    let msg = JSON.parse(result[0].return.$value).RPX.TITLE;
    
    return {data,msg};
}

/* packing data to client */
const packgingData = (args) => {
    let {sendApi, couriers, harga, berat, packge} = args
    let {courier, image} = couriers

    let api = sendApi.data

    if(api == undefined || api == "No Data Found" )
    {
        return {status:false, courier, msg:api}
    }else{
        let dataprice = []
        for (let index = 0; index < api.length; index++) {
            let price = parseInt(api[index].TOT_CHARGE)
            let priceV = priceuser(packge.type, packge.price_packge, berat, price)
            let service_name = api[index].SERVICE
            
            // let etd = api[index].ETF + '-' + api[index].ETD
            if(price == 0 )
            {
                continue;
            }

            dataprice.push({
                price:priceV,
                service_name,
                total:parseInt(priceV) + parseInt(harga),
                etd:null,
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

/* module */
const rpx = async(params) => {
    let {UserData, courier, body} = params
    try {
        let berat = body.weight
        let harga = body.harga
        let {sender, receiver, packge} = UserData

        let sendApi = await Api_pricing({origin:sender.kodepos, destination:receiver.kodepos, berat})
        
        let Packagedata = packgingData({sendApi, couriers:courier, harga, berat, packge})

        return Packagedata
    } catch (error) {
        return {status:false, courier:courier.courier , msg:'Trouble in server -'+ error.message}
    }
}

module.exports = rpx