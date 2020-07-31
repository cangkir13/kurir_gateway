const {Op} = require('sequelize')
const mastercouriers = require('../../models/Master_courier')

const validateCouriers = () => {
    const avaicouriers = async(couriers) => {

        let listcourirs = couriers.split(',');
        let availb = await mastercouriers.findAll({
            attributes:['courier', 'label', 'image', 'is_cod' ,'active'],
            where:{
                courier:{
                    [Op.in] : listcourirs
                }
                
            },
        }).then((result) => {
            // console.log(result.data);
            
            return result
        }).catch((err) => {
            return false
        });
        return availb
    }

    return {
        avaicouriers
    }
}

module.exports = validateCouriers;