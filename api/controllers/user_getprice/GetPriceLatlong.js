const RES = require('../../services/modul.res');
const {findNearsCord} = require('../../service_kurir/lib/SetDistance'); 
const {CourierPack} = require('../../service_kurir/lib/setCourier');
const GetPriceLatlong = () => {
    const index = async(req, res) => {
        const {client_code, iduser, level} = req.users;
        // get distance nears of destination
        let Found = await findNearsCord(iduser, req.body.kode);
        if (Found.status == false) 
            return res.status(404).json(
                await RES(404, {error:Found.msg}).modul()
            )
        // check courier activity
        let CourierUser = await CourierPack(iduser)    
        
        let dataPush = [{weight:req.body.weight}, Found, {response_courier:CourierUser}]
        return res.json(
            await RES(200, dataPush).modul()
        )
    }

    return {
        index
    }
     
}

module.exports = GetPriceLatlong;