const validate = require('../../api/middleware/validation/validateMiddleware')
const schemas = require('../../api/middleware/validation/validateSchema')

const userRoutes = {

	'POST /register' : {
						path:'UserRegister.Register',
						middlewares: [validate(schemas.Register)]
					},

	'POST /login': {
		path:'UserAccess.Login',
		middlewares: [validate(schemas.Login)]
	},

	'GET /foop/:token':'Tesfoo.foo',
	'POST /Upload':'Tesfoo.UploadFile',
	// 'POST /forgotpassword':'',
	// 'GET /getlistOffice':'GetUserOD.GetListOffice',
};

module.exports = userRoutes;
