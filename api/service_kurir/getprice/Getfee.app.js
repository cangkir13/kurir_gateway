const {rpx} = require('./rpx');
const {jne} = require('./jne');

const serviceFee = async(args) => {
    let courierInactiv = [];
    let courierActiv = []
    // console.log(args);
    
    for (let index = 0; index < args.length; index++) {
        if (args[index].active < 1 ) {
            courierActiv.push({
                status:false,
                courier:args[index].courier,
                logo:args[index].image,
                msg:"Sory the courier is not active"
            })
        }else{
            if (args[index].courier == 'jne' ) {
                courierActiv[index] = await jne(args[index])
            } 
            if (args[index].courier == 'rpx') {
                courierActiv[index] = await rpx(args[index])
            }
            // if (condition) {
                
            // }
        }
    }
    // let combine = [];
    // combine.push(courierActiv, courierInactiv )
    // console.log(courierActiv);
    
    return {couriers_active:courierActiv }
    // args.forEach(value => {
    //     if (value.active !== 1) {
    //         courierInactiv.push({
    //             status:false,
    //             courier:value.courier,
    //             logo:value.image,
    //             msg:"Sory the courier is not active"
    //         })
    //     }
        
    //     switch (value.courier) {
    //         case 'jne':
    //                 courierActiv = jne(value);
    //             break;
    //         case 'rpx':
    //                 courierActiv = rpx(value);
    //             break;
    //         default:
    //             break;
    //     }
    // });
    // return {
    //     courierInactiv,
    //     courierActiv
    // }
}

module.exports = {serviceFee}