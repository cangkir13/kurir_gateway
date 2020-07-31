const Response = require('../services/modul.res');
const tblPriv = require('../models/User_privileges');
const tblCorporate = require('../models/User_company');
const tblUserPckg = require('../models/User_package');
const moment = require('moment');
const validateCourir = require('../middleware/validation/validateCouriers');
const {serviceFee} = require('../service_kurir/getprice/Getfee.app');

const Tesfoo = () => {
    const index = async(req, res) => {
        try {
            const {client_code} = req.users;
            console.log(req.users);
            
            let splitcc = client_code.split('.');
            if (splitcc) {
                
            } else {
                
            }
            client_codes = splitcc[0]
            
            let userPaket = await tblUserPckg.findOne({
                where:{
                    co_code:splitcc[1]
                }
            });

            let datacourir = await validateCourir().avaicouriers(userPaket.couriers)
            
            let responsefee = await serviceFee(datacourir);
            // console.log(responsefee)
            return res.status(200).json(await Response(200, responsefee).modul())
        } catch (error) {
            return res.status(400).json(await Response(400, {error:error.message}).modul())
        }
    }

    const addDestny = async(req, res) => {
        try {
            const {client_code} = req.users;
            let splitcc = client_code.split('.');
            
            client_codes = splitcc[0]
            
            let userPaket = await tblUserPckg.findOne({
                where:{
                    co_code:splitcc[1]
                }
            });
        } catch (error) {
            return res.status(400).json(await Response(400, {error:error.message}).modul())
        }
    }

    const foo = async(req, res) => {
        console.log(req);
        
        return res.json({msg:req.params})
    }

    return {
        index,
        addDestny,
        foo
    }
}

module.exports =Tesfoo