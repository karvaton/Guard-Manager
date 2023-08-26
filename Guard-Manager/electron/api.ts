import { ipcMain } from "electron";
import service from '../server/src/service';


ipcMain.handle('getData', (event, date) => service.getData(date));
ipcMain.on('save', (event, date, data) => service.save(date, data));
ipcMain.handle('getReport', (event, date) => service.getReport(date));
