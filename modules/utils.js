const moment = require('moment');
const path = require('path');

const getIsoDate = dt => moment(dt).format('YYYY-MM-DD');

const allowImageExt = ['jpg', 'jpeg', 'png', 'gif']
const allowFileExt = ['xlsx', 'xls', 'txt', 'pdf', 'ppt', 'pptx'];

const STORE = 'storages';

// .JPG -> .jpg -> jpg
const getExt = fileName => path.extname(fileName).toLowerCase().replace('.', '');

const alert = (msg, loc = '/') => {
  return `
    <script>
      alert("${msg}");
      location.href = "${loc}";
    </script>`;
}

module.exports = { getIsoDate, allowFileExt, allowImageExt, STORE, getExt, alert };