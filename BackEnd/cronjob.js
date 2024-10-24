import cron from 'node-cron';
import { request } from 'node:https';

// Schedule a task to run every 46 seconds
cron.schedule('*/46 * * * * *', function() {
    console.log('Cron job running every 46 seconds');

    // Set up the request options
    const options = {
        hostname: 'crmsuite.onrender.com',
        port: 443, // Use 443 for HTTPS requests
        path: '/api/activeServer',
        method: 'GET',
    };

    // Make the HTTPS request
    const req = request(options, function(res) {
        console.log(`STATUS: ${res.statusCode}`);

        res.on('data', (d) => {
            try {
                // Parse the JSON response
                const data = JSON.parse(d);
                console.log(data);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        });
    });

    req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
    });

    req.end();
});
