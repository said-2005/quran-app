const fs = require('fs');
const path = require('path');
const https = require('https');

const DATA_DIR = path.join(__dirname, '../data/books');
const INDEX_FILE = path.join(DATA_DIR, 'index.json');

const books = [
    {
        id: 'bukhari',
        name: 'Sahih al-Bukhari',
        arabicName: 'صحيح البخاري',
        url: 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-bukhari.json',
        description: 'The most authentic book of Hadith.'
    },
    {
        id: 'muslim',
        name: 'Sahih Muslim',
        arabicName: 'صحيح مسلم',
        url: 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-muslim.json',
        description: 'One of the six major collections of Hadith.'
    },
    {
        id: 'malik',
        name: 'Al-Muwatta',
        arabicName: 'موطأ مالك',
        url: 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-malik.json',
        description: 'The first written collection of Hadith.'
    },
    {
        id: 'nawawi',
        name: "Al-Nawawi's Forty Hadith",
        arabicName: 'الأربعين النووية',
        url: 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-nawawi.json',
        description: 'A compilation of forty hadiths by Imam al-Nawawi.'
    }
];

if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

const downloadFile = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
};

const main = async () => {
    console.log('Starting book downloads...');

    for (const book of books) {
        console.log(`Downloading ${book.name}...`);
        try {
            await downloadFile(book.url, path.join(DATA_DIR, `${book.id}.json`));
            console.log(`✓ ${book.name} downloaded.`);
        } catch (error) {
            console.error(`✗ Failed to download ${book.name}:`, error.message);
        }
    }

    // Create simplified index
    const indexData = books.map(({ id, name, arabicName, description }) => ({
        id,
        name,
        arabicName,
        description
    }));

    fs.writeFileSync(INDEX_FILE, JSON.stringify(indexData, null, 2));
    console.log('✓ index.json created.');
    console.log('All operations complete.');
};

main();
