import  express  from "express";
import {   Recreate, Redelete, Rget,  } from "../controllers/Reason.controller.js";
import { verifyToken } from "../utils/VerfiyUser.js";
import { verifydocter } from "../utils/Verifydocter.js";


const router = express.Router();

router.post('/Rcreate',verifyToken,  Recreate);
router.get('/Rget',verifyToken, Rget);
router.delete('/Rdelete/:reasonId',verifyToken,verifydocter,  Redelete);


export default router;