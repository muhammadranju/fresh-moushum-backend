import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import fs from 'fs';

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

const uploadImage = async (file: any, folder: string) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: `fresh-moushum/${folder}`,
    });
    // Remove file from local storage after upload
    fs.unlinkSync(file.path);
    return result;
  } catch (error) {
    // Remove file from local storage even if upload fails
    if (file.path && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
    throw error;
  }
};

const deleteImage = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw error;
  }
};

export const CloudinaryHelper = {
  uploadImage,
  deleteImage,
};
