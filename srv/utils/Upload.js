import config from 'config';
import multer from 'multer';

export default multer({ dest: config.get(`uploadDir`) });
