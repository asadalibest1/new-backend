import express from 'express';
import { Payment } from '../Model/payment';
import { PaymentsuccessController, subscription_ActiveController } from '../Controllers/payment';

const router = express.Router();

router.post('/checkout', Payment);
router.post('/webhook', PaymentsuccessController);
router.get('/active', subscription_ActiveController);


export default router; 