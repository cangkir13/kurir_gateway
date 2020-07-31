const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const tlbUserpriv = require('./User_privileges');
const tblPackge = require('./User_package');
const User = require('./User');

const tbl = 'User_company';

const User_company = sequelize.define('user_company', {
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  corporate_code : {
    type: Sequelize.STRING,
  },
  logo: {
    type: Sequelize.STRING,
  },
  co_name: {
    type: Sequelize.STRING,
  },
  co_npwp: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  co_hp: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  idlocation: {
    type: Sequelize.INTEGER,
  },
  create_at: {
    type: Sequelize.DATE,
  },
  update_at: {
    type: Sequelize.DATE,
  }
 
}, {  tbl, timestamps:false, freezeTableName:true });

// tlbUserpriv.belongsTo(User_company, {foreignKey:'co_code'})
// userCorp.hasMany(User_privileges, {foreignKey:'id'})

module.exports = User_company;