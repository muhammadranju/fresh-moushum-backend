import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { ProductRoutes } from '../app/modules/product/product.route';
import { OrderRoutes } from '../app/modules/order/order.route';
import { CMSRoutes } from '../app/modules/cms/cms.route';
import { ReviewRoutes } from '../app/modules/review/review.route';

const router = express.Router();

const apiRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
  {
    path: '/cms',
    route: CMSRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
