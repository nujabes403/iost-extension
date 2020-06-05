const crypto = require('crypto')

var data = 'hello'
// var encrypted = 'sss';
var key = '123';
 
const cipher = crypto.createCipher('aes192', key);
var encrypted = cipher.update(data, 'utf8', 'hex');
encrypted += cipher.final('hex');


const decipher = crypto.createDecipher('aes192', key);
var decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');

console.log('Plain text: ' + data);
console.log('Encrypted text: ' + encrypted);
console.log('Decrypted text: ' + decrypted);