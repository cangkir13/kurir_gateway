const Response = require('../../services/modul.res');
const validatePolicy = () => {

	const requiredHeaders = async(req, res, next) => {
 		if (req.headers['content-type'] !== 'application/json') {
			let response = await Response(403, {error:'Server requires content-type: application/json at header'} ).modul();
			return res.status(response.status_code).json(response)
		 }
		 else {
		      next()
		    }
		};

	return {
    		requiredHeaders
 		 };
};

module.exports = validatePolicy;