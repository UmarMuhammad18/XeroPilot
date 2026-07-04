import express from 'express';
import { fetchLogs } from '../controllers/logController.js';

const router = express.Router();

router.get('/', fetchLogs);

export default router;
