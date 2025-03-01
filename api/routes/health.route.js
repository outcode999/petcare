import  express  from "express";
import { Itemcreate, Itemget, deleteitem, updateItems } from "../controllers/Item.controller.js";
import { verifyToken } from "../utils/VerfiyUser.js";
import { Healthcreate, Healthget, deleteHealth, updateHealth } from "../controllers/health.controller.js";
import { verifydocter } from "../utils/Verifydocter.js";

const router = express.Router();

router.post('/Healthcreate',verifyToken,verifydocter,  Healthcreate);
router.get('/Health', Healthget);
router.delete('/health/:healthId',verifyToken,verifydocter, deleteHealth);
router.put('/updatehealth/:HealthId',verifyToken,verifydocter, updateHealth);

export default router;