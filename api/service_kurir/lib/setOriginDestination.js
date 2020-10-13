/**
 * library for find origin and destination
 * return data status and data value of response server
 */
const Marea = require('../../models/Master_area')
const Morg = require('../../models/User_origin')
const Mdes = require('../../models/User_destination')
const UserPackage = require('../../models/User_package');

const userPackgeUse = async(co_code) => {
    return await UserPackage.findOne({
        where:{co_code}
    })
}

const Origin = async(office, co_code) => {
    return await Morg.findOne({
        where:{
            office, co_code, active:1
        }, 
        include:Marea  
    })
}

const Destination = async(co_code, kode) => {
    return await Mdes.findOne({
        where:{
            kode, co_code
        }, 
        include:Marea  
    })
}

module.exports = async(params) => {
    const {id, office, destination} = params

    let packageUser = await userPackgeUse(id)

    if (!packageUser) {
        return {status:false, msg:"Packge user not found please call our team"}
    }

    let officeOrg = await Origin(office, id)
    if(!officeOrg)
        return {status:false, msg:"office not found"}

    let receiver = await Destination(id, destination)
    if(!receiver)
        return {status:false, msg:"Destination / receiver not found"}



    return {
        sender:{
            office:officeOrg.office,
            nama_pengirim:officeOrg.nama_pengirim,
            tlpn:officeOrg.tlpn,
            email:officeOrg.email,
            alamat:officeOrg.nama_pengirim,
            provinsi:officeOrg.master_area.provinsi,
            kota:officeOrg.master_area.kota,
            kecamatan:officeOrg.master_area.kecamatan,
            kelurahan:officeOrg.master_area.kelurahan,
            kodepos:officeOrg.master_area.kodepos,
            latitude:officeOrg.master_area.lat,
            longitude:officeOrg.master_area.long
        },
        receiver:{
            kode:receiver.kode,
            nama_penerima:receiver.nama_penerima,
            tlpn:receiver.tlpn,
            email:receiver.email,
            alamat:receiver.alamat,
    
            provinsi:receiver.master_area.provinsi,
            kota:receiver.master_area.kota,
            kecamatan:receiver.master_area.kecamatan,
            kelurahan:receiver.master_area.kelurahan,
            kodepos:receiver.master_area.kodepos,
            
            latitude:receiver.master_area.lat,
            longitude:receiver.master_area.long,
        },
        packge:{
            type:packageUser.type_sv,
            price_packge:packageUser.price_sv,
            msg:packageUser.type_sv === 1? 'Per KG':'Per Packge'
        }
    }    

}