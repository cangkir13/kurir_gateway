const Joi = require('@hapi/joi');
const Response = require('../../services/modul.res');

const validateMiddleware = (schema, property) => { 
  return async(req, res, next) => { 
  const { error } = Joi.validate(req.body, schema); 
  const valid = error == null; 

    if (valid) { 
      next(); 
    } else { 
      const { details } = error; 
      const message = details.map(i => i.message).join(',');

      console.log("error", message); 
      let data = await Response(422, {error:message} ).modul();
      res.status(422).json(data) 
    } 
  } 
} 
module.exports = validateMiddleware;