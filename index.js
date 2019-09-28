const { app, BrowserWindow } = require("electron");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 750,
    webPreferences: {
      nodeIntegration: true
    },
    minHeight: 750,
    minWidth: 1000,
    resizable: false
  });
  win.loadFile("index.html");
  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
