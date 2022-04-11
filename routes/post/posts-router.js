const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const moment = require('moment');

const { pool } = require('../../modules/mysql-init');
const logger = require('../../middlewares/logger-mw');
const { isUser } = require('../../middlewares/auth-mw');

router.get(['/', '/:page'], logger('common', 'access-posts.log'), isUser, async (req, res, next) => {
  try {
    const startIdx = ((Number(req.params.page) || 1) - 1) * 2;
    const sql = 'SELECT * FROM post ORDER BY idx DESC LIMIT ?, 2';
    const [rs] = await pool.execute(sql, [startIdx]);
    const posts = rs.map((v) => {
      v.wdate = moment(v.wdate).format('YYYY-MM-DD');
      return v;
    })
    // res.json(rs);
    res.render('post/list', { title: req.myName, posts  })
  }
  catch(err) {
    next(createError(500, err))
  }
})

module.exports = router;