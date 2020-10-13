/**
 * @author lepek13
 * controller office to destination and get price
 * find office
 * get courier active
 * get user package
 */
const RES = require('../../services/modul.res');
const OriginDest = require('../../service_kurir/lib/setOriginDestination');
const {CourierPack} = require('../../service_kurir/lib/setCourier');
const ModulePrice = require('../../service_kurir/getprice');
const globalpush = require('../../service_kurir/getprice/GlobalResApi'); 

const GetPriceoffice = () => {
    const index = async(req, res) => {
        const {client_code, iduser, level} = req.users;
        const {office, destination} = req.body
        let argsOD = {
            office, destination, id:iduser
        }

        let office_receiver = await OriginDest(argsOD)
        if (office_receiver.status == false) 
            return res.status(404).json(
                RES(404, {error:office_receiver.msg}).modul()
            )

        // check courier activity
        let CourierUser = await CourierPack(iduser) 

        /* filter and push data to @param Push_value */
        let Push_value = []
        for (let [key, val] of Object.entries(ModulePrice)) {
            for (let i=0; i < CourierUser.length; i++) {    
                if (key == CourierUser[i].courier ) {
                    Push_value.push(await val({body:req.body, UserData:office_receiver, courier: CourierUser[i] }))
                }
            }
        }

        let dataPush = globalpush(req.body, office_receiver, Push_value)
        return res.status(dataPush.status_code).json(
            RES(200, dataPush.res).modul()
        )
    }

    return {
        index
    }
}

module.exports = GetPriceoffice