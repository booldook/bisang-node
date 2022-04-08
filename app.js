/* require global */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env.' + process.env.NODE_ENV) });
const { PORT } = process.env;
const express = require('express');
const app = express();
const axios = require('axios');
const createError = require('http-errors');
const { mysql, pool } = require('./modules/mysql-init');

/* require router */
const postsRouter = require('./routes/post/posts-router');
const postRouter = require('./routes/post/post-router');
const notFoundRouter = require('./routes/error/err404-router')
const errorRouter = require('./routes/error/err-router')

/* view init */
app.set('view engine', 'ejs');
app.set('views', './views');
app.locals.pretty = true;
app.locals.headTitle = '비상교육-nodejs';

/* static router */
app.use('/', express.static(path.join(__dirname, 'public')));

/* page router */
/* app.get('/', async (req, res, next) => {
	try {
		const userURL = 'https://jsonplaceholder.typicode.com/users';
		const { data: users } = await axios.get(userURL);
		// res.status(200).json(users);
		res.render('home', { title: 'HOME', users });
	}
	catch(err) {
		next(createError(500, err));
	}
}); */

app.use('/posts', postsRouter);
app.use('/post', postRouter);

/* Error Router */
app.use(notFoundRouter);
app.use(errorRouter);

/* server init */
app.listen(PORT, () => console.log('Server Running : http://127.0.0.1:' + PORT));
