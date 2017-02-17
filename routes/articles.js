'use strict';
var router = require('express').Router();
var AV = require('leanengine');

var Articles = AV.Object.extend('Articles');

// 查询 Todo 列表
router.get('/', function(req, res, next) {
  var query = new AV.Query(Articles);
  query.descending('createdAt');
  query.find().then(function(results) {
    res.render('articles', {
      title: 'Articles 列表',
      articles: results
    });
  }, function(err) {
    if (err.code === 101) {
      // 该错误的信息为：{ code: 101, message: 'Class or object doesn\'t exists.' }，说明 Todo 数据表还未创建，所以返回空的 Todo 列表。
      // 具体的错误代码详见：https://leancloud.cn/docs/error_code.html
      res.render('articles', {
        title: 'Articles 列表 error',
        articles: []
      });
    } else {
      next(err);
    }
  }).catch(next);
});
// 查询 Todo 列表
router.get('/', function(req, res, next) {
  var query = new AV.Query(Articles);
  query.descending('createdAt');
  query.find().then(function(results) {
    res.json(results);
  }, function(err) {
    if (err.code === 101) {
      // 该错误的信息为：{ code: 101, message: 'Class or object doesn\'t exists.' }，说明 Todo 数据表还未创建，所以返回空的 Todo 列表。
      // 具体的错误代码详见：https://leancloud.cn/docs/error_code.html
      res.json([]);
    } else {
      next(err);
    }
  }).catch(next);
});

// 新增 Todo 项目
router.post('/', function(req, res, next) {
  var title = req.body.title;
  var content = req.body.content;
  var article = new Articles();
  article.set('title', title);
  article.set('content', content);
  article.save().then(function(todo) {
    res.redirect('/articles');
  }).catch(next);
});

module.exports = router;
