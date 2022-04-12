const path = require('path');
const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const { alert } = require('../../modules/utils');
const { pool } = require('../../modules/mysql-init');

// 회원로그인창
router.get('/', (req, res, next) => {
  res.send('로그인창')
});

// 로그인처리
router.post('/', (req, res, next) => {
  res.send('로그인 처리')
});

// 로그아웃처리
router.get('/logout', (req, res, next) => {
  res.send('로그아웃')
});

module.exports = router;