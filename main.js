const { app, BrowserWindow } = require('electron')
const ipcMain = require('electron').ipcMain;

app.on('ready', () => {
  let main = null
  main = new BrowserWindow({
    show: false, 
    frame: true,
  });

  searchWindow = new BrowserWindow({
    show: true, 
    frame: true,
  });
  
  main.webContents.once('dom-ready', () => {
      console.log('main loaded')
      main.show()
      main.webContents.openDevTools({mode:"undocked"})
  })

  main.loadURL('file://' + __dirname + '/index.html');
  searchWindow.loadURL('file://'+ __dirname +'/search.html');

  ipcMain.on('btnSearchClick', ()=>{
    searchWindow.on('ready-to-show', ()=>{
      searchWindow.show();
    });
  });
})