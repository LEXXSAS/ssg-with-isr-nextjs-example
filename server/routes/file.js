import express from 'express';
import fileController from '../controllers/file-controller.js'

const router = express.Router();

router.post('/file', fileController.uploadFile);

export default router;
