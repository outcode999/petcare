import  express  from "express";
import { Itemcreate, Itemget, deleteitem, updateItems } from "../controllers/Item.controller.js";
import { verifyToken } from "../utils/VerfiyUser.js";
import { verifyinvntary } from "../utils/verifyinvntary.js";

const router = express.Router();

router.post('/Itemcreate',verifyToken,verifyinvntary,  Itemcreate);
router.get('/Itemget', Itemget);
router.delete('/Idelete/:itmeId',verifyToken,verifyinvntary, deleteitem);
router.put('/updatepet/:ItemId',verifyToken,verifyinvntary, updateItems);

export default router;