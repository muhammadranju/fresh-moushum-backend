import express from 'express';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { UploadController } from './upload.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  fileUploadHandler(),
  UploadController.uploadImage,
);

export const UploadRoutes = router;
