<template>
  <div class="aiChatbotDialog">
    <el-dialog
      v-model="dialogVisible"
      width="97%"
      class="ai-button-dialog"
      :close-on-click-modal="true"
      append-to-body
      :before-close="handleClose"
    >
      <el-container class="ai-dialog-container">
        <ai-folder></ai-folder>
        <el-container class="ai-container">
          <!-- <ai-folder ref="aiFolderRef"></ai-folder> -->
          <el-main width="1032px">
            <ai-chatbox @closeDialog="handleClose"></ai-chatbox>
          </el-main>
        </el-container>
      </el-container>
    </el-dialog>
    <!-- <ai-history-news ref="aiHistoryNewsDialog"></ai-history-news> -->
  </div>
</template>

<script>
import aiChatbox from "./aiChatbox.vue";
import aiFolder from "./components/Aside.vue";
export default {
  name: "AiChatbotDialog",
  components: {
    aiChatbox,
    aiFolder,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    handleClose(done) {
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss">
//挂载到body下面 需要使用全局样式 去掉scodope属性
.ai-dialog-container {
  height: 100%;
}
.el-dialog {
  border-radius: 20px;
  height: 852px;
  background-image: url("@/assets/image/aibg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.el-dialog__header {
  padding: 0px !important;
  display: none;
}
.el-dialog__body {
  padding: 0px !important;
  height: 100%;
}
.ai-container {
  height: 100%;
  width: 100%;
}
</style>
