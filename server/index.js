//合并和创建
let express = require("express");
let app = express();

//设置跨域
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  next();
});
//服务器明确告知浏览器“我允许跨域访问”，从而绕过浏览器的同源策略限制。

//引用路由文件
let oneRouter = require("./router/one");
let twoRouter = require("./router/two");
let threeRouter = require("./router/three");
let fourRouter = require("./router/four");

//使用中间件来配置路由
app.use("/one", oneRouter);
app.use("/two", twoRouter);
app.use("/three", threeRouter);
app.use("/four", fourRouter);

//监听端口
app.listen(8888, () => {
  console.log("服务器启动成功");
});

//启动node index.js
