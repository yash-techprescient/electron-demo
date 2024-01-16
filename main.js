const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const axios = require("axios");
const nodeConsole = require("console");
// import fetch from "electron-fetch";
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("index.html");

  const loadingWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  loadingWindow.loadFile("loading.html");
  ipcMain.on("fetch-data", async (event, args) => {
    try {
      const response = await axios.get(
        "https://api.github.com/search/repositories?q=language:python&sort=stars&per_page=100"
      );
      loadingWindow.hide();
      mainWindow.show();
      event.reply("fetch-data-response", response.data);
    } catch (error) {
      console.error(error);
    }
  });
};

if (require("electron-squirrel-startup")) app.quit();
app.whenReady().then(() => {
  createWindow();
});
