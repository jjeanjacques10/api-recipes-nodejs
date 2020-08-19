import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import { request } from 'http';


export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
        filename: (request, file, callback) => {
            crypto.randomBytes(16, (error, result) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, result.toString('hex') + path.extname(file.originalname));
            })
        }
    })
}