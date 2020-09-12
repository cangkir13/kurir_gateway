const Joi = require('@hapi/joi');

const schemas = { 
  
  // assignTask: Joi.object().keys({ 
  //   Users: Joi.array().required().items(Joi.string().required())
  // }),
  
  Register: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
    password2: Joi.string().required(),
    email :Joi.string() .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    corpoate_name: Joi.string().required(),
    co_npwp: Joi.number().allow(''),
    address: Joi.string().required(),
    website:Joi.string().allow('')  ,
    phone: Joi.number().required(),
    provinsi: Joi.string().required(),
    kabupaten: Joi.string().required(),
    kecamatan: Joi.string().required(),
    kelurahan :Joi.string().required(),
    kodepos:Joi.number().required()  ,
    idroot:Joi.number().required()  ,
    packges:{
      idpackge:Joi.number().required(),
      couriers:Joi.string().required(),
      month:Joi.number().required(),
      typeService:Joi.number().required(),
      priceService:Joi.number().required(),
    },
    
  }),

  Login: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
    client_code: Joi.string().required(),
  }),

  // middleware insert origin and destination
  InsertOriginDestination: Joi.object().keys({
    origin: Joi.object().required().keys({
      nama_pengirim: Joi.string().required(),
      tlpn: Joi.string().required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      alamat: Joi.string().required(),
      provinsi: Joi.string().required(),
      kabupaten: Joi.string().required(),
      kecamatan: Joi.string().required(),
      kelurahan: Joi.string().required(),
      kodepos: Joi.number().required(),
    }),
    destination:Joi.object().required().keys({
      nama_penerima: Joi.string().required(),
      tlpn: Joi.number().required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      alamat: Joi.string().required(),
      provinsi: Joi.string().required(),
      kabupaten: Joi.string().required(),
      kecamatan: Joi.string().required(),
      kelurahan: Joi.string().required(),
      kodepos: Joi.number().required(),
    }), 
    
  }),

  // middleware of insert origin
  InsertOfficeOrigin:Joi.object().keys({
    nama_pengirim: Joi.string().required(),
    tlpn: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    alamat: Joi.string().required(),
    provinsi: Joi.string().required(),
    kabupaten: Joi.string().required(),
    kecamatan: Joi.string().required(),
    kelurahan: Joi.string().required(),
    kodepos: Joi.number().required(),
  }),

  // middleware of insert destination
  InsertDestination:Joi.object().keys({
    nama_penerima: Joi.string().required(),
    tlpn: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    alamat: Joi.string().required(),
    provinsi: Joi.string().required(),
    kabupaten: Joi.string().required(),
    kecamatan: Joi.string().required(),
    kelurahan: Joi.string().required(),
    kodepos: Joi.number().required(),
  }),

  // middleware of update origin
  UpdateOrigin:Joi.object().keys({
    office: Joi.string().required(),
    nama_penerima: Joi.string().required(),
    tlpn: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    alamat: Joi.string().required(),
    provinsi: Joi.string().required(),
    kabupaten: Joi.string().required(),
    kecamatan: Joi.string().required(),
    kelurahan: Joi.string().required(),
    kodepos: Joi.number().required(),
  }),

  // middleware of update destionation
  UpdateDestination:Joi.object().keys({
    kode: Joi.string().required(),
    nama_penerima: Joi.string().required(),
    tlpn: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    alamat: Joi.string().required(),
    provinsi: Joi.string().required(),
    kabupaten: Joi.string().required(),
    kecamatan: Joi.string().required(),
    kelurahan: Joi.string().required(),
    kodepos: Joi.number().required(),
  }),

  // price user with lat long
  PriceLatlong: Joi.object().keys({
    kode: Joi.string().required(),
    harga: Joi.number().required(),
    quantity: Joi.number().required(),
    weight: Joi.number().required(),
    height: Joi.number().required(),
    width: Joi.number().required(),
    
  })
  // define all the other schemas below 
}; 
module.exports = schemas;