const validate = require('../../api/middleware/validation/validateMiddleware')
const schemas = require('../../api/middleware/validation/validateSchema')

const ProtectRoutes = {
    'GET /foo':'Tesfoo.index',

    //  CRUD OFFICE AND DESTINATION DIR /controller/user_origin_destination
    'GET /getlistOffice':'user_origin_destination/ODuserGet.GetListOffice',
    'GET /getlistCustomer':'user_origin_destination/ODuserGet.GetListCustomer',
    
    'POST /addOriginDestination': {
                                path:'user_origin_destination/ODuserCreate.InsertAlls',
                                middlewares: [validate(schemas.InsertOriginDestination)]
                            },
    'POST /addOrigin': {
        path:'user_origin_destination/ODuserCreate.InsertOffice',
        middlewares: [validate(schemas.InsertOfficeOrigin)]
    },
    'POST /addDestination': {
        path:'user_origin_destination/ODuserCreate.InsertDestintion',
        middlewares: [validate(schemas.InsertDestination)]
    },   

    'PUT /UpdateOrigin': {
        path:'user_origin_destination/ODuserUpdate.UpdateOriginLocation',
        middlewares: [validate(schemas.UpdateOrigin)]
    },
    
    'PUT /UpdateDestination': {
        path:'user_origin_destination/ODuserUpdate.UpdateDestinationLocation',
        middlewares: [validate(schemas.UpdateDestination)]
    },
    
    // GET PRICE USER 
    'POST /GetPriceLatLong' : {
        path:'user_getprice/GetPriceLatlong.index',
        middlewares: [validate(schemas.PriceLatlong)]
    }
    
}

module.exports = ProtectRoutes