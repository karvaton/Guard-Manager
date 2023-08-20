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
            const result = await service.save(date, data);
            const readStream = new stream.PassThrough();
            
            readStream.end(result);
            res.writeHead(200, {
                "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "Content-disposition": `attachment; filename=raport.docx`,
            });
            readStream.pipe(res);
        } catch (err) {
            res.status(200).send(err);
        }
    }
}

export default new Controller();