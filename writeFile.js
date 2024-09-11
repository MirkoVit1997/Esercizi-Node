const fs = require('fs');

const content = 'Questo è il contenuto che verrà scritto nel file.';
const filePath = './output.txt';

fs.writeFile(filePath, content, (err) => {
  if (err) {
    console.error('Si è verificato un errore durante la scrittura del file:', err);
    return;
  }
  console.log('Il file è stato scritto con successo!');
});