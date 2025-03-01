import  express  from "express";
import { Petcreate, deleteFrom, getAllform, getPets, updateFrom } from "../controllers/Form.controller.js";
import { verifyToken } from "../utils/VerfiyUser.js";
import { verifydocter } from "../utils/Verifydocter.js";

const router = express.Router();

router.post('/create',verifyToken,  Petcreate);
router.get('/getpets/:currentuserId',verifyToken, getPets);
router.get('/getAllpets',verifyToken,verifydocter, getAllform);
router.delete('/delete/:FomId',verifyToken, deleteFrom );
router.put('/updatepet/:FormId',verifyToken, updateFrom);

export default router;