/**
 * Controller create data origin/office and destinaton 
 */
const Userorg = require('../../models/User_origin');
const Userdes = require('../../models/User_destination');
const RES = require('../../services/modul.res');
const moment = require('moment');
const sequel = require('../../../config/database')
const generateCode = require('../../services/GenerateCode')
const Mapcheck = require('../../middleware/validation/Mapcheck')

const ODuserCreate = () => {
    const InsertAlls = async(req, res) => {
        let transaction = await sequel.transaction();
        try {
            const {client_code, iduser, level} = req.users;
            const {origin, destination} = req.body
                        
            let originv = await Mapcheck(
                                origin.provinsi, origin.kabupaten,
                                origin.kecamatan, origin.kelurahan, 
                                origin.kodepos
                            )

            if (!originv ) return res.status(404).json(
                await RES(404, {error:'Data origin not found'}).modul()
            ) 

            let destinationv = await Mapcheck(
                            destination.provinsi, destination.kabupaten,
                            destination.kecamatan, destination.kelurahan, 
                            destination.kodepos
                        )

            if (!destinationv ) return res.status(404).json(
                await RES(404, {error:'Data destination not found'}).modul()
            ) 
            
            await Userorg.create({
                co_code:iduser,
                office:generateCode(10),
                idlocation:originv.id,
                nama_pengirim:origin.nama_pengirim,
                tlpn:origin.tlpn,
                email:origin.email,
                alamat:origin.alamat,
                active:1,
                create_at:moment(),
                update_at:moment(),
            }, {transaction} )

            await Userdes.create({
                co_code:iduser,
                kode:generateCode(10),
                idlocation:destinationv.id,
                nama_penerima:destination.nama_penerima,
                tlpn:destination.tlpn,
                email:destination.email,
                alamat:destination.alamat,
                create_at:moment(),
                update_at:moment(),
            }, {transaction} )

            await transaction.commit();  
            return res.json(
                await RES(201, "Office/origin and destination has been added").modul()    
            )

        } catch (error) {
            await transaction.rollback();
            return res.status(403).json(
                await RES(403, {error:"Access denide", note:error.message}).modul()
            )
        }
    };

    const InsertOffice = async(req, res) => {
        try {
            const {client_code, iduser, level} = req.users;
            const {body} = req
            
            let origin = await Mapcheck(
                            body.provinsi, body.kabupaten,
                            body.kecamatan, body.kelurahan, 
                            body.kodepos
                            );
            if (!origin ) return res.status(404).json(
                await RES(404, {error:'Data origin not found'}).modul()
            );

            await Userorg.create({
                co_code:iduser,
                office:generateCode(10),
                idlocation:origin.id,
                nama_pengirim:body.nama_pengirim,
                tlpn:body.tlpn,
                email:body.email,
                alamat:body.alamat,
                create_at:moment(),
                update_at:moment(),
            } ) 

            return res.json(
                await RES(201, "Data Office origin has been added").modul()    
            )
        } catch (error) {
            return res.status(403).json(
                await RES(403, {error:"Access denide", note:error.message}).modul()
            )
        }
    }

    const InsertDestintion = async(req, res) => {
        try {
            const {client_code, iduser, level} = req.users;
            const {body} = req
            
            let destination = await Mapcheck(
                            body.provinsi, body.kabupaten,
                            body.kecamatan, body.kelurahan, 
                            body.kodepos
                            );
            if (!destination ) return res.status(404).json(
                await RES(404, {error:'Data destination not found'}).modul()
            );

            await Userdes.create({
                co_code:iduser,
                kode:generateCode(10),
                idlocation:destination.id,
                nama_penerima:body.nama_penerima,
                tlpn:body.tlpn,
                email:body.email,
                alamat:body.alamat,
                create_at:moment(),
                update_at:moment(),
            } ) 

            return res.json(
                await RES(201, "Data destination has been added").modul()    
            )
        } catch (error) {
            return res.status(403).json(
                await RES(403, {error:"Access denide", note:error.message}).modul()
            )
        }
    }

    return {
        InsertAlls,
        InsertOffice,
        InsertDestintion,
    }
}

module.exports = ODuserCreate