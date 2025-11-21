<template>
  <el-aside>
    <div class="ai-logo">
      <img :src="url" alt="logo" />
      <span> 高放的AI助理 </span>
    </div>
    <div class="folder-footer">
      <div class="footer-btn">
        <img :src="xurl" style="margin-right: 12px" />
        新建对话
      </div>
      <div class="footer-btn">
        <img :src="lurl" style="margin-right: 12px" />
        历史会话
      </div>
    </div>
  </el-aside>
</template>

<script>
import xurl from "@/assets/image/ai_expand_add.png";
import lurl from "@/assets/image/ai_expand_history.png";
import url from "@/assets/image/ai_logo.png";
export default {
  name: "AiFolder",
  data() {
    return {
      url,
      xurl,
      lurl,
    };
  },
  methods: {
    // handleFooter(type) {
    //   if (type === "new") {
    //     this.$router.push("/aiChat");
    //   } else if (type === "history") {
    //     this.$router.push("/aiChat/history");
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
.el-aside {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-right: 1px solid #e4e7ed;
}
.ai-logo {
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
}
.ai-logo img {
  width: 100px;
  height: 100px;
}
.folder-footer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px 0px;
  align-items: center;
  margin-top: auto; // 这会使内容推到底部
  .footer-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 18px;
    color: #186df5;
    line-height: 48px;
    width: 182px;
    height: 48px;
    //background: linear-gradient( 133deg, #F4F0FE 0%, #EFF6FE 100%);
    background: linear-gradient(133deg, #f4f0fe 0%, #eff6fe 100%), #d6e4ff;
    border: 1px solid #d6e4ff;
    border-radius: 99px;
    margin-bottom: 16px;
    cursor: pointer;
  }
}
</style>
