const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const axios = require("axios");
const nodeConsole = require("console");
// import fetch from "electron-fetch";
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("index.html");
  //   fetch('https://api.github.com/users/github')
  // 	.then(res => res.json())
  // 	.then(json => console.log(json))
  ipcMain.on("fetch-data", async (event, args) => {
    try {
      const response = await axios.get(
        "https://api.github.com/search/repositories?q=language:python&sort=stars&per_page=100"
      );
      event.reply("fetch-data-response", response.data);
    } catch (error) {
      console.error(error);
    }
  });
  console.log(ipcRenderer);
  //   ipcRenderer.send("fetch-data", "https://example.com/api/data");
};
if (require("electron-squirrel-startup")) app.quit();
app.whenReady().then(() => {
  createWindow();
});
