const fs = require('fs');
const path = require('path');

const directoryPath = 'screenshots/App_tests/';
const oldPattern = /^actual.*\.png$/;
const newFileName = 'base.png';

function traverseDirectory(dirPath) {
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.error(`Unable to read directory: ${err.message}`);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(dirPath, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error(`Unable to get stats for file: ${err.message}`);
                    return;
                }

                if (stats.isDirectory()) {
                    traverseDirectory(filePath); // Recursively traverse directories
                } else if (stats.isFile() && oldPattern.test(file)) {
                    const newFilePath = path.join(dirPath, newFileName);
                    fs.rename(filePath, newFilePath, (err) => {
                        if (err) {
                            console.error(`Unable to rename file: ${err.message}`);
                        } else {
                            console.log(`Renamed ${file} to ${newFileName}`);
                        }
                    });
                }
            });
        });
    });
}

// Start traversing from the root directory
traverseDirectory(directoryPath);
