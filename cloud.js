var AV = require('leanengine');

/**
 * 一个简单的云代码方法
 */
AV.Cloud.define('hello', function(request, response) {
  response.success('Hello world!');
});

AV.Cloud.define('testFunc1', function(request, response) {
 // 声明一个 TestModel 类型
  var TestModel = AV.Object.extend('TestModel');
  // 新建一个 TestModel 对象
  var testModel = new TestModel();
  var params = request.params;
  var title = params.title;
  var content = params.content;
  testModel.set('title', title);
  testModel.set('content', content);
  testModel.save().then(function (testModel) {
    // 成功保存之后，执行其他逻辑.
    console.log('objectId is ' + JSON.stringify(testModel.toJSON()));
  }, function (error) {
    // 异常处理
    console.error(error);
  });
  
})