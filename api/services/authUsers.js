const userAuth = require('../models/User_privileges');
const Response = require('./modul.res');
const JWTservise = require('./authService');
const moment = require('moment');

module.exports = async(req, res, next) => {
    let client_code = req.header('Client_code');

    let tokenVerify;
    // load client code as user
    let userclient;

    if (req.header('Client_code') && req.header('Authorization')) {

        let parts = req.header('Authorization').split(' ');
        userclient = await userAuth.findOne({
            where:{
                client_code,
            }
        });
        // check header Authorization
        if (parts.length === 2) {
            
            const scheme = parts[0];
            const creadentials = parts[1];
            if (/^Bearer$/.test(scheme)) {
                
                
                tokenVerify = creadentials;
                // check user client code 
                if(!userclient) 
                    return res.status(401).json(
                        await Response(401, {error:'client code not authorize'}).modul()
                    );
                
                if (userclient.status < 1) 
                    return res.status(400).json(
                        await Response(400, {error:'Your account is not active'}).modul()
                    );
                
                if (moment().isAfter(userclient.expired_at)) 
                    return res.status(400).json(
                        await Response(400, {error:"Your account has expired, Please contact our team"}).modul()
                    )
            } else {
                return res.status(400).json(
                    await Response(400, { error: 'Format for Authorization: Bearer [token]' }).modul()
                );
            }
        } else {
            return res.status(400).json(
                await Response(400, { error: 'Format for Authorization: Bearer [token]' }).modul()
            );
        }

    } else {
        let response = await Response(400, {error:'Header Client_code and Authorization must be enter'}).modul()
        return res.status(response.status_code).json(response);
    }
    
    return JWTservise().verify(tokenVerify, client_code, (err, thisToken) => {
        if (err) {
            let response = {status:false, status_code:401, data:{msg:{error:err.message}}}
            return res.status(401).json(response);
        }
        req.users = {
            client_code,
            iduser:userclient.co_code,
            level:userclient.rootid,
            users:thisToken
        };
        // req.users.iduser = userclient.co_code;
        // req.users.level = userclient.rootid;
        // req.users.detail = thisToken
        // req.users = { client_code:client_code+'.'+userclient.co_code+'.'+userclient.rootid, 
        //                 users:thisToken};
        // console.log(req.users);
        return next()
    })

}
