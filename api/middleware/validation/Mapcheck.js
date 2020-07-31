const Masterarea = require('../../models/Master_area');
const Mapcheck =  async(provinsi, kota, kecamatan, kelurahan, kodepos) => {
    return await Masterarea.findOne({
        where:{
            provinsi, kota, kecamatan, kelurahan, kodepos
        }
    })
}

module.exports = Mapcheck