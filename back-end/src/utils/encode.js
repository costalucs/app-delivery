const  md5 = require('md5');
const encode = (password) => md5(password)
module.exports = { encode }