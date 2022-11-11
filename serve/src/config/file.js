const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, res, cb){
        cb(null, 'public/uploads');
    },
    filename: function(req, file, cb){
        const filename = Date.now() + '-' + file.originalname;
        cb(null, filename);
    }
})

const uploadConfig = multer({storage: storage});

module.exports = uploadConfig;