/**
 * @author lepek13
 * controller office near from destination and get price
 * find office nears
 * get courier active
 * get user package
 * 
 */
const RES = require('../../services/modul.res');
const {findNearsCord} = require('../../service_kurir/lib/SetDistance'); 
const {CourierPack} = require('../../service_kurir/lib/setCourier');
const ModulePrice = require('../../service_kurir/getprice');
const User = require('../../models/User');
const globalpush = require('../../service_kurir/getprice/GlobalResApi'); 

const GetPriceLatlong = () => {
    const index = async(req, res) => {
        const {client_code, iduser, level} = req.users;
        // get distance nears of destination
        let UserData = await findNearsCord(iduser, req.body.kode);
        if (UserData.status == false) 
            return res.status(404).json(
                RES(404, {error:UserData.msg}).modul()
            )
        
        // check courier activity
        let CourierUser = await CourierPack(iduser)    
        
        /* filter and push data to @param Push_value */
        let Push_value = []
        for (let [key, val] of Object.entries(ModulePrice)) {
            for (let i=0; i < CourierUser.length; i++) {    
                if (key == CourierUser[i].courier ) {
                    Push_value.push(await val({body:req.body, UserData, courier: CourierUser[i] }))
                }
            }
        }
        
        // let dataPush = [{weight:req.body.weight}, UserData, {response_courier:Push_value}]
        
        let dataPush = globalpush(req.body, UserData, Push_value)
        return res.status(dataPush.status_code).json(
            RES(200, dataPush.res).modul()
        )
    }

    return {
        index
    }
     
}

module.exports = GetPriceLatlong;