//引进来 使用router路由
let express = require("express");
let router = express.Router();
let oneData = require("../mock/one.json");

//基本的get请求 第一个参数路由地址 第二个参数回调函数
router.get("/data", (req, res) => {
  res.send({ msg: "我是one的路由地址", data: oneData });
});

module.exports = router;
