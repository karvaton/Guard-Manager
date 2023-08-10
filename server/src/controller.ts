import { Request, Response } from "express";
import service from "./service";

class Controller {
    getData(req: Request, res: Response) {
        const data = service.getData();
        res.status(200).send(data);
    }
}

export default new Controller();