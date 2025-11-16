<template>
  <div class="com__box">
    <img :src="require('@/assets/image/ai_warn.png')" />
    请求出错，请重试
  </div>
</template>

<script>
export default {
  name: "ErrorTip",
};
</script>

<style scoped lang="scss">
.com__box {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  color: #e84426;
  width: 260px;
  height: 60px;
  background: linear-gradient(133deg, #f3eeff 0%, #eef6ff 100%);
  border-radius: 16px;
}
img {
  margin-right: 14px;
}
</style>
