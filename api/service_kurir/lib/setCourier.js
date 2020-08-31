const usrPckg = require('../../models/User_package');
const masterCourier = require('../../models/Master_courier');
const {Op} = require('sequelize')

const CourierUser = async(id) => {
    return await usrPckg.findOne({
        where:{
            co_code:id
        }
    })
}

const CourierCheck = async(arrayCR) => {
    return await masterCourier.findAll({
        where:{
            courier:{
                [Op.in]:arrayCR
            },
            active:1
        }
    })
}

const CourierPack = async(id) => {
    let courierUsr = await CourierUser(id);
    if (!courierUsr) 
        return {status:false, msg:'Package user not found'}
    
    let couriers = courierUsr.couriers.split(',');
    let couriersAvail = await CourierCheck(couriers);
    let couriersAvailRet =[]
    for (let index = 0; index < couriersAvail.length; index++) {
        couriersAvailRet.push({
            courier:couriersAvail[index].courier,
            label:couriersAvail[index].label,
            image:couriersAvail[index].image,
            is_cod:couriersAvail[index].is_cod,
        })
    }

    return couriersAvailRet //{couriersAvailRet, courierUsr, couriers}
}

module.exports = {CourierPack}