// server.routes/upload.route.ts
import express from 'express';
import { uploadVideoController } from '../controllers/upload.controller';
const uploadRouter = express.Router();

uploadRouter.post('/upload', uploadVideoController);

export default uploadRouter;