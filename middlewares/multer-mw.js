// /storages/2022/04/11/20220411-uuid.jpg
// import { v4 as uuidv4 } from 'uuid'; // ES6
const { v4: uuidv4 } = require('uuid'); // CommonJS
const path = require('path');
const fs = require('fs-extra');
const multer = require('multer');