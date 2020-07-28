var Multer = require("multer");
var path = require("path");
const multipartUpload = Multer({
    storage: Multer.diskStorage({
        destination: function (req, file, next) { next(null, "./assets"); },
        filename: function (req, file, next) { next(null, Date.now() + file.originalname) }
    })
}).single('image');

module.exports = {
    multipartUpload
}