<template>
  <div>
    <h2>图表1</h2>
    <div class="chart">图表的容器</div>
  </div>
</template>

<script>
import { getOneDataApi } from "@/api/Data";
export default {
  name: "itemone",
  created() {
    this.getOneData();
    console.log("1", this);
  },
  methods: {
    async getOneData() {
      try {
        const res = await getOneDataApi();
        console.log(res);
      } catch (error) {
        // console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
