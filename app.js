const express = require('express');
const app = express();
const path = require('path');

const boardRouter = require('./routes/board');

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
	res.send('<h1>HOME</h1>');
});

app.use('/board', boardRouter);

app.listen(3000, () => console.log('Server Running : http://127.0.0.1:3000'));
