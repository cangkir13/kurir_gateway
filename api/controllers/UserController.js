const userModel = require('../models/User');
const taskModel = require('../models/Task');
const Sequelize = require('sequelize');
const Op = Sequelize.Op



const UserController = () => {
  const register = async (req, res) => {
    const {Users} = req.body;
    
     let data = await Users.map(user => ({user})); 
      try {
        let insert = await userModel.bulkCreate(data);
        return res.status(200).json(insert);
      } catch (err) {
          if (err.errors){
            console.log(err);
            return res.status(400).json({ error: err.errors });
          }
          else {
            console.log(err);
            return res.status(500).json({ error: 'Internal server error' });
          }

      }
    
  };

  

  const getTasks = async (req, res) => {
    const {Users} = req.body;
    try {
      const users = await userModel.findAll({            
                where: {
                      user: { 
                          [Op.in]: Users, 
                           }
                         },
                include: [{
                model: taskModel,
                attributes: ['task'],
            }],
          }).then(function(results) {
             let arr = results.filter(el => el.Tasks)
                 .map(el => el.Tasks.map(Tasks => Tasks.task))
                 .reduce((a, b) => a.concat(b), []);
             let tasks = arr.filter((e, i, a) => a.indexOf(e) !== i)

            return tasks.length>0 ? res.status(200).json( {tasks} ): res.status(200).json( {message: "users doesn't have common tasks"});  
          });
    } catch (err) {
          if (err.errors){
            console.log(err);
            return res.status(400).json({ error: err.errors });
          }
          else {
            console.log(err);
            return res.status(500).json({ error: 'Internal server error' });
          }

      }
    
  };


  return {
    register,
    getTasks
  };
};

module.exports = UserController;
