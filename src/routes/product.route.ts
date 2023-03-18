import { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware';
import productController from '../controllers/product.controller';
import multerMiddleware from '../middleware/multer.middleware';

const productRouter = Router();

productRouter.post('/', authMiddleware, multerMiddleware, productController.create);
productRouter.get('/', authMiddleware, productController.getAll);
productRouter.get('/:id', authMiddleware, productController.getById);
productRouter.patch('/:id', authMiddleware, multerMiddleware, productController.updateById);
productRouter.delete('/:id', authMiddleware, productController.deleteById);

export default productRouter;
