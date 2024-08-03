const functions = require('firebase-functions');
const { spawn } = require('child_process');

exports.app = functions.https.onRequest((req, res) => {
  const app = spawn('python', ['../app.py']);

  console.log("somehting");
  app.stdout.on('data', (data) => {
    res.write(data);
  });

  app.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  app.on('close', (code) => {
    res.end(`child process exited with code ${code}`);
  });
});
