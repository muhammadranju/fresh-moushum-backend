import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { CMSController } from './cms.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  CMSController.upsertCMS,
);

router.get('/', CMSController.getAllCMS);
router.get('/:key', CMSController.getCMSByKey);

export const CMSRoutes = router;
