import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import fs from "fs";
import path from "path";
import { APP_PATH } from ".";


// Load the docx file as binary content
const content = fs.readFileSync(
    path.resolve(process.cwd(), "template", "input.docx"),
    "binary"
);

const zip = new PizZip(content);
export const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
});

const ranks = [
    "солд.",
    "ст.солд",
    "мол.с-нт",
    "с-нт",
    "ст.с-нт",
    "гол.с-нт",
    "шт.с-нт",
    "мс.с-нт",
    "мол.л-нт",
    "л-нт",
    "ст.л-нт",
    "к-н",
    "м-р"
];

function prepareDate(date: string) {
    const year = parseInt(date.substring(0, 4));
    const month = parseInt(date.substring(4, 6)) - 1;
    const day = parseInt(date.substring(6));
    return new Date(year, month, day);
}

export function prepareData(date: string, data: string[]) {
    const dateDate = prepareDate(date);
    const SD = dateDate.getDate() < 10 ? '0' + dateDate.getDate() : String(dateDate.getDate());
    const SM = dateDate.getMonth() + 1 < 10 ? '0' + (dateDate.getMonth() + 1) : String(dateDate.getMonth() + 1);
    const SY = String(dateDate.getFullYear());
    const prevDate = new Date(dateDate.getTime() - 1000*3600*24);
    const InD = prevDate.getDate() < 10 ? '0' + prevDate.getDate() : String(prevDate.getDate());
    const IM = prevDate.getMonth() + 1 < 10 ? '0' + (prevDate.getMonth() + 1) : String(prevDate.getMonth() + 1);
    const IY = String(prevDate.getFullYear());
    const nextDate = new Date(dateDate.getTime() + 1000*3600*24);
    const FD = nextDate.getDate() < 10 ? '0' + nextDate.getDate() : String(nextDate.getDate());
    const FM = nextDate.getMonth() + 1 < 10 ? '0' + (nextDate.getMonth() + 1) : String(nextDate.getMonth() + 1);
    const FY = String(nextDate.getFullYear());
    
    let AK = 22, RPK = 0, AKSU = 0;
    const guardians = data.slice(1).map(item => {
        const [rankId, name, veapon = '0'] = item.split('-');
        if (veapon === '1') {
            AK--;
            RPK++;
        } else if (veapon === '2') {
            AK--;
            AKSU++;
        }
        return `${ranks[parseInt(rankId)]} ${name}`;
    });

    const ID = data[0],
        NV = guardians[0],
        PNV = guardians[1],
        RV1 = guardians[2],
        RV2 = guardians[3],
        G11 = guardians[4],
        G12 = guardians[5],
        G13 = guardians[6],
        G21 = guardians[7],
        G22 = guardians[8],
        G23 = guardians[9],
        G31 = guardians[10],
        G32 = guardians[11],
        G33 = guardians[12],
        G41 = guardians[13],
        G42 = guardians[14],
        G43 = guardians[15],
        G51 = guardians[16],
        G52 = guardians[17],
        G53 = guardians[18],
        G61 = guardians[19],
        G62 = guardians[20],
        G63 = guardians[21];

    return {
        ID, NV, PNV, RV1, RV2, AK, RPK, AKSU,
        G11, G12, G13, G21, G22, G23, G31, G32, G33, 
        G41, G42, G43, G51, G52, G53, G61, G62, G63, 
        InD, IM, IY, SD, SM, SY, FD, FM, FY
    }
}


// Render the document (Replace {first_name} by John, {last_name} by Doe, ...)



// // buf is a nodejs Buffer, you can either write it to a
// // file or res.send it with express for example.
// fs.writeFileSync(path.resolve(__dirname, "output.docx"), buf);