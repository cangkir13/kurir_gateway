const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const Task = require('../models/Task');



const table_users = 'users';

const User = sequelize.define('User', {
  user: {
    type: Sequelize.STRING, unique: true
  },
}, {  table_users });

User.hasMany(Task);

module.exports = User;
