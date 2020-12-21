const { app, BrowserWindow } = require('electron')
const ejse = require("ejs-electron")

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  ejse.data({
    imp: {
      path: "./homeView.html.ejs",
      data: {}
    }
  })
  win.loadFile("./views/mainView.html.ejs")
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
