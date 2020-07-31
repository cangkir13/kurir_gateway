const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const userCorp = require('./User_company');
const bcryptpas = require('../services/bcryptService');

// create bcrypt password
const hooks = {
  beforeCreate(user) {
    user.password = bcryptpas().password(user); 
  }
}
const tbl = 'User_privileges';

const User_privileges = sequelize.define('user_privileges', {
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rootid: {
    type: Sequelize.INTEGER,
  },
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  co_code: {
    type: Sequelize.INTEGER,
  },
  client_code: {
    type: Sequelize.STRING,
  },
  website: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.INTEGER,
    // validate: { min: 0, max: 1 }
  },
  create_at: {
    type: Sequelize.DATE,
  },
  update_at: {
    type: Sequelize.DATE,
  },
  expired_at: {
    type: Sequelize.DATE,
  },
 
}, { hooks, tbl, timestamps:false, freezeTableName:true });

// User_privileges.belongsTo(userCorp, {foreignKey:'co_code'})


module.exports = User_privileges;