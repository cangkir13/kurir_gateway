const taskModel = require('../models/Task');
const userModel = require('../models/User');
const Sequelize = require('sequelize');
const Op = Sequelize.Op


const TaskController = () => {

  const register = async (req, res) => {
    const {tasks,user} = req.body;
    const taskArr = await tasks.map(task => ({task})); 
    
     try{
        let findUser = await userModel
          .findOne({
            where: {
              user,
            },
            attributes: ['id'],
          });

          if(findUser){
            let userId = findUser.dataValues.id;

            let data = taskArr.map(el => {
                       return Object.assign({}, el, {UserId:userId})
                     return el
                }) 
            await taskModel.bulkCreate(data);
            return res.status(204).json(); 
          } else {  
            return res.status(412).json({ error: 'User not Found' });
          }
         
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

const destroy = async (req, res) => {
    const {tasks,user} = req.body;
     try{
        await userModel
          .findOne({
            where: {
              user,
            },
            attributes: ['id'],
          })
          .then(async function(results) {
            await taskModel.destroy({
                where: {
                      task: { 
                          [Op.in]: tasks, 
                           },
                      UserId: results.dataValues.id,
                         }
                      }) 
            return res.status(204).json();  
          })

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
    destroy,
  
  };


};

module.exports = TaskController;