import express from 'express';
import {
  analyseReceiptController,
  summariseInvoiceController,
  automationSuggestionsController,
} from '../controllers/aiController.js';

const router = express.Router();

router.post('/analyse-receipt', analyseReceiptController);
router.post('/summarise-invoice', summariseInvoiceController);
router.post('/automation-suggestions', automationSuggestionsController);

export default router;
