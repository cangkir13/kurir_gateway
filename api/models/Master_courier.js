const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'Master_courier';

const Master_courier = sequelize.define('master_courier', {
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  courier: {
    type: Sequelize.STRING,
  },
  label: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.STRING,
  },
  is_cod: {
    type: Sequelize.INTEGER,
  },
  active: {
    type: Sequelize.INTEGER,
  },
  create_at: {
    type: Sequelize.DATE,
  },
  update_at: {
    type: Sequelize.DATE,
  },
 
}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = Master_courier;
