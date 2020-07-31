const mysqlQry = require('../../config/database');
const axios = require('axios')

const TablesShow = () => {
    const index = async(req, res) => {
        // console.log(req.users);
        
        let table = await mysqlQry.query('show tables');
        // res.json(table);
        res.json({status:true, status_code:200, data: {response:table[0]}})
    }

    const tester = async(req, res) => {
        try {
            // return res.json(req.body)
            let param = {
                "username":"umar",
                "password":"123456",
                "password2":"123456",
                "co_name":"Mangku Teserah",
                "co_npwp":1213455,
                "address":"jlan raya",
                "email":"email@mga.com",
                "website":"umar",
                "phone":"123456",
                "provinsi":"12456",
                "kabupaten":"email@mga.com",
                "kecamatan":"umar001",
                "kelurahan":"1234562",
                "kodepos":12344,
                "idroot":1,
                "idpaket":1
            }
    
            let foo = await axios({
                method:"POST",
                url:'http:localhost:2017/api/register',
                data:param,
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((result) => {
              return result.data  
            }).catch((err) => {
                return err.response.data
            });
    
            res.json(foo)
        } catch (error) {
            res.json(error.message)
        }
    }

    return {
        index,
        tester
    }
}

module.exports = TablesShow