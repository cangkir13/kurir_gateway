const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'Master_area';

const Master_area = sequelize.define('master_area', {
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  city_type: {
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
  lat:{
    type: Sequelize.STRING
  },
  long:{
    type: Sequelize.STRING
  },
 
}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = Master_area;
