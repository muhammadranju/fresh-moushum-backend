import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CMSService } from './cms.service';

const upsertCMS = catchAsync(async (req: Request, res: Response) => {
  const result = await CMSService.upsertCMS(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'CMS content updated successfully',
    data: result,
  });
});

const getCMSByKey = catchAsync(async (req: Request, res: Response) => {
  const result = await CMSService.getCMSByKey(req.params.key as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'CMS content fetched successfully',
    data: result,
  });
});

const getAllCMS = catchAsync(async (req: Request, res: Response) => {
  const result = await CMSService.getAllCMS();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All CMS content fetched successfully',
    data: result,
  });
});

export const CMSController = {
  upsertCMS,
  getCMSByKey,
  getAllCMS,
};
