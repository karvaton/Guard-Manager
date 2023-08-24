import path from "path";
import { findFileByDate, getFiles } from "./utilities";
import { readFile, readdir, writeFile } from "fs/promises";
import { getDoc, prepareData } from "./docx-generator";


const storePath = path.resolve(process.cwd(), 'store');

class Service {
    async getData(date: string) {
        if (!this.checkDate(date))
            return;

        const filename = this.getFileByDate(date);
        if (filename) {
            const filepath = path.resolve(storePath, filename);
            const buffer = await readFile(filepath);
            return buffer.toString().split('\r\n');
        };
    }
    
    async save(date: string, data: string[]) {
        if (!this.checkDate(date))
            throw Error("Invalid date");

        const filepath = path.resolve(storePath, date + '.txt');
        const text = data.join('\r\n');
        await writeFile(filepath, text, { flag: 'w', encoding: 'utf-8' });
    }
    
    async getReport(date: string) {
        const data = await this.getData(date);

        if (data) {
            const preparedData = prepareData(date, data);
            const doc = getDoc();
            doc.render(preparedData);
            const buf = doc.getZip().generate({
                type: "nodebuffer",
                compression: "DEFLATE",
            });
            return buf;
        }
    }

    async getTemplates() {
        const pathname = path.resolve(process.cwd(), "template");
        return await readdir(pathname);
    }

    private getFileByDate(date: string) {
        const filename = findFileByDate(getFiles(storePath), date);
        if (filename) {
            return path.resolve(storePath, filename);
        };
    }

    private checkDate(date: string) {
        return date.length === 8;
    }
}

export default new Service();