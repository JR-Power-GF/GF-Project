<template>
  <div class="container">
    <header>
      <h1>大屏可视化</h1>
    </header>
    <div class="content">
      <section class="itemleft">
        <itemPage>
          <itemOne></itemOne>
        </itemPage>
        <itemPage>
          <itemTwo></itemTwo>
        </itemPage>
      </section>
      <section class="itemcenter">
        <h2>地图展示</h2>
      </section>
      <section class="itemright">
        <itemPage>
          <itemThree></itemThree>
        </itemPage>
        <itemPage>
          <itemFour></itemFour>
        </itemPage>
      </section>
    </div>
  </div>
</template>

<script>
import itemPage from "./components/itemPage.vue";
import itemOne from "./components/itemOne.vue";
import itemTwo from "./components/itemTwo.vue";
import itemThree from "./components/itemThree.vue";
import itemFour from "./components/itemFour.vue";
export default {
  name: "Visulation",
  data() {
    return {};
  },
  components: {
    itemPage,
    itemOne,
    itemTwo,
    itemThree,
    itemFour,
  },
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

.container {
  background: url("../../assets/image/bg2.png") no-repeat top center;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
}

.content {
  min-width: 1200px;
  max-width: 2048px;
  margin: 0 auto;
  // background-color: gray;
  padding: 0.125rem 0.125rem 0;
  display: flex;
  .itemleft,
  .itemright {
    flex: 3;
  }
  .itemcenter {
    flex: 5;
    height: 10.5rem;
    border: 1px solid blue;
    padding: 0.125rem;
    margin: 0.25rem;
  }
}

header {
  width: 100%;
  height: 1rem;
  background-color: rgba(0, 0, 255, 0.2);
  h1 {
    font-size: 0.375rem;
    color: #fff;
    text-align: center;
    line-height: 1rem;
  }
}
</style>
