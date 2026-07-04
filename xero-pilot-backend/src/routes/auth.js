import express from 'express';
import { login, callback, status } from '../controllers/authController.js';

const router = express.Router();

router.get('/xero/login', login);
router.get('/xero/callback', callback);
router.get('/xero/status', status);

export default router;
