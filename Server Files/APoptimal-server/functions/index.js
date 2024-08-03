const functions = require('firebase-functions');
const { exec } = require('child_process');

exports.app = functions.https.onRequest((req, res) => {
  exec('python ../APoptimal-server/app.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send(error);
    }
    res.send(stdout);
  });
});
