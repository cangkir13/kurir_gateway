const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const MasterArea = require('./Master_area');

const tbl = 'User_origin';

const User_origin = sequelize.define('user_origin', {
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  co_code: {
    type: Sequelize.INTEGER,
  },
  office: {
    type: Sequelize.STRING,
  },
  idlocation: {
    type: Sequelize.INTEGER,
  },
  nama_pengirim: {
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
  active: {
    type: Sequelize.INTEGER,
  },
  create_at: {
    type: Sequelize.DATE,
  },
  update_at: {
    type: Sequelize.DATE,
  }
 
}, {  tbl, timestamps:false, freezeTableName:true });

User_origin.belongsTo(MasterArea, {foreignKey:'idlocation'})
module.exports = User_origin;