const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 900,
        minWidth: 800,
        minHeight: 600,
        icon: path.join(__dirname, 'assets/icon.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false
        },
        backgroundColor: '#667eea',
        show: false
    });

    mainWindow.loadFile('index.html');

    // Show window when ready to avoid flickering
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // Create application menu
    const menuTemplate = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Clear All Data',
                    click: () => {
                        mainWindow.webContents.executeJavaScript(`
                            if (confirm('Are you sure you want to delete all your credit card data? This cannot be undone.')) {
                                localStorage.clear();
                                location.reload();
                            }
                        `);
                    }
                },
                { type: 'separator' },
                {
                    label: 'Exit',
                    accelerator: 'CmdOrCtrl+Q',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'selectAll' }
            ]
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'About Credit Tracker',
                    click: () => {
                        mainWindow.webContents.executeJavaScript(`
                            alert('Credit Tracker v1.0.0\\n\\nTrack your credit card utilization and keep it under 30% to improve your credit score.\\n\\nAll data is stored locally on your computer.');
                        `);
                    }
                },
                {
                    label: 'Toggle Developer Tools',
                    accelerator: 'CmdOrCtrl+Shift+I',
                    click: () => {
                        mainWindow.webContents.toggleDevTools();
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
    // On macOS, applications stay active until the user quits explicitly
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS, re-create a window when dock icon is clicked and no windows are open
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
