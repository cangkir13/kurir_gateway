/**
 * Controller user to update data origin and destination
 */
const RES = require('../../services/modul.res');
const Userorg = require('../../models/User_origin');
const Userdes = require('../../models/User_destination');
// const Masterarea = require('../../models/Master_area');
const Mapcheck = require('../../middleware/validation/Mapcheck')
const moment = require('moment');

async function CheckIDorg(id,code) {
    return await Userorg.findOne({
        where:{
            co_code:id,
            office:code
        },
    })
}

async function CheckIDdest(id, kode) {
    return await Userdes.findOne({
        where:{
            co_code:id,
            kode
        },
    })
}

const ODuserUpdate = () => {
    const UpdateOriginLocation = async(req, res) => {
        try {
            const {client_code, iduser, level} = req.users;
            const {office} = req.body
            const {body} = req
            
            if(!await CheckIDorg(iduser, office))
                return res.status(403).json(
                    RES(403, {error:'data Office not found'}).modul()
                );

            let origin = await Mapcheck(
                            body.provinsi, body.kabupaten,
                            body.kecamatan, body.kelurahan, 
                            body.kodepos
                            );
                            
            if (!origin ) return res.status(404).json(
                RES(404, {error:'Data location not found'}).modul()
            );

            await Userorg.update({
                idlocation:origin.id,
                nama_pengirim:body.nama_pengirim,
                tlpn:body.tlpn,
                email:body.email,
                alamat:body.alamat,
                update_at:moment(),
            }, {where:{office}} ) 

            return res.json(
                RES(201, "Data Office origin has been updated").modul()    
            )
        } catch (error) {
            return res.status(500).json(
                RES(500, {error:"Sory, "+error.message}).modul()    
            )
        }
    }

    const UpdateDestinationLocation = async(req, res) => {
        try {
            const {client_code, iduser, level} = req.users;
            const {kode} = req.body
            const {body} = req
            // return res.json(await CheckIDdest(iduser, kode))
            if(!await CheckIDdest(iduser, kode))
                return res.status(403).json(
                    RES(403, {error:'data not found'}).modul()
                );

            let destionation = await Mapcheck(
                            body.provinsi, body.kabupaten,
                            body.kecamatan, body.kelurahan, 
                            body.kodepos
                            );
                            
            if (!destionation ) 
                return res.status(404).json(
                    RES(404, {error:'Data location not found'}).modul()
                );

            await Userdes.update({
                idlocation:destionation.id,
                nama_penerima:body.nama_penerima,
                tlpn:body.tlpn,
                email:body.email,
                alamat:body.alamat,
                update_at:moment(),
            }, {where:{kode}} ) 

            return res.json(
                RES(201, "Data destination has been updated").modul()    
            )
        } catch (error) {
            return res.status(500).json(
                RES(500, {error:"Sory, "+error.message}).modul()    
            )
        }
    }

    return {
        UpdateOriginLocation,
        UpdateDestinationLocation,
    }
}

module.exports = ODuserUpdate