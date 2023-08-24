import { saveAS } from "./saveAs";

const ipcRenderer = (window as any).electron.ipcRenderer;

export default {
    getData: (date: string) => ipcRenderer.invoke('getData', date) as Promise<string[]>,
    save: (date: string, data: string[]) => ipcRenderer.send('save', date, data) as Promise<void>,
    getReport: async (date: string, data: string[]) => {
        const response: Response = await ipcRenderer.invoke('getData', date);
        const blob = await response.blob();
        saveAS(blob);
    },
}