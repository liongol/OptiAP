const functions = require('firebase-functions');
const { exec } = require('child_process');
const path = require('path');

// Define the function to handle HTTP requests and route them to the Flask app
exports.app = functions.https.onRequest((req, res) => {
  // Adjust the path to your app.py file relative to the functions directory
  console.log("before appProcess")
  const appProcess = exec(`python ${path.resolve(__dirname, '../APoptimal-server/app.py')}`);
  console.log("after appProcess")
  appProcess.stdout.on('data', (data) => {
    res.write(data);
  });

  appProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  appProcess.on('close', (code) => {
    res.end();
  });
});
