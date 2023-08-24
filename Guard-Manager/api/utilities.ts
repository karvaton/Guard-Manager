import { readdirSync } from "fs";

export function getFiles(dir: string) {
    return readdirSync(dir).filter(filename => filename.match(/.txt$/));
}

export function findFileByDate(files: string[], date: string) {
    return files.find(filename => filename.indexOf(date + '.txt') === 0);
}
