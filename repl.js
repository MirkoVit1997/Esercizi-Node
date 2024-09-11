/* 
COMANDI DA UTILIZZARE NEL TEMRINALE:
1 node 

2 const crypto = require('crypto');

3 console.log(Object.keys(crypto));

4 function generateRandomId(bytes = 16) {
  return crypto.randomBytes(bytes).toString('hex');
}

5 const randomId = generateRandomId();

6 console.log(randomId);
*/

