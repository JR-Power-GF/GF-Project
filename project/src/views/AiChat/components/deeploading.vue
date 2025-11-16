<script>
export default {
  name: "Loading",
};
</script>

<template>
  <div class="com__box">
    <!-- 引入thinking的圆形旋转动画 -->
    <div class="loading-circle">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <!-- 文字内容 -->
    稍等让我思考下
    <!-- 保留原有的三个小球动画 -->
    <div class="loading">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style scoped>
.com__box {
  display: flex;
  align-items: center;
  background: linear-gradient(133deg, #f3eeff 0%, #eef6ff 100%);
  max-width: 528px; /* 扩大容器宽度以容纳新增动画 */
  height: 37px;
  border-radius: 16px;
  font-weight: bold;
  font-size: 18px;
  color: #303133;
  gap: 12px; /* 元素间间距 */
  border-bottom: #d9d9d9 1px solid;
}

/* 整合thinking的圆形旋转动画样式 */
.loading-circle {
  position: relative;
  width: 16px;
  height: 16px;
}

.loading-circle > div {
  position: absolute;
  width: 3px;
  height: 3px;
  background-color: #186df5;
  border-radius: 50%;
  animation: circle-rotate 1.2s linear infinite;
}

.loading-circle > div:nth-child(1) {
  top: 0;
  left: 7px;
  animation-delay: -1.05s;
}

.loading-circle > div:nth-child(2) {
  top: 2px;
  left: 12px;
  animation-delay: -0.9s;
}

.loading-circle > div:nth-child(3) {
  top: 7px;
  left: 14px;
  animation-delay: -0.75s;
}

.loading-circle > div:nth-child(4) {
  top: 12px;
  left: 12px;
  animation-delay: -0.6s;
}

.loading-circle > div:nth-child(5) {
  top: 14px;
  left: 7px;
  animation-delay: -0.45s;
}

.loading-circle > div:nth-child(6) {
  top: 12px;
  left: 2px;
  animation-delay: -0.3s;
}

.loading-circle > div:nth-child(7) {
  top: 7px;
  left: 0;
  animation-delay: -0.15s;
}

.loading-circle > div:nth-child(8) {
  top: 2px;
  left: 2px;
  animation-delay: 0s;
}

@keyframes circle-rotate {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(0.6);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 原有三个小球动画样式 */
.loading,
.loading > div {
  position: relative;
  box-sizing: border-box;
}

.loading {
  display: block;
  font-size: 0;
  color: #000;
}

.loading.la-dark {
  color: #333;
}

.loading > div {
  display: inline-block;
  float: none;
  background-color: #2c3e50;
  border: 0 solid #2c3e50;
}

.loading {
  width: 45px;
  height: 14px;
}

.loading > div {
  width: 8px;
  height: 8px;
  margin: 3px;
  border-radius: 100%;
  animation: ball-beat 0.7s -0.15s infinite linear;
}

.loading > div:nth-child(2n-1) {
  animation-delay: -0.5s;
}

@keyframes ball-beat {
  50% {
    opacity: 0.2;
    transform: scale(0.75);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
