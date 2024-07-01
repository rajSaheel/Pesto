const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/avatars/")
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname)
    },
})

const upload = multer({
    storage,
    limits:{fileSize:3000000},
})


module.exports = upload