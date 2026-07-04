import express from 'express';
import { listAutomations, runAutomation } from '../controllers/automationController.js';

const router = express.Router();

router.get('/list', listAutomations);
router.post('/run', runAutomation);

export default router;
