const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'User_token';

const User_token = sequelize.define('user_token', {
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  client_code: {
    type: Sequelize.STRING,
  },
  token: {
    type: Sequelize.STRING,
  },
  create_at: {
    type: Sequelize.DATE,
  },
  expired_at: {
    type: Sequelize.DATE,
  },
}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = User_token;