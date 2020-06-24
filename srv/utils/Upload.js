import { extname } from 'path';
import config from 'config';
import multer, { diskStorage } from 'multer';
import { v1 as uuidv1 } from 'uuid';

const storage = diskStorage({
  destination: config.get(`uploadDir`),
  filename(req, file, next) {
    next(null, `${uuidv1()}${extname(file.originalname)}`);
  },
});

export default multer({ storage });
