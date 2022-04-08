const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const { pool } = require('../../modules/mysql-init');

router.get(['/', '/:page'], async (req, res, next) => {
  try {
    const sql = 'INSERT INTO post SET title=?, content=?, writer=?, wdate=?';
    const values = ['홍길동전', '아버지를 아버지라...', '길동이', new Date()];
    const rs = await pool.execute(sql, values);
    res.send('저장')
  }
  catch(err) {
    next(createError(500, err))
  }
})

module.exports = router;