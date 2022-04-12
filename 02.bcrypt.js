const bcrypt = require('bcrypt');

let pass = '1234';
let salt = 'my_salt';

const setPassword = async () => {
  console.time();
  const encrypt = await bcrypt.hash(pass + salt, 5);
  console.timeEnd();
  console.log(encrypt);
}

const verifyPassword = async (_pass) => {
  const encrypt = await bcrypt.hash(pass + salt, 5);
  const compare = await bcrypt.compare(_pass + salt, encrypt) // params1: 암호, params2: hash
  console.log(compare)
}

setPassword();
verifyPassword('12345');