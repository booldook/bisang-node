/* require global */
const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');

/* require router */
const boardRouter = require('./routes/board');

/* view init */
app.set('view engine', 'ejs');
app.set('views', './views');

/* static router */
app.use('/', express.static(path.join(__dirname, 'public')));

/* page router */
app.get('/', async (req, res, next) => {
	try {
		const userURL = 'https://jsonplaceholder.typicode.com/users';
		const { data: users } = await axios.get(userURL);
		// res.status(200).json(users);
		res.render('home', { title: 'HOME', users });

	}
	catch(err) {

	}
});

app.use('/board', boardRouter);

/* server init */
app.listen(3000, () => console.log('Server Running : http://127.0.0.1:3000'));
