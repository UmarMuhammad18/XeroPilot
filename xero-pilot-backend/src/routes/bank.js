import express from 'express';
import { fetchBankTransactions, matchBankTransaction } from '../controllers/bankController.js';

const router = express.Router();

router.get('/', fetchBankTransactions);
router.post('/match', matchBankTransaction);

export default router;
