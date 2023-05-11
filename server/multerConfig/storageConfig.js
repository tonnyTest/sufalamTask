const multer = require("multer");


// storage config
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./files")
    },
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now()}.${file.originalname}`
        callback(null,filename)
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // max file size 1MB = 5000000 bytes
    }
});

// filter 
const filefilter = (req,file,callback)=>{
    if(file.mimetype === "image/png" ||file.mimetype === "image/jpg" ||file.mimetype === "image/jpeg"  ){
        callback(null,true)
    }else{
        callback(null,false)
        return callback(new Error("Only .png .jpg & .jpeg formatted Allowed"))
    }
}

const upload = multer({
    storage:storage,
    fileFilter:filefilter
});

module.exports = upload;