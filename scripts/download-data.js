const fs = require('fs');
const path = require('path');
const https = require('https');

const dataDir = path.join(process.cwd(), 'data');

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const files = [
    {
        url: 'https://raw.githubusercontent.com/risan/quran-json/main/dist/quran.json',
        path: path.join(dataDir, 'quran.json'),
        name: 'Quran Data'
    },
    {
        url: 'https://raw.githubusercontent.com/nawafalamoudi/adhkar/main/adhkar.json',
        path: path.join(dataDir, 'adhkar.json'),
        name: 'Adhkar Data'
    }
];

const downloadFile = (file) => {
    return new Promise((resolve, reject) => {
        const fileStream = fs.createWriteStream(file.path);
        console.log(`Downloading ${file.name}...`);

        https.get(file.url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${file.name}: Status Code ${response.statusCode}`));
                return;
            }

            response.pipe(fileStream);

            fileStream.on('finish', () => {
                fileStream.close();
                console.log(`✅ ${file.name} downloaded successfully!`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(file.path, () => { }); // Delete the file async. (But we don't check result)
            reject(new Error(`Error downloading ${file.name}: ${err.message}`));
        });
    });
};

const downloadAll = async () => {
    try {
        await Promise.all(files.map(downloadFile));
        console.log('🎉 All data downloaded successfully!');
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

downloadAll();
