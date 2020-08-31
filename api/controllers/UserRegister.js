/**
 * Controller for registrasi client to kurir_gateway
 */

const Usercmp = require('../models/User_company');
const Userpri = require('../models/User_privileges');
const UserPack = require('../models/User_package');
const sequlz = require('../../config/database');
const datetime = require('node-datetime');
const Response = require('../services/modul.res');
const MiddleReg = require('../middleware/validation/validateRegister');
const moment = require('moment');
const generateCode = require('../services/GenerateCode')

const UserRegister = () => {
    const Register = async(req, res) => {
        let transaction = await sequlz.transaction();
        let {body} = req
        let {idpackge, couriers, month, typeService, priceService} = body.packges
        let {username, password, corpoate_name, co_npwp, 
            address, email, website, phone, provinsi, kabupaten, kecamatan, 
            kelurahan, kodepos, idroot  } = body
        try {
            
            if (body.password === body.password2) {
                // generate client code
                let client_code =  generateCode(30);

                // middleware for data request
                let valData = await MiddleReg().runval(req)
                if (valData != false ) 
                    return res.status(400)
                                .json(await Response(400, {error:valData} ).modul());
    
                // middleware for maping area
                let valMaps = await MiddleReg()
                        .valMap(provinsi, kabupaten, kecamatan, kelurahan, kodepos)
                if (valMaps.status == false) 
                    return res.status(400).json(await Response(400, {error:valMaps.msg} ).modul());
    
                // middleware for courier available
                let valPaket = await MiddleReg().valPackge(req)
                if (valPaket.status == false) 
                    return res.status(400)
                        .json(await Response(400, {error:valPaket.msg} ).modul());
                
                // param post corporate
                let company = {
                    corporate_code:generateCode(9).toUpperCase(),
                    co_name:corpoate_name,
                    co_npwp,
                    email,
                    co_hp:phone,
                    address,
                    idlocation:valMaps.data.id,
                    create_at:datetime.create().format('Y-m-d H:m:S'),
                    update_at:datetime.create().format('Y-m-d H:m:S'),
                }
                // action insert corporate
                let insertCompy = await Usercmp.create(company, {transaction})
                // console.log(insertCompy)
    
                // param post user packge
                let userpackge = {
                    co_code:insertCompy.id,
                    id_package:idpackge,
                    couriers,
                    type_sv:typeService ,
                    price_sv :priceService,
                    month,
                    create_at:datetime.create().format('Y-m-d H:m:S'),
                    update_at:datetime.create().format('Y-m-d H:m:S'),
                }
                
                // action insert user package
                await UserPack.create(userpackge, {transaction})

                let expired_at = moment().add(month, 'month');
                // param post privillages
                let privlg = {
                    rootid:idroot,
                    username, 
                    password, 
                    email, 
                    co_code:insertCompy.id,
                    client_code, 
                    website,
                    status:1,
                    create_at:datetime.create().format('Y-m-d H:m:S'),
                    update_at:datetime.create().format('Y-m-d H:m:S'),
                    expired_at
                }
    
                // action create privillages
                await Userpri.create(privlg, {transaction})
    
                // return values
                let corporate = {
                    client_code,
                    corporate_code:company.corporate_code,
                    corpoate_name,
                    package:{
                        couriers:valPaket.couriers,
                        type:(userpackge.type_sv==1) ? 'Per Kg' : 'Per AWB',
                        price:userpackge.price_sv
                    }
                    
                }
                await transaction.commit();  
                res.status(201).json(
                    await Response(201, {
                        corporate,  note:"Data has been created" } ).modul());
                
            }else{
                res.status(400).json(
                    await Response(400, {password:"password not mach"} ).modul());
            }
        } catch (error) {
            await transaction.rollback();
            return res.status(500).json({error:true, msg:error.message})
        }
    };

    
    return {
        Register,
    }

}

module.exports = UserRegister