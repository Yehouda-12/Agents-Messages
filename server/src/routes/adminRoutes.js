import express from 'express';
import { createUser, getUsers } from '../controllers/adminController.js';
import  {protect  } from '../middleware/authMiddleware.js';
import restrictToAdmin from '../middleware/adminMiddleware.js'; // Import par défaut

const router = express.Router();


router.post('/users', protect, restrictToAdmin, createUser);

router.get('/users',protect,restrictToAdmin,getUsers)


export default router;