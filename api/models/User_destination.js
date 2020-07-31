const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const MasterArea = require('./Master_area');

const tbl = 'User_destination';

const User_destination = sequelize.define('user_destination', {
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  co_code: {
    type: Sequelize.INTEGER,
  },
  kode: {
    type: Sequelize.STRING,
  },
  idlocation: {
    type: Sequelize.INTEGER,
  },
  nama_penerima: {
    type: Sequelize.INTEGER,
  },
  tlpn: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  alamat: {
    type: Sequelize.STRING,
  },
  create_at: {
    type: Sequelize.DATE,
  },
  update_at: {
    type: Sequelize.DATE,
  }
 
}, {  tbl, timestamps:false, freezeTableName:true });

User_destination.belongsTo(MasterArea, {foreignKey:'idlocation'})

module.exports = User_destination;