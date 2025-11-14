<template>
  <div>
    <h2>销量</h2>
    <div id="chart"></div>
  </div>
</template>

<script>
import { getOneDataApi } from "@/api/Data";
export default {
  name: "itemone",
  created() {
    this.getOneData();
  },
  methods: {
    async getOneData() {
      try {
        const res = await getOneDataApi();
        const data = res.data.chartData;
        console.log(data);
        this.$myChart.hbar("chart", data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#chart {
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
