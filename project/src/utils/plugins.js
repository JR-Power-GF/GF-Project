import * as echarts from "echarts"; // 引入echarts

export const myPlugin = {
  install(app, option) {
    app.config.globalProperties.$msg = "梅西";
  },
};
