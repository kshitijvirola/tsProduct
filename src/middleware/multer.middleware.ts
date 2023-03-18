import { RequestHandler } from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const multerMiddleware = (fieldName: string): RequestHandler => {
  return upload.single(fieldName);
};

export default multerMiddleware;
