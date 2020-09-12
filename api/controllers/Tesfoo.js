const Response = require('../services/modul.res');
const sequelize = require('../../config/database');
const tblPriv = require('../models/User_privileges');
const tblCorporate = require('../models/User_company');
const tblUserPckg = require('../models/User_package');
const moment = require('moment');
const ServiceUpload = require('../services/ServiceUpload').single('file');
const csvFs = require('fast-csv');
const validateCourir = require('../middleware/validation/validateCouriers');
const {serviceFee} = require('../service_kurir/getprice/Getfee.app');
let fs = require('fs')

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

    const UploadFile = async(req, res) => {
        
        
        ServiceUpload(req, res, async(err) => {
            if (err) {
                console.log(err);
                return res.status(400).json(await Response(400, err).modul())
            }

                let stream = fs.createReadStream(req.file.path)
                let csvData = []
                let csvStream = csvFs.parse()
                    .on("data", (data) => {
                        csvData.push(data)
                    })
                    .on("end", () => {
                        // Remove Header ROW
                        csvData.shift();
                        // console.log(csvData);
                        
                        let query = "INSERT INTO test_insert_api ( dfno, name, email) VALUES ?";
                        sequelize.query(query, {
                                replacements:  [csvData],
                                type: sequelize.QueryTypes.INSERT
                            }).then( (result) => {
                                return res.status(200).json({status:'true', message:req.file});
                            }).catch( (error) => {
                                return res.status(500).json({status:'false', message:error.message});
                            }); 
                    })
                 stream.pipe(csvStream)
                 
                // console.log(arrData);
                // {file:req.file, data:datas}
                // return res.status(200).json(await Response(200, arrData).modul())
            // }
        })
    }


    const uploadataKurir = (req, res) => {

    }

    return {
        index,
        addDestny,
        foo,
        UploadFile,
        uploadataKurir
    }
}

module.exports =Tesfoo