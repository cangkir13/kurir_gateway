const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'User_root';

const User_root = sequelize.define('user_root', {
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.INTEGER,
  },
  access: {
    type: Sequelize.STRING,
  },
}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = User_root;