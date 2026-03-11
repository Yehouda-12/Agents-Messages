import express from 'express';

import auth, { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';
import { createReport, getReportById, getReports, importReportsCsv } from '../controllers/reportController.js';
import { csvUpload } from '../middleware/multerCsv.js';

const router = express.Router();


router.post('/', auth, upload.single('image'),createReport)

router.get('/', protect,getReports) 
router.get('/:id',protect,getReportById)
router.post('/csv',protect,csvUpload.single('file'),importReportsCsv)

export default router;