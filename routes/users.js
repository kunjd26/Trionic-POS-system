import express from 'express';
import User from './../controllers/User.js';

const router = express.Router();

router.post('/', User.index);

export default router;
