const path = require('path');
const crypto = require('crypto');

const GridFsStorage = require('multer-gridfs-storage');
const mongoURI = 'mongodb+srv://score-keep:Q6apwhnJp3IrzhkN@redesignforme-9mmku.azure.mongodb.net/book-a-cook';


//create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if(err){
                    return reject;
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

module.exports = storage;