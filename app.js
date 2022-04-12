/* require global */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env.' + process.env.NODE_ENV) });
const express = require('express');
const app = express();
// const axios = require('axios');
// const createError = require('http-errors');
// const { mysql, pool } = require('./modules/mysql-init');
const logger = require('./middlewares/logger-mw')
const { mw1, mw2 } = require('./middlewares/middleware');
const expressSession = require('./middlewares/session-mw');

/* require router */
const postsRouter = require('./routes/post/posts-router');
const postRouter = require('./routes/post/post-router');
const joinRouter = require('./routes/auth/join-router');
const authRouter = require('./routes/auth/auth-router');
const notFoundRouter = require('./routes/error/err404-router');
const errorRouter = require('./routes/error/err-router');

/* view init */
app.set('view engine', 'ejs');
app.set('views', './views');
app.locals.pretty = true;
app.locals.headTitle = '비상교육-nodejs';

/* middleware */
// POST(form-data) 처리를 위한 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* session */
app.use(expressSession(app));


// 로그인, 인증, 로그, 세션/쿠키, 첨부파일 - Middleware // hook, 선처리
app.use((req, res, next) => {
	req.user = { name: 'booldook', lev: 3 }
	next();
});
// app.use(mw1);
// app.use(mw2('Hello'));

/* logger */
app.use(logger('tiny', 'access-all.log'));

/* static router */
app.use('/', express.static(path.join(__dirname, 'public'))); // html, css, js, images/movie/audio
app.use('/uploads', express.static(path.join(__dirname, 'storages'))); // html, css, js, images/movie/audio

/* logger */
app.use(logger());


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
app.use('/join', joinRouter);
app.use('/auth', authRouter);

/* Error Router */
app.use(notFoundRouter);
app.use(errorRouter);

/* server init */
app.listen(process.env.PORT, () => console.log('Server Running : http://127.0.0.1:' + process.env.PORT));
