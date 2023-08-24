import { Request, Response } from "express";
import stream from "stream";
import service from "./service";

class Controller {
    async getData(req: Request, res: Response) {
        const date = req.query.date as string;
        const result = await service.getData(date);
        
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(200).json([]);
        }
    }

    async saveData(req: Request, res: Response) {
        const date = req.query.date as string;
        const data: string[] = req.body;
        
        try {
            await service.save(date, data);
            res.status(200).send();
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async getReport(req: Request, res: Response) {
        const date = req.query.date as string;
        const result = await service.getReport(date);
        const readStream = new stream.PassThrough();
        
        readStream.end(result);
        res.writeHead(200, {
            "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "Content-disposition": `attachment; filename=raport.docx`,
        });
        readStream.pipe(res);
    }

    async getTemplates(req: Request, res: Response) {
        const files = await service.getTemplates();
        res.status(200).json(files);
    }
}

export default new Controller();