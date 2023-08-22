import { Router } from "express";
import controller from "./controller";
const router = Router();

router.get('/', controller.getData);
router.post('/', controller.saveData);
router.get('/report', controller.getReport);
router.get('/templates', controller.getTemplates);

export default router;