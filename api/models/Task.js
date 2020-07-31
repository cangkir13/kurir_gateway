const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const table_tasks = 'task';

const Task = sequelize.define('Task', {
  task: {
    type: Sequelize.STRING,
  },
 
}, {  table_tasks });


module.exports = Task;
