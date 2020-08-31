/**
 * Controller for Get and find data origin and destination (customer of client)
 */
const RES = require('../../services/modul.res');
const Userorg = require('../../models/User_origin');
const Userdes = require('../../models/User_destination');
const Masterarea = require('../../models/Master_area');

async function listOrgByIdCorp(id) {
    return await Userorg.findAll({
        where:{
            co_code:id
        },
        include:Masterarea
    })
};

async function listDesByIdCorp(id) {
    return await Userdes.findAll({
        where:{
            co_code:id
        },
        include:Masterarea
    })
};
// class for get origin or destination (client)
const ODuserGet = () => {
    const GetListOffice = async(req, res) => {
        const {client_code, iduser, level} = req.users;
        if (iduser == '' || !Number.isInteger(iduser)) {
            return res.status(403).json(
                await RES(403, {error:"Access denide"}).modul()    
            );
        }
        
        let response = await listOrgByIdCorp(iduser)    
        if (!response || response.length < 1) 
            return res.status(404).json(
                await RES(404, {error:"Office are nothing, please insert office"}).modul()    
            );
        
        return res.json(
            await RES(200, response).modul()
        )

    };

    const GetListCustomer = async(req, res) => {
        const {client_code, iduser, level} = req.users;
        if (iduser == '' || !Number.isInteger(iduser)) {
            return res.status(403).json(
                await RES(403, {error:"Access denide"}).modul()    
            );
        }
        let response = await listDesByIdCorp(iduser)    
        if (!response || response.length < 1) 
            return res.status(403).json(
                await RES(403, {error:"Your Customer are nothing, please insert first"}).modul()    
            );
        
        return res.json(
            await RES(200, response).modul()
        )

    }

    return {
        GetListOffice,
        GetListCustomer,
    }
}

module.exports = ODuserGet