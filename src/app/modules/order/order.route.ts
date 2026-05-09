import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { OrderController } from './order.controller';

const router = express.Router();

router.post('/', OrderController.createOrder);

router.get(
  '/',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  OrderController.getAllOrders,
);

router.get(
  '/analytics',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  OrderController.getAnalytics,
);

router.get(
  '/:id',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  OrderController.getSingleOrder,
);

router.patch(
  '/:id/status',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  OrderController.updateOrderStatus,
);

export const OrderRoutes = router;
