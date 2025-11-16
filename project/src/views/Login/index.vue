<template>
  <div class="app_login">
    <el-button class="ai_start" type="primary" @click="openAiChatbotDialog"
      >AI聊天窗口</el-button
    >
    <AiChatbotDialog ref="aiChatbotDialog" />
    <el-card class="box_card" header="高放后台管理系统" shadow="hover">
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="loginForm"
      >
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import AiChatbotDialog from "@/views/AiChat/index.vue";
export default {
  name: "Login",
  components: {
    AiChatbotDialog,
  },
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    openAiChatbotDialog() {
      this.$refs.aiChatbotDialog.dialogVisible = true;
      // 通过ref使AiChatbotDialog中的dialogVisible属性为true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("提交成功");
        } else {
          console.log("提交失败");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.app_login {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/image/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .ai_start {
    position: fixed;
    top: 20px;
    right: 20px;
  }
}
.box_card {
  width: 460px;
  height: 260px;
}
</style>
