// console.log('Hello, World!');

// import { add, subtract } from './math.js';

// console.log('Addition:', add(5, 3));
// console.log('Subtraction:', subtract(5, 3));

import { promises as fs } from 'fs';

async function writeFileExample() {
  try {
    // Write text to a file
    await fs.writeFile('myfile.txt', 'Hello, World!', 'utf8');

    // Write JSON data
    const data = { name: 'John', age: 30, city: 'New York' };
    await fs.writeFile('data.json', JSON.stringify(data, null, 2), 'utf8');

    console.log('Files created successfully');
  } catch (err) {
    console.error('Error writing files:', err);
  }
}

// Read the text file
async function readFile() {
    try {
        const content = await fs.readFile('myfile.txt', 'utf8');
        console.log('File content:', content);
    } catch (err) {
        console.error('Error reading file:', err);
    } 
}

writeFileExample();
readFile();
