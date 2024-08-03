const functions = require('firebase-functions');
const { spawn } = require('child_process');
const path = require('path');

exports.app = functions.https.onRequest((req, res) => {
    console.log("in index.js")
  const app = spawn('python', [path.resolve(__dirname, '../APoptimal-server/app.py')]);

  app.stdout.on('data', (data) => {
    res.write(data);
  });

  app.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  app.on('close', (code) => {
    res.end();
  });
});
