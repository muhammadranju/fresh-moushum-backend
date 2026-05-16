export const extractPublicId = (url: string): string | null => {
  try {
    // Cloudinary URL format: https://res.cloudinary.com/cloud_name/image/upload/v12345678/folder/filename.ext
    const parts = url.split('/');
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex === -1) return null;

    // Everything after /vXXXXXX/ or /upload/ is part of the public_id
    // But we need to remove the version (e.g., v1622540000) and the file extension
    let publicIdParts = parts.slice(uploadIndex + 1);
    if (publicIdParts[0].startsWith('v') && !isNaN(Number(publicIdParts[0].substring(1)))) {
      publicIdParts = publicIdParts.slice(1);
    }

    const lastPart = publicIdParts[publicIdParts.length - 1];
    const dotIndex = lastPart.lastIndexOf('.');
    if (dotIndex !== -1) {
      publicIdParts[publicIdParts.length - 1] = lastPart.substring(0, dotIndex);
    }

    return publicIdParts.join('/');
  } catch (error) {
    return null;
  }
};
