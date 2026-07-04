import express from 'express';
import { fetchContacts } from '../controllers/contactController.js';

const router = express.Router();

router.get('/', fetchContacts);

export default router;
