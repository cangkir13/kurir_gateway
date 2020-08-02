const RES = require('../../services/modul.res');
const {findNearsCord} = require('../../service_kurir/lib/SetDistance'); 
const GetPriceLatlong = () => {
    const index = async(req, res) => {
        const {client_code, iduser, level} = req.users;
        let Found = await findNearsCord(iduser, req.body.kode);
        return res.json(
            await RES(200, Found).modul()
        )
    }

    return {
        index
    }
     
}

module.exports = GetPriceLatlong;