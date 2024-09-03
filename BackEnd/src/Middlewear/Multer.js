import multer from 'multer';
import path from 'path'

const diskstorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'src/Public')
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension=path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix+extension)
    }
})

export const upload=multer({
    storage:diskstorage
})

// D:\CRM\Project\BackEnd\src\Public