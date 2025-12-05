const fs = require('fs');
const path = require('path');
const https = require('https');

const DATA_DIR = path.join(__dirname, '..', 'data');
const FILE_PATH = path.join(DATA_DIR, 'quran.json');
const URL = 'https://raw.githubusercontent.com/risan/quran-json/main/dist/quran.json';

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    console.log('Creating data directory...');
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

console.log(`Downloading Quran data from ${URL}...`);

https.get(URL, (res) => {
    if (res.statusCode !== 200) {
        console.error(`Failed to download data: Status Code ${res.statusCode}`);
        process.exit(1);
    }

    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
        process.stdout.write('.'); // Progress indicator
    });

    res.on('end', () => {
        console.log('\nDownload complete. Verifying JSON...');
        try {
            // Verify it's valid JSON
            const json = JSON.parse(data);
             // Basic structure check
             if (!Array.isArray(json)) {
                 throw new Error('Downloaded data is not an array');
             }
            
            fs.writeFileSync(FILE_PATH, data);
            console.log(`\nSuccess! Saved ${json.length} chapters to ${FILE_PATH}`);
            console.log('You can now build the app instantly.');
        } catch (error) {
            console.error('\nError parsing or saving JSON:', error.message);
            process.exit(1);
        }
    });

}).on('error', (err) => {
    console.error('\nError fetching data:', err.message);
    process.exit(1);
});
