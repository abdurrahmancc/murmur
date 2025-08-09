import { Injectable, BadRequestException } from '@nestjs/common';
import cloudinary from 'src/cloudinary/cloudinary.config';
import { Readable } from 'stream';

@Injectable()
export class ImageService {
    private allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];

    async uploadImage(file: Express.Multer.File, maxSizeKB = 500): Promise<string> {
        if (!file) throw new BadRequestException('Image file is missing.');
        if (file.size > maxSizeKB * 1024)
            throw new BadRequestException(`File size cannot be more than ${maxSizeKB} KB.`);
        if (!this.allowedMimeTypes.includes(file.mimetype))
            throw new BadRequestException('Only jpeg, jpg, png, gif, bmp, webp image files are allowed.');
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'uploads' },
                (error, result) => {
                    if (error) return reject(new BadRequestException('Image upload failed.'));
                    resolve(result.secure_url);
                },
            );
            const stream = Readable.from(file.buffer);
            stream.pipe(uploadStream);
        });
    }

    async deleteImage(imageUrl: string): Promise<boolean> {
        try {
            const publicId = this.getPublicIdFromUrl(imageUrl);
            if (!publicId) return false;
            const result = await cloudinary.uploader.destroy(publicId);
            return result.result === 'ok';
        } catch {
            return false;
        }
    }

    private getPublicIdFromUrl(url: string): string | null {
        try {
            const urlObj = new URL(url);
            const pathSegments = urlObj.pathname.split('/');
            const publicIdWithExt = pathSegments.slice(5).join('/');
            const publicId = publicIdWithExt.replace(/\.[^/.]+$/, "");
            return decodeURIComponent(publicId);
        } catch {
            return null;
        }
    }

}
