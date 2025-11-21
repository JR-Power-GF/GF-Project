<template>
  <div>
    <h2>库存统计</h2>
    <div id="chart-three"></div>
  </div>
</template>

<script>
import { getThreeDataApi } from "@/api/Data";
export default {
  name: "itemthree",
  created() {
    this.getThreeData();
  },
  methods: {
    async getThreeData() {
      try {
        const res = await getThreeDataApi();
        const data = res.data.chartData;
        console.log(data);
        this.$myChart.pie("chart-three", data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#chart-three {
  height: 4.5rem;
}
h2 {
  height: 0.6rem;
  color: #fff;
  line-height: 0.6rem;
  font-size: 0.25rem;
  text-align: center;
}
</style>
