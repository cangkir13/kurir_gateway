const rpx = async(params) => {
    // console.log(params);
    
    return {
        status:true,
        respose:{
            courier:params.courier,
            image:params.image,
        }
    }
}

module.exports = {rpx}