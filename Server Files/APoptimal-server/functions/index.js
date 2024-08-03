const functions = require('firebase-functions');
const { exec } = require('child_process');
const path = require('path');

// Run the setup.sh script to install Python dependencies
exec('bash functions/setup.sh', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error running setup.sh: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});

exports.app = functions.https.onRequest((req, res) => {
    console.log("in index.js - request received");
    const app = exec(`python ${path.resolve(__dirname, '../APoptimal-server/app.py')}`);

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
