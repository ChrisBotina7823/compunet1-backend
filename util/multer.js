import multer from 'multer';
import fs from 'fs';
import path from 'path';

const dir = 'uploads';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      const dir = './uploads';
      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Agrega la extensión del archivo
  }
});


const upload = multer({ storage: storage });
export { upload };