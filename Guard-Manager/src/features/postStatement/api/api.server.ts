import { saveAS } from "./saveAs";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export async function getData(date: string) {
    const response = await fetch(`${baseUrl}?date=${date.replaceAll('-', '')}`);
    const data: string[] = await response.json();
    return data;
}

export function save(date: string, squad: string[]) {
    fetch(`${baseUrl}?date=${date.replaceAll('-', '')}`, {
        method: 'POST',
        body: JSON.stringify(squad),
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    }).catch(err => console.log(err));
}

export async function getReport(date: string) {
    const response = await fetch(`${baseUrl}report?date=${date.replaceAll('-', '')}`);
    const blob = await response.blob();
    saveAS(blob);
}
