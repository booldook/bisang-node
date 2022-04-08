const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path');

const options = {
    size: "10M", // rotate every 10 MegaBytes written
    compress: "gzip", // compress rotated files
    interval: '1d', // rotate daily
  }
  
  const globalLogger = (type, fileName) => {
    const stream = rfs.createStream(fileName, { ...options,  path: path.join(__dirname, '../', 'log')});
    return morgan(type, { stream });
  }

const routerLogger = (type, fileName) => {
  return (req, res, next) => {
    const stream = rfs.createStream(fileName, { ...options,  path: path.join(__dirname, '../', 'log')});
    req.app.use(morgan(type, { stream }));
    next();
  }
}

module.exports = { globalLogger, routerLogger }
