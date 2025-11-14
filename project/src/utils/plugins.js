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
                      normal: {
                        // 左上角：0（直角）
                        // 右上角：20（20px 圆角）
                        // 右下角：20（20px 圆角）
                        // 左下角：0（直角）
                        // 效果：柱子的右侧上下角为圆角，左侧为直角。
                        barBorderRadius: [0, 20, 20, 0],
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
                  },
                ],
              };
              option && myChart.setOption(option);
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
