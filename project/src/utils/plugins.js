import * as echarts from "echarts"; // 引入echarts
import { ElMessage } from "element-plus";
export const myPlugin = {
  install(app, option) {
    app.config.globalProperties.$msg = "梅西";
    app.config.globalProperties.$message = ElMessage; // 全局注册element-plus的message组件
    // this.$message.success("添加成功"); // 使用element-plus的message组件
    Object.defineProperties(app.config.globalProperties, {
      $myChart: {
        get() {
          return {
            //柱状图
            hbar(id, data) {
              var myChart = echarts.init(document.getElementById(id));
              let title = [];
              let num = [];
              data.forEach((item) => {
                title.push(item.title);
                num.push(item.num);
              });
              var option;
              option = {
                grid: {
                  top: "3%",
                  left: "3%",
                  right: "6%",
                  bottom: "13%",
                  containLabel: true,
                },
                tooltip: {
                  trigger: "axis",
                },
                xAxis: {
                  type: "value",
                  axisLabel: {
                    color: "#fff", // x轴标签文字颜色设为白色
                  },
                },
                yAxis: {
                  type: "category",
                  data: title,
                  axisLabel: {
                    color: "#fff", // x轴标签文字颜色设为白色
                  },
                },
                series: [
                  {
                    type: "bar",
                    data: num,
                    itemStyle: {
                      //表示元素在「正常状态」（非高亮、非选中）下的样式（对应的 emphasis 用于定义高亮状态样式）
                      // 左上角：0（直角）
                      // 右上角：20（20px 圆角）
                      // 右下角：20（20px 圆角）
                      // 左下角：0（直角）
                      // 效果：柱子的右侧上下角为圆角，左侧为直角。
                      borderRadius: [0, 20, 20, 0],
                      color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        {
                          offset: 0,
                          color: "#005eaa",
                        },
                        {
                          offset: 0.5,
                          color: "#339ca8",
                        },
                        {
                          offset: 1,
                          color: "#cda819",
                        },
                      ]),
                    },
                  },
                ],
              };
              option && myChart.setOption(option);
              window.addEventListener("resize", function () {
                myChart.resize();
              });
            },
            //饼状图
            pie(id, data) {
              var myChart = echarts.init(document.getElementById(id));
              myChart.setOption({
                tooltip: {
                  trigger: "item",
                  show: true,
                },
                legend: {
                  bottom: "10%", // 距离底部5%，让图例往上移
                  left: "center", // 水平居中
                },
                series: [
                  {
                    type: "pie",
                    data: data,
                    radius: [10, 100],
                    center: ["50%", "38%"],
                    roseType: "area",
                    itemStyle: {
                      borderRadius: 10,
                    },
                  },
                ],
              });
              window.addEventListener("resize", function () {
                myChart.resize();
              });
            },
            //地图
            map(id, data) {
              echarts.registerMap("china", data);
              var myChart = echarts.init(document.getElementById(id));
              myChart.setOption({
                tooltip: {
                  trigger: "item",
                },
                visualMap: {
                  type: "continuous", //连续型
                  show: true,
                  min: 100,
                  max: 5000,
                  calculable: true,
                  inRange: { color: ["#50a3ba", "#eac736", "#d94e5d"] },
                  textStyle: {
                    color: "#fff",
                  },
                  left: "left",
                  bottom: "bottom",
                },
                title: {
                  text: "城市销量",
                  left: "45%",
                  textStyle: {
                    color: "#fff",
                    fontSize: 20,
                    // textShadowBlur: 10, //阴影模糊程度
                    // textShadowColor: "#33ffff", //阴影颜色
                  },
                },
                geo: {
                  map: "china",
                  roam: true, // 允许缩放和平移
                  itemStyle: {
                    areaColor: "#0099ff", //区域颜色（默认颜色，会被 visualMap 覆盖）
                    borderColor: "#00ffff", //边框颜色
                    shadowColor: "rgba(230,130,70,0.5)", //阴影颜色
                    shadowBlur: 10, //阴影模糊程度
                  },
                  emphasis: {
                    itemStyle: {
                      areaColor: "#00ccff", // 高亮时的区域颜色
                    },
                    focus: "self", //聚焦自身,其他区域不聚焦
                  },
                },
                series: [
                  {
                    name: "城市销量",
                    type: "map",
                    map: "china",
                    geoIndex: 0, // 关联 geo 组件
                    data: [
                      { name: "北京", value: 4367 },
                      { name: "上海", value: 8675 },
                      { name: "广东", value: 187 },
                      { name: "浙江", value: 2461 },
                      { name: "四川", value: 3421 },
                    ],
                    itemStyle: {
                      borderColor: "#00ffff",
                      borderWidth: 1,
                    },
                    emphasis: {
                      itemStyle: {
                        areaColor: "#00ccff",
                      },
                    },
                  },
                  {
                    type: "scatter",
                    coordinateSystem: "geo",
                    itemStyle: {
                      color: "red",
                    },
                    data: [
                      // { name: "北京", value: [116.46, 39.92, 4367] },
                      // { name: "上海", value: [121.48, 31.22, 8675] },
                      // { name: "广州", value: [113.23, 23.16, 187] },
                      // { name: "深圳", value: [114.07, 22.62, 2461] },
                      { name: "西安", value: [108.45, 34, 3421] },
                    ],
                  },
                ],
              });
              window.addEventListener("resize", function () {
                myChart.resize();
              });
            },
          };
        },
        set() {},
      },
    });
  },
};
