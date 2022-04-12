const path = require('path');
const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const { alert } = require('../../modules/utils');
const { pool } = require('../../modules/mysql-init');

// 회원가입
router.get('/', (req, res, next) => {
  res.render('auth/join')
});

// 회원저장
router.post('/', (req, res, next) => {
  res.send('회원저장')
});

module.exports = router;