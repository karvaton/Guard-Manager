import { Request, Response, Router } from "express";
import controller from "./controller";
const router = Router();

router.get('/', controller.getData);

export default router;