/**
 * Contoller for login with JWT
 */

const Response = require('../services/modul.res');
const bcryptService = require('../services/bcryptService');
const AuthSrvs = require('../services/authService');
const tblUsrPr = require('../models/User_privileges');
const tblToken = require('../models/User_token');
const moment = require('moment')
// const nodemail = require('nodemailder')
// const datetime = require('node-datetime');

const UserAccess = () => {
    const Login = async(req, res) => {
        const {username, password, client_code} = req.body
        let datauser = await tblUsrPr.findOne({
            where:{
                username,
                client_code
            }
        })
        if (!datauser) {
            return res.status(404).json(
                Response(404, {error:"Username and client_code not found"}).modul()
            );
        }

        if (datauser.status < 1) {
            return res.status(401).json(
                Response(401, {error:"Your account is not active"}).modul()
            );
        }

        if (moment().isAfter(datauser.expired_at)) {
            return res.status(400).json(
                Response(400, {error:"Your account has expired, Please contact our team"}).modul()
            )
        } 

        let decript = bcryptService().comparePassword(password, datauser.password);
        
        if ( decript) {
            let token = AuthSrvs().issue({username, password}, datauser.client_code);
            let verify = AuthSrvs().verify(token, client_code)
            // await tblToken.create({
            //     token,
            //     client_code,
            //     create_at:verify.iat,
            //     expired_at:verify.exp,
            // })
            
            return res.status(200).json(
                Response(200, 
                    {
                        type:"Bearer",
                        token,
                        expired:verify.exp,
                    }).modul()
            );
        }
        
        return res.status(401).json(
            Response(401, { response:"Ops sory your account denide"}).modul()
        );
    }

    const Forgot = async (req, res) => {
        
    }

    return {
        Login
    }
}

module.exports = UserAccess