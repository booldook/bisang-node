const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const moment = require('moment');

const { pool } = require('../../modules/mysql-init');
const logger = require('../../middlewares/logger-mw');
const { isUser } = require('../../middlewares/auth-mw');
const pagerFn = require('../../modules/pager-init');

router.get(['/', '/:page'], logger('common', 'access-posts.log'), isUser, async (req, res, next) => {
  try {
    // const startIdx = ((Number(req.params.page) || 1) - 1) * 2;
    // const sql = 'SELECT * FROM post ORDER BY idx DESC LIMIT ?, 2';
    // const [rs] = await pool.execute(sql, [startIdx]);
    // const posts = rs.map((v) => {
    //   v.wdate = moment(v.wdate).format('YYYY-MM-DD');
    //   return v;
    // })
    // res.json(rs);
    // res.render('post/list', { title: req.myName, posts  })
    const pagerSql = 'SELECT count(idx) AS cnt FROM post';
    const [[{ cnt }]] = await pool.execute(pagerSql);
    const pager = pagerFn(req.params.page || 1, cnt, 3, 3);
    const listSql = 'SELECT * FROM post ORDER BY idx DESC LIMIT ?, ?';
    const [rs] = await pool.execute(listSql, [ pager.startIdx, pager.listCnt ]);
    const posts = rs.map(v => {
      v.wdate = moment(v.wdate).format('YYYY-MM-DD');
      return v;
    });
    res.status(200).render('post/list', { title: 'TITLE', posts, ...pager })
  }
  catch(err) {
    next(createError(500, err))
  }
})

module.exports = router;