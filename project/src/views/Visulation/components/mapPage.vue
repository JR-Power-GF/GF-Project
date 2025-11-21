<template>
  <div id="map"></div>
</template>

<script>
//http://localhost:5173/
import axios from "axios";
export default {
  name: "mapPage",
  data() {
    return {
      chinaData: {},
    };
  },
  created() {
    this.getChinaData();
  },
  methods: {
    async getChinaData() {
      try {
        const res = await axios.get("http://localhost:5173/map/china.json");
        this.chinaData = res;
        this.$myChart.map("map", this.chinaData.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#map {
  height: 10.5rem;
}
</style>
