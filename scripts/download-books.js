const fs = require('fs');
const path = require('path');
const https = require('https');

const DATA_DIR = path.join(__dirname, '../data/books');
const METADATA_FILE = path.join(DATA_DIR, 'metadata.json');

const books = [
    {
        id: 'bukhari',
        name: 'Sahih al-Bukhari',
        arabicName: 'صحيح البخاري',
        grade: 'Sahih', // Trusted
        url: 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-bukhari.json',
        description: 'The most authentic book of Hadith.'
    },
    {
        id: 'muslim',
        name: 'Sahih Muslim',
        arabicName: 'صحيح مسلم',
        grade: 'Sahih', // Trusted
        url: 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-muslim.json',
        description: 'One of the six major collections of Hadith.'
    },
    {
        id: 'malik',
        name: 'Al-Muwatta',
        arabicName: 'موطأ مالك',
        grade: 'Hasan', // Treating as Verified/Trusted for this feature context
        url: 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-malik.json',
        description: 'The first written collection of Hadith.'
    },
    {
        id: 'nawawi',
        name: "Al-Nawawi's Forty Hadith",
        arabicName: 'الأربعين النووية',
        grade: 'Sahih',
        url: 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-nawawi.json',
        description: 'A compilation of forty hadiths by Imam al-Nawawi.'
    }
];

if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

const downloadAndOptimize = (book) => {
    return new Promise((resolve, reject) => {
        https.get(book.url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${book.url}' (${response.statusCode})`));
                return;
            }

            let data = '';
            response.on('data', (chunk) => data += chunk);
            response.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    // Optimize: Keep only essential fields
                    const optimizedHadiths = json.hadiths.map(h => ({
                        id: h.hadithnumber, // Use simplified ID
                        text: h.text,
                        grades: h.grades
                    }));

                    const optimizedBook = {
                        metadata: {
                            id: book.id,
                            name: book.name,
                            arabicName: book.arabicName,
                            grade: book.grade,
                            section_details: json.metadata.section_details // Keep section info for details if needed
                        },
                        hadiths: optimizedHadiths
                    };

                    fs.writeFileSync(path.join(DATA_DIR, `${book.id}.json`), JSON.stringify(optimizedBook));
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
};

const main = async () => {
    console.log('Starting optimized book downloads...');

    const metadata = [];

    for (const book of books) {
        console.log(`Processing ${book.name}...`);
        try {
            await downloadAndOptimize(book);
            console.log(`✓ ${book.name} optimized & saved.`);

            metadata.push({
                id: book.id,
                name: book.name,
                arabicName: book.arabicName,
                grade: book.grade,
                description: book.description,
                count: 'N/A' // Could calculate this if needed
            });

        } catch (error) {
            console.error(`✗ Failed to process ${book.name}:`, error.message);
        }
    }

    fs.writeFileSync(METADATA_FILE, JSON.stringify(metadata, null, 2));
    console.log('✓ metadata.json created.');
    console.log('Done.');
};

main();
