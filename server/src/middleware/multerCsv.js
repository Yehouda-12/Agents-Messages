import multer from 'multer'

export const csvUpload = multer({
    storage:multer.memoryStorage(),
    limits: {fileSize: 2 * 1024 * 1024 }
})