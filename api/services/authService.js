/**
 * @author lepek13
 * @abstract Jwt acces to system like payload and etc
 * secret data is can be create from register 
 * time expired 3 hours
 */

const jwt = require('jsonwebtoken');

const authService = () => {
    const issue = (payload, secret) => {
        return jwt.sign(payload, secret, {expiresIn:60*60})
    };
    const verify =  (token, secret ,cb) => {
        return jwt.verify(token, secret, {}, cb)
    }
    
    return {
        issue,
        verify,
    }
}

module.exports = authService