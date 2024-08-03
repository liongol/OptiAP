const functions = require('firebase-functions');
const { exec } = require('child_process');
const path = require('path');

exports.app = functions.https.onRequest((req, res) => {
  const app = exec(`python ${path.resolve(__dirname, '../app.py')}`);

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
