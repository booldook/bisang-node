const path = require('path');
const express = require('express');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const router = express.Router();
const { alert } = require('../../modules/utils');
const { pool } = require('../../modules/mysql-init');
const loginValidator = require('../../middlewares/login-mw');

// 회원로그인창
router.get('/', (req, res, next) => {
  res.render('auth/login');
});

// 로그인처리
router.post('/', loginValidator, async (req, res, next) => {
  try {
    const { userid, userpw } = req.body;
    const { BCRYPT_SALT } = process.env;
    const sqlUser = 'SELECT userpw FROM users WHERE userid=?';
    const [rs] = await pool.execute(sqlUser, [userid]);
    if(rs.length) {
      const compare = await bcrypt.compare(userpw + BCRYPT_SALT, rs[0].userpw);
      // 세션처리
      res.json({ result: 'success' })
    }
    else {
      // 없음
      res.json({ err: 'ERR' })
    }
  } 
  catch (err) {
    next(createError(500, err));
  }
});

// 로그아웃처리
router.get('/logout', (req, res, next) => {
  res.send('로그아웃')
});

module.exports = router;