const crypto = require('crypto');

let pass = '1234';
let pass2 = '1234';
let salt = 'my_salt';

let encrypt = crypto.createHash('sha512').update(pass + salt).digest('base64');
let encrypt2 = crypto.createHash('sha512').update(pass2 + salt).digest('base64');

console.log(encrypt);
console.log(encrypt2);