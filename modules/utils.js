const moment = require('moment');

const getIsoDate = dt => moment(dt).format('YYYY-MM-DD');

;module.exports = { getIsoDate };