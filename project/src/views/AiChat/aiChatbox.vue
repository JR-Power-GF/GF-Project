<template>
  <div class="aiChatBoxSty">
    <div class="ai-chat-close" @click="closeDialog">
      <img src="@/assets/image/close.png" alt="close" />
    </div>
    <!-- <div
      class="no-data-sty"
      :style="{ height: fileList.length > 0 ? '525px' : '615px' }"
      v-if="!isUserMsg"
    > -->
    <div class="no-data-sty">
      <div class="no-data-top">
        您好！我是高放AI助理
        <br />
        基于您专属知识库的只能回答助理～
      </div>
      <div class="no-data-search">
        <div
          class="basic-search"
          v-for="(aitem, aindex) of noDataSearch"
          :key="aindex"
        >
          <img style="margin-right: 5px" :src="searchImg" />
          {{ aitem.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchImg from "@/assets/image/searchImg.png";
export default {
  name: "AiChatbox",
  emits: ["closeDialog"],
  data() {
    return {
      searchImg,
      noDataSearch: [
        {
          content: "猜你想问：高放的AI智能助手，如何帮助你？",
        },
        {
          content: "高放的AI智能助手，如何开通？",
        },
      ],
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
  },
};
</script>

<style lang="scss" scoped>
.aiChatBoxSty {
  height: 100%;
  width: 100%;
  .ai-chat-close {
    position: absolute;
    top: 9px;
    right: 13px;
    cursor: pointer;
  }
  .no-data-sty {
    height: 620px;
    .no-data-top {
      height: 66px;
      // background: linear-gradient(133deg, #f3eeff 0%, #eef6ff 100%);
      border-radius: 16px 16px 0px 0px;
      padding: 20px 0px;
      padding-left: 40px;
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 22px;
      color: #303133;
      line-height: 32px;
    }
    .no-data-search {
      display: flex;
      flex-direction: column;
      margin-top: 16px;
      .basic-search {
        border-radius: 8px;
        border: 1px solid #d6d8de;
        width: 475px;
        height: 40px;
        margin-top: 16px;
        display: flex;
        align-items: center;
        padding-left: 40px;
        cursor: pointer;
      }
    }
  }
}
</style>
