/* 
semantic ULR
[GET]    /posts, /posts/1(page)  - 게시글 리스트
[GET]    /post                   - 게시글 등록
[GET]    /post/1                 - 게시글 상세
[GET]    /post/1/update          - 게시글 수정
[POST]   /post                   - 게시글 신규 저장
[POST]   /post/1                 - 게시글 수정 저장
[DELETE] /post/1                 - 게시글 삭제
*/

const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const { pool } = require('../../modules/mysql-init');
const { isAdmin } = require('../../middlewares/auth-mw');


router.get('/', isAdmin, async (req, res, next) => {
  try {
    // const sql = 'INSERT INTO post SET title=?, content=?, writer=?, wdate=?';
    const sql = 'INSERT INTO post (title, content, writer, wdate) values (?, ?, ?, ?)';
    const values = ['홍길동전', '아버지를 아버지라...', '길동이', new Date()];
    const rs = await pool.execute(sql, values);
    res.json(rs)
  }
  catch(err) {
    next(createError(500, err))
  }
})

router.get('/:idx', (req, res, next) => {
  res.send('게시글상세');
})

router.get('/:idx/update', (req, res, next) => {
  res.send('게시글수정');
})

router.post('/', (req, res, next) => {
  res.send('게시글신규저장');
})

router.put('/:idx', (req, res, next) => {
  res.send('게시글수정저장');
})

router.delete('/:idx', (req, res, next) => {
  res.send('게시글삭제');
})

module.exports = router;