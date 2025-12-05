const fs = require('fs');
const path = require('path');
const https = require('https');

const DATA_DIR = path.join(__dirname, '..', 'data');
const FILE_PATH = path.join(DATA_DIR, 'quran.json');
const URL = 'https://raw.githubusercontent.com/risan/quran-json/main/dist/quran.json';

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

console.log('Fetching Quran data...');

https.get(URL, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            // Verify it's valid JSON
            JSON.parse(data);
            fs.writeFileSync(FILE_PATH, data);
            console.log('Quran downloaded successfully!');
        } catch (error) {
            console.error('Error parsing or saving JSON:', error.message);
            process.exit(1);
        }
    });

}).on('error', (err) => {
    console.error('Error fetching data:', err.message);
    process.exit(1);
});
