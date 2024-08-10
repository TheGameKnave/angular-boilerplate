const fs = require('fs');
const path = require('path');

const directoryPath = 'screenshots/';
const newFileName = 'accepted.png';

async function traverseDirectory(dirPath) {
    try {
        const files = await fs.promises.readdir(dirPath);
        for (const file of files) {
            const filePath = path.join(dirPath, file);
            const stats = await fs.promises.stat(filePath);
            if (stats.isDirectory()) {
                await traverseDirectory(filePath); // Recursively traverse directories
            } else {
                const newFilePath = path.join(dirPath, newFileName);
                await fs.promises.rename(filePath, newFilePath);
                console.log(`Renamed ${file} to ${newFileName}`);
            }
        }
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
}

// Start traversing from the root directory
traverseDirectory(directoryPath);