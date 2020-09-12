const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'Kurir_jne';

const Kurir_jne = sequelize.define('kurir_jne', {
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  origin_code: {
    type: Sequelize.STRING,
  },
  destination_code: {
    type: Sequelize.STRING,
  },
  provinsi: {
    type: Sequelize.STRING,
  },
  kota: {
    type: Sequelize.STRING,
  },
  kecamatan: {
    type: Sequelize.STRING,
  },
  kelurahan: {
    type: Sequelize.STRING,
  },
  kodepos: {
    type: Sequelize.INTEGER,
  },
  service_name:{
    type: Sequelize.STRING
  },
  price:{
    type: Sequelize.INTEGER
  },
  etd_from:{
    type: Sequelize.INTEGER
  },
  etd_to:{
    type: Sequelize.INTEGER
  },
 
}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = Kurir_jne;
