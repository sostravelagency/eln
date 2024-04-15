import { NextFunction, Response } from 'express';
import { CatchAsyncError } from '../middleware/catchAsyncErrors';
import cloudinary from 'cloudinary';
import ErrorHandler from '../utils/ErrorHandler';

export const uploadVideoController = CatchAsyncError(
    async (req: any, res: Response, next: NextFunction) => {
        try {
            console.log('req.files', req.files);
            const file = req.files.file;
            if (!req.files || Object.keys(req.files).length === 0)
                return res.status(400).json({ msg: 'No files were uploaded.' });

            cloudinary.v2.uploader.upload_large(
                file.tempFilePath,
                { resource_type: 'video', folder: `Courses/${req.body.title}` },
                function (error: any, result: any) {
                    console.log('url', result.url);
                    return res.status(200).json({ url: result.url });
                }
            );
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);