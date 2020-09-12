const multer = require('multer');
const path = require('path');
const fs = require('fs')

const storage = multer.diskStorage({
    destination:'./uploads/filecsv/',
    filename:function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const StorreUpload = multer({
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 50 // 1MB
    },
    fileFilter:function (req, file, cb) {
        let fileType = /csv|xls|xlsx/
        let mimetype = fileType.test(file.mimetype);
        let extname = fileType.test(path.extname(file.originalname).toLowerCase())
        if (mimetype && extname) {
            return cb(null, Date.now() + '_'+file.originalname);
        }
        return cb("Error: File upload only supports the following filetypes - " + fileType);
    }
})

module.exports = StorreUpload;
