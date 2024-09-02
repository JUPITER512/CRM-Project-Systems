import crypto from 'crypto';
const string=crypto.randomBytes(32).toString('hex');
console.log(string)