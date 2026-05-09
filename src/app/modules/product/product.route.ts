import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ProductController } from './product.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  ProductController.createProduct,
);

router.get('/', ProductController.getAllProducts);

router.get('/:id', ProductController.getSingleProduct);

router.patch(
  '/reorder',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  ProductController.reorderProducts,
);

router.patch(
  '/:id',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  ProductController.updateProduct,
);

router.delete(
  '/:id',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  ProductController.deleteProduct,
);

export const ProductRoutes = router;
