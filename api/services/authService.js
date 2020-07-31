const jwt = require('jsonwebtoken');
const tble = require('../models/User_privileges');

const authService = () => {
    const issue = (payload, secret) => {
        // console.log(payload, secret);
        return jwt.sign(payload, secret, {expiresIn:60*60})
    };
    const verify =  (token, secret ,cb) => {
        return jwt.verify(token, secret, {}, cb)
    }
    // const runVerify = (token) => {
    //     let user = tble.findOne({
    //         where
    //     })
    // }
    return {
        issue,
        verify,
    }
}

module.exports = authService