/* require global */
const express = require('express');
const app = express();
const path = require('path');

/* require router */
const boardRouter = require('./routes/board');

/* view init */
app.set('view engine', 'ejs');
app.set('views', './views');

/* static router */
app.use('/', express.static(path.join(__dirname, 'public')));

/* page router */
app.get('/', (req, res, next) => {
	res.render('home', { title: 'HOME' });
});

app.use('/board', boardRouter);

/* server init */
app.listen(3000, () => console.log('Server Running : http://127.0.0.1:3000'));
