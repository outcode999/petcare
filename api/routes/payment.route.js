import  express  from "express";
import { deletepayment, getpayment, paymentcreate, updatePayment } from "../controllers/payment.controller.js";
import { verifyToken } from "../utils/VerfiyUser.js";


const router = express.Router();


router.post('/Pcreate',verifyToken,  paymentcreate);
router.get('/Pget/:currentuserId',verifyToken, getpayment);
router.put('/updateee/:PayId',verifyToken, updatePayment)
router.delete('/Pdelete/:paymentId', deletepayment)




export default router;