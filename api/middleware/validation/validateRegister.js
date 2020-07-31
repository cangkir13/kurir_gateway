const tbluserpri = require('../../models/User_privileges');
const tblcorport = require('../../models/User_company');
const tblroot = require('../../models/User_root');
const tblmarea = require('../../models/Master_area');
const tblPackg = require('../../models/Master_package');
const tblCourir = require('../../models/Master_courier');
const exist = 'already exists';
const admincode = "GETWAY1239";
const isValidDomain = require('is-valid-domain');

const validateRegister = () => {
    const valEmail = async(req) => {
        let data = await tbluserpri.findOne({
            where:{
                email:req.body.email
            }
        });
        if (data) {
            return 'email '+exist;
        } 
    }

    const valUsername = async(req ) => {
        let data = await tbluserpri.findOne({
            where:{
                username:req.body.username
            }
        });
        if (data) {
            return 'username '+exist;
        } 
    }

    const valNpwp = async(req ) => {
        let data = await tblcorport.findOne({
            where:{
                co_npwp:req.body.co_npwp
            }
        });
        if (data) {
            return 'co_npwp '+exist;
        }
    }

    const valRootid = async(req ) => {
        const {idroot} = req.body;  
        if (idroot <= 2) return 'Ops sory, Access Denide'; 
        let rootid = await tblroot.findOne({
            where:{
                id:idroot
            }
        })
        if (!rootid) {
           return 'Sory this root not available';
        } else {
            if (idroot == 1) {
                let headersp = req.headers['x-key'];
                if (headersp === undefined || headersp !== admincode) {
                 return 'Ops sory, Access Denide';
                }
            }
        }
    }

    const runval = async(req) => {
        let username = await valUsername(req) || null
            if (username !== null) return username
        let email = await valEmail(req) || null;
            if (email !== null) return email 
        // let co_npwp = await valNpwp(req) || null;
        //     if(co_npwp !== null) return co_npwp
        let idroot = await valRootid(req) || null;
            if (idroot !== null) return idroot
        let website = isValidDomain(req.body.website);
            if(website == false) return "Plese enter your true domain/website"
        return false ;   
    }

    const valMap = async(provinsi, kota, kecamatan, kelurahan, kodepos) => {
        return await tblmarea.findOne({
            where:{
                provinsi,
                kota,
                kecamatan,
                kelurahan,
                kodepos
            }
        }).then((result) => {
            // console.log(result.dataValues)
            return {status:true, data:result.dataValues}
        }).catch((err) => {
            return {status:false, msg:'the location are wrong, Please check your location'}
        });
    }

    const valPackge = async(req) => {
        let packges = await tblPackg.findOne({
            where:{id:req.body.packges.idpackge}
        });
        if(!packges) return {status:false, msg:"Packge ID not found"};

        let choosencouriers = req.body.packges.couriers.split(",");

        let lghtCors = Object.keys(choosencouriers).length;

        if(lghtCors > packges.couriers) return {status:false, msg:"total courier may not be more than the specified amount"}

        let disblecourier = [];
        for (let index = 0; index < choosencouriers.length; index++) {
            let findcourier = await tblCourir.findOne({
                where:{
                    active:1,
                    courier:choosencouriers[index]
                },
                attributes:['courier']
            })
            if (!findcourier) {
                disblecourier.push({
                    couriers:choosencouriers[index] + ' Not Found'
                })
            }
        }
        // console.log(req.body.packges.typeService);
        
        if (req.body.packges.typeService > 1) return {status:false, msg:"packges typeService not found"}

        if(disblecourier.length > 0){
            return {status:false, msg:disblecourier}
        }
 
        return {status:true, couriers:req.body.packges.couriers};
        
    }

    return {
        runval,
        valMap,
        valPackge
    }
}

module.exports = validateRegister