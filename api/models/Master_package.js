const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'Master_package';

const Master_package = sequelize.define('master_package', {
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name_packge: {
    type: Sequelize.STRING,
  },
  getprice: {
    type: Sequelize.INTEGER,
  },
  generate_awb: {
    type: Sequelize.INTEGER,
  },
  tracking_awb: {
    type: Sequelize.INTEGER,
  },
  couriers: {
    type: Sequelize.INTEGER,
  },
  is_cod: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  keterangan: {
    type: Sequelize.STRING,
  },
  period: {
    type: Sequelize.STRING,
  },
  create_at: {
    type: Sequelize.DATE,
  },
  update_at: {
    type: Sequelize.DATE,
  },
 
}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = Master_package;