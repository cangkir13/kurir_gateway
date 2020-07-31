const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const userCorp = require('./User_company');
const tbl = 'User_package';

const User_package = sequelize.define('user_package', {
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  co_code: {
    type: Sequelize.INTEGER,
  },
  id_package: {
    type: Sequelize.INTEGER,
  },
  couriers: {
    type: Sequelize.STRING,
  },
  type_sv: {
    type: Sequelize.STRING,
  },
  price_sv: {
    type: Sequelize.STRING,
  },
  month:{
    type: Sequelize.INTEGER,
  },
  courier_access: {
    type: Sequelize.STRING,
  },
  create_at: {
    type: Sequelize.DATE,
  },
  update_at: {
    type: Sequelize.DATE,
  }
 
}, {  tbl, timestamps:false, freezeTableName:true });

// User_package.belongsTo(userCorp, {foreignKey:'co_code'})

module.exports = User_package;