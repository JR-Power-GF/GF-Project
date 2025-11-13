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
            line() {}, // 折线图
          };
        },
        set() {},
      },
    });
  },
};
