// 引入express框架
const express = require('express');
// 创建博客管理页面路由
const other = express.Router();

other.get('/', require('./other/main'));

// 富文本编辑器上传文件
other.post('/public/uploads/content', require('./other/editor'));

module.exports = other;