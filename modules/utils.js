const moment = require('moment');

const getIsoDate = dt => moment(dt).format('YYYY-MM-DD');

const allowImageExt = ['jpg', 'jpeg', 'png', 'gif']
const allowFileExt = ['xlsx', 'xls', 'txt', 'pdf', 'ppt', 'pptx'];

const STORE = 'storages';

module.exports = { getIsoDate, allowFileExt, allowImageExt, STORE };