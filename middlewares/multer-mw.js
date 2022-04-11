// /storages/2022/04/11/20220411-uuid.jpg
// import { v4 as uuidv4 } from 'uuid'; // ES6
const { v4: uuidv4 } = require('uuid'); // CommonJS
const path = require('path');
const fs = require('fs-extra');
const multer = require('multer');
const moment = require('moment');
const { allowFileExt, allowImageExt, STORE } = require('../modules/utils');
const mega = 1024000;

/* Storage */
const destination = async (req, file, cb) => {
  try {
    const folder = path.join(__dirname, '../', STORE, moment().format('YYYY'), moment().format('MM'), moment().format('DD'));
    await fs.ensureDir(folder)
    cb(null, folder)
  }
  catch (err) {
    cb(err)
  }
}

const filename = async (req, file, cb) => {
  try {
    const ext = path.extname(file.originalname).toLowerCase().replace('.', '') // .JPG -> .jpg -> jpg
    const filename = moment().format('YYYY-MM-DD') + '_' + uuidv4() + '.' + ext;
    cb(null, filename);
  }
  catch(err) {
    cb(err);
  }
}

const fileFilter = (req, file, cb) => {
  try {
    cb(null, true);
    // cb(null, false);
  }
  catch(err) {
    cb(err)
  }
}

const limits = mega * 5;

const storage = multer.diskStorage({ destination, filename })

module.exports =  multer({ storage, limits, fileFilter })