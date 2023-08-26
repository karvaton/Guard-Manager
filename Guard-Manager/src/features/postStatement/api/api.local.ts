import { saveAS } from "./saveAs";

const ipcRenderer = (window as any).electron.ipcRenderer;

export default {
    getData: (date: string) => ipcRenderer.invoke('getData', date) as Promise<string[]>,
    save: (date: string, data: string[]) => ipcRenderer.send('save', date, data) as Promise<void>,
    getReport: async (date: string) => {
        const response: Buffer = await ipcRenderer.invoke('getReport', date);
        const blob = new Blob([response]);
        saveAS(blob);
    },
}