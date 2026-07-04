import express from 'express';
import { fetchReceipts, categorizeReceipt } from '../controllers/receiptController.js';

const router = express.Router();

router.get('/', fetchReceipts);
router.post('/categorize', categorizeReceipt);

export default router;
