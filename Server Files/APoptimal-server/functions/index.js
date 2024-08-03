const functions = require('firebase-functions');
const { spawn } = require('child_process');
const path = require('path');

exports.app = functions.https.onRequest((req, res) => {
    console.log("in index.js - request received");
    const app = spawn('python', [path.resolve(__dirname, '../app.py')]);

    app.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        res.write(data);
    });

    app.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    app.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        res.end();
    });
});
