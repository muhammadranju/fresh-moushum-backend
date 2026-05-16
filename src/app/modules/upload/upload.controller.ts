import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CloudinaryHelper } from '../../../helpers/cloudinaryHelper';
import { extractPublicId } from '../../../util/extractPublicId';
import ApiError from '../../../errors/ApiError';

const uploadImage = catchAsync(async (req: Request, res: Response) => {
  const file = (req as any).files?.image?.[0];
  const { folder, oldUrl } = req.body;

  if (!file) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Please upload an image');
  }

  if (!folder) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Please specify a folder');
  }

  // Upload to Cloudinary
  const result = await CloudinaryHelper.uploadImage(file, folder);

  // If oldUrl exists, delete the old image
  if (oldUrl) {
    const publicId = extractPublicId(oldUrl);
    if (publicId) {
      await CloudinaryHelper.deleteImage(publicId);
    }
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Image uploaded successfully',
    data: {
      url: result.secure_url,
    },
  });
});

export const UploadController = {
  uploadImage,
};
