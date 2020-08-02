const company = require('../../models/User_company');
const masterArea = require('../../models/Master_area');
const masterCourier = require('../../models/Master_courier');
const userPack = require('../../models/Master_package');
const userOrigin = require('../../models/User_origin');
const userDestination = require('../../models/User_destination');
const geolib = require('geolib');
const { asinh } = require('core-js/fn/number');

const findCompny = async(id) => {
    return await company.findOne({
        where:{id},
    })
}

const findOriginOne = async(co_code, office) => {
    return await userOrigin.findOne({
        where : {co_code, office,active:1},
        include:masterArea        
    })
}

const findOriginAll = async(co_code) => {
    return await userOrigin.findAll({
        where : {co_code, active:1},
        include:masterArea        
    })
}

const findDestination = async(co_code, kode) => {
    return await userDestination.findOne({
        where:{co_code, kode,},
        include:masterArea,
    })
}

const findNearsCord = async(id, kode) => {
    let Offices = await findOriginAll(id);
    if (Offices.length < 1) {
        return {status:false, msg:"No data office, please insert first"}
    }

    // define schema data to gelib 
    let officers = [];
    for (let index = 0; index < Offices.length; index++) {        
        officers.push(
            {
                office:Offices[index].office,
                nama_pengirim:Offices[index].nama_pengirim,
                tlpn:Offices[index].tlpn,
                email:Offices[index].email,
                alamat:Offices[index].nama_pengirim,
                provinsi:Offices[index].master_area.provinsi,
                kota:Offices[index].master_area.kota,
                kecamatan:Offices[index].master_area.kecamatan,
                kelurahan:Offices[index].master_area.kelurahan,
                kodepos:Offices[index].master_area.kodepos,
                latitude:Offices[index].master_area.lat,
                longitude:Offices[index].master_area.long
            }
        )
    }

    let customer = await findDestination(id, kode)
    if (!customer) {
        return {status:false, msg:"Data customer not found"}
    }

    let receiver = {
        kode:customer.kode,
        nama_penerima:customer.nama_penerima,
        tlpn:customer.tlpn,
        email:customer.email,
        alamat:customer.alamat,

        provinsi:customer.master_area.provinsi,
        kota:customer.master_area.kota,
        kecamatan:customer.master_area.kecamatan,
        kelurahan:customer.master_area.kelurahan,
        kodepos:customer.master_area.kodepos,
        
        latitude:customer.master_area.lat,
        longitude:customer.master_area.long,
    }
    let destlat = customer.master_area.lat
    let destlng = customer.master_area.long
    

    let response = geolib.findNearest(receiver, officers);

    let dataReturn = {
        status:true,
        sender:response,
        receiver:receiver
    }
    
    return dataReturn
}

module.exports = {findNearsCord}