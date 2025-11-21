<template>
  <div class="aiChatBoxSty">
    <div class="ai-chat-close" @click="closeDialog">
      <img :src="form.closeImgSrc" />
    </div>
    <div
      class="no-data-sty"
      :style="{ height: fileList.length > 0 ? '525px' : '615px' }"
      v-if="!isUserMsg"
    >
      <div class="no-data-top">
        您好！我是E点通AI助理
        <br />
        基于您专属知识库的只能回答助理～
      </div>
      <div class="no-data-search">
        <div
          class="basic-search"
          v-for="(aitem, aindex) of noDataSearch"
          :key="aindex"
          @click="handleNoDataSearch(aitem)"
        >
          <img style="margin-right: 5px" :src="form.searchImg" />
          {{ aitem.content }}
        </div>
      </div>
    </div>
    <ul
      class="ai-chat-box-content"
      ref="body"
      v-else
      :style="{ height: fileList.length > 0 ? '525px' : '615px' }"
    >
      <!--      <div v-for="(item, index) in messages" :key="index">-->
      <!--        <div class="chatItem" style="justify-content: flex-end" v-if="item.type == 'question'" :id="'item-' + index">-->
      <!--          <div class="chatItemContent rightClass">{{ item.content }}</div>-->
      <!--        </div>-->
      <!--        <div class="chatLeftItem" style="justify-content: flex-start" v-else-->
      <!--              :id="'item-' + index">-->
      <!--          <img style="margin-right: 5px;width:64px;height:36px;" :src="form.aiChatboxLogoImg"/>-->
      <!--          <div class="chatItemContent leftClass">{{ item.content }}</div>-->
      <!--        </div>-->
      <!--      </div>-->
      <li
        v-for="(message, index) in messages"
        class="chat-item"
        :key="index"
        :class="{
          'chat-item-right': message.role === 'user',
          'ai-item-center': message.loading,
        }"
      >
        <Loading v-if="message.loading && !message.isDeepThinking" />
        <error-tip
          v-if="message.type == 'error' && !message.loading"
        ></error-tip>
        <!-- 深度思考开启条件： AI回答、开启深度思考、收到思考内容 -->
        <div
          v-if="
            message.status === 'success' &&
            message.role === 'assistant' &&
            message.isDeepThinking &&
            message.thinkingText
          "
          class="ai-thinking-container"
        >
          <div class="ai-thinking-header">
            <!-- <div class="ai-thinking-title">
              <div class="ai-think-consider">稍等让我思考一下</div>
            </div> -->
            <div class="ai-thinking-title">
              <DeepLoading></DeepLoading>
            </div>
            <div class="ai-thinking-content">
              {{ message.thinkingText }}
            </div>
          </div>
          <div class="ai-result">
            {{ message.html }}
          </div>
        </div>
        <div
          v-if="
            message.status === 'success' &&
            message.role === 'assistant' &&
            message.html &&
            !message.isDeepThinking
          "
          class="ai-text-container"
        >
          <div class="ai-result">
            {{ message.html }}
          </div>
        </div>
        <i
          class="ai-stop"
          v-if="message.loading"
          @click="handleStopMessage(index)"
        >
          <img :src="form.stopCircleImgSrc" style="margin-right: 5px" />
          停止输出
        </i>
        <div
          class="ai-edit-input-sty"
          v-if="message.role === 'user' && message.edit"
        >
          <el-input
            class="fixed-textarea"
            v-model="message.html"
            :rows="4"
            type="textarea"
            placeholder="请输入内容"
          ></el-input>
          <div style="display: flex; justify-content: end">
            <el-button
              style="width: 80px; height: 32px !important"
              @click="handleInputEdit('cancel', index)"
              round
            >
              取消
            </el-button>
            <el-button
              style="width: 80px; height: 32px !important"
              @click="handleInputEdit('reset', index)"
              type="primary"
              round
            >
              更新
            </el-button>
          </div>
        </div>
        <span
          v-if="message.role === 'user' && !message.edit"
          class="chat-item-content"
          :class="{ 'oa-cp': message.role === 'system' }"
          @click="clickMessage(message)"
          v-html="message.html"
        ></span>
        <span
          v-if="message.role === 'assistant' && !message.loading"
          class="chat-item-left-content"
          :class="{ 'oa-cp': message.role === 'system' }"
          @click="clickMessage(message)"
          v-html="message.html"
        ></span>
        <i
          style="display: flex; justify-content: space-between"
          v-if="message.role === 'assistant' && !message.loading"
        >
          <i style="display: flex">
            <i class="ai-copy" @click="handleCopyMessage(index)">
              <img :src="form.copyImgSrc" />
            </i>
            <i class="ai-refresh" @click="handleRefreshMessage(index)">
              <img :src="form.refreshImgSrc" />
            </i>
          </i>
          <el-pagination
            style="margin-top: 5px"
            background
            :page-size="1"
            layout="prev, pager, next"
            :total="10"
          ></el-pagination>
        </i>
        <i
          v-if="message.role === 'user' && !message.loading && !message.edit"
          class="ai-edit-input"
          @click="handleEditMessage(index)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path
                d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
              />
              <path
                d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
              />
            </g>
          </svg>
        </i>
      </li>
    </ul>
    <div
      :class="[
        fileList.length > 0 ? 'ai-input-box-sty-other' : '',
        'ai-input-box-sty',
      ]"
    >
      <!--      输入框中上传文件列表-->
      <div class="wrap" v-if="fileList.length > 0">
        <div class="ai-file-sty" ref="fileContainer" @scroll="onScroll">
          <div
            class="ai-file-box"
            v-for="(item, index) of fileList"
            :key="index"
          >
            <img :src="fileLogo.get(item.type)" class="file_logo" />
            <div class="file_content">
              <div class="file_content_title">{{ item.title }}</div>
              <div class="file_content_text">
                {{ item.size }}
                <span style="margin-left: 16px">{{ item.type }}</span>
              </div>
            </div>
            <!-- 删除按钮 -->
            <span class="del-btn" @click.stop="remove(index)">✕</span>
            <!-- 添加蒙版 -->
            <div
              v-if="item.progress > 0 && item.progress < 100"
              class="file-mask"
            ></div>
            <!-- 添加进度条 -->
            <div
              v-if="item.progress && item.progress != 100"
              class="file-progress"
            >
              <div
                class="file-progress-bar"
                :style="{ width: item.progress + '%' }"
              ></div>
              <span class="file-progress-text">{{ item.progress }}%</span>
            </div>
          </div>
        </div>
        <!-- 右侧回滚按钮（可选） -->
        <div
          v-show="showRightBtn"
          class="scroll-btn right"
          @click="scrollToRight"
        >
          <i class="el-icon-arrow-right"></i>
        </div>
        <!-- 左侧回滚按钮（可选） -->
        <div v-show="showLeftBtn" class="scroll-btn left" @click="scrollToLeft">
          <i class="el-icon-arrow-left"></i>
        </div>
      </div>
      <el-input
        ref="input"
        type="textarea"
        class="fixed-textarea"
        v-model="input"
        :rows="4"
        placeholder="基于当前选中文档进行提问"
      ></el-input>
      <div class="footer-btn">
        <div style="display: flex; justify-content: end">
          <el-upload
            class="upload-demo"
            :action="actionUrl"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-progress="handleProgress"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :on-success="handleUploadSuccess"
            :file-list="fileList"
          >
            <el-tooltip
              class="item"
              effect="light"
              content="Top Left 提示文字"
              placement="top-start"
            >
              <div slot="content">
                文件类型:pdf、doc、docx、ppt、xls、csv、jpg、jpeg、png
                <br />
                单次最多上传5个文件
                <br />
                单个文件体积最大不超过10mb
              </div>
              <!-- <div class="footer-btn-sty"> -->
              <div class="footer-fjbtn-sty">
                <img :src="form.uploadImgSrc" style="margin-right: 5px" />
                上传附件
              </div>
            </el-tooltip>
          </el-upload>
          <div
            class="footer-btn-sty"
            v-for="(item, index) of footerBtnList"
            :key="index"
            @click="
              item.key === 'deepThinking' &&
                (globalDeepThinking = !globalDeepThinking)
            "
            :class="{
              'select-footer-btn':
                item.key === 'deepThinking' && globalDeepThinking,
            }"
          >
            <img
              :src="
                item.key === 'deepThinking' && globalDeepThinking
                  ? item.selectImgSrc
                  : item.imgSrc
              "
              style="margin-right: 5px"
            />
            {{ item.title }}
          </div>
          <div
            @click="handleSummaryFile"
            class="footer-btn-sty"
            v-if="
              fileList.length > 0 &&
              fileList.every((item) => item.progress == 100)
            "
          >
            文档总结
          </div>
        </div>
        <el-popover
          v-if="input.length > 2000"
          placement="top"
          width="290"
          trigger="click"
          popper-class="custom-bg"
        >
          <div style="display: flex; align-items: center; color: #f2b159">
            <i class="el-icon-warning" style="margin-right: 8px"></i>
            <span>超出最大文本字数限制：2000字，请调整</span>
          </div>
          <template #reference>
            <div :class="['send-btn', input != '' ? 'select-send-btn' : '']">
              <img
                :src="input != '' ? form.inputImgSrc : form.imgSrc"
                style="margin-right: 5px"
              />
              发送
            </div>
          </template>
        </el-popover>
        <div
          v-else
          :class="['send-btn', input != '' ? 'select-send-btn' : '']"
          @click="submit"
        >
          <img
            :src="input != '' ? form.inputImgSrc : form.imgSrc"
            style="margin-right: 5px"
          />
          发送
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import getValue from 'lodash/get'
  import { SSE } from 'sse.js'
  import Loading from '@/components/aiChatboxDialog/Loading.vue'
  import ErrorTip from '@/components/aiChatboxDialog/ErrorTip.vue'
  import DeepLoading from '@/components/aiChatboxDialog/deepLoading.vue'
  export default {
    name: 'aiChatBox',
    components: {
      ErrorTip,
      Loading,
      DeepLoading,
    },
    data() {
      return {
        selectedBtnKey: null,
        showRightBtn: false,
        showLeftBtn: false,
        fileLogo: new Map([
          ['word', require('@/assets/images/word_logo.png')],
          ['excel', require('@/assets/images/Excel_logo.png')],
          ['pdf', require('@/assets/images/PDF_logo.png')],
          ['ppt', require('@/assets/images/ppt_logo.png')],
        ]),
        actionUrl: `${window.context.portal}/system/file/v1/upload`,
        fileList: [
          {
            name: 'food.jpeg',
            type: 'word',
            title: '关于转发的还是发顺丰还是益…',
            size: '82.8KB',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            progress: 100,
          },
          {
            name: 'food2.jpeg',
            type: 'ppt',
            title: '关于转发益…',
            size: '1.2MB',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            progress: 50,
          },
          {
            name: 'food2.jpeg',
            type: 'excel',
            title: '关于转发益…',
            size: '1.02MB',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            progress: 30,
          },
          {
            name: 'food2.jpeg',
            type: 'pdf',
            title: '关于转发益…',
            size: '1.8MB',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            progress: 24,
          },
          {
            name: 'food2.jpeg',
            type: 'word',
            title: '关于转发益…',
            size: '28KB',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            progress: 67,
          },
          {
            name: 'food2.jpeg',
            type: 'pdf',
            title: '关于转发益…',
            size: '28KB',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            progress: 45,
          },
          {
            name: 'food2.jpeg',
            type: 'word',
            title: '关于转发益…',
            size: '1.8MB',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            progress: 23,
          },
          {
            name: 'food2.jpeg',
            type: 'ppt',
            title: '关于转发益…',
            size: '82.8KB',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            progress: 12,
          },
          {
            name: 'food2.jpeg',
            type: 'excel',
            title: '关于转发益…',
            size: '1.02MB',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            progress: 90,
          },
        ],
        messages: [
          {
            role: 'user',
            html: '宏天架构搭建时，如何保证系统的高可用性和容错性？',
            edit: false,
          },
          {
            role: 'assistant',
            html: '查一下系统升级需求说明，这次业务中心和移动端服务平台分别建设了多少项,dajsdlsajdas这次业务中心和移动端服务平台分别建设了多少项这次业务中心和移动端服务平台分别建设了多少项这次业务中心和移动端服务平台分别建设了多少项这次业务中心和移动端服务平台分别建设了多少项这次业务中心和移动端服务平台分别建设了多少项这次业务中心和移动端服务平台分别建设了多少项这次业务中心和移动端服务平台分别建设了多少项这次业务中心和移动端服务平台分别建设了多少项',
            loading: true,
            type: 'error',
          },
        ],
        globalDeepThinking: false,
        loading: true,
        input: '',
        form: {
          copyImgSrc: require('@/assets/images/ai_copy.svg'),
          refreshImgSrc: require('@/assets/images/ai_refresh.svg'),
          stopCircleImgSrc: require('@/assets/images/stop_circle.png'),
          imgSrc: require('@/assets/images/vector.png'),
          inputImgSrc: require('@/assets/images/vector1.png'),
          uploadImgSrc: require('@/assets/images/union.png'),
          closeImgSrc: require('@/assets/images/close.png'),
          searchImg: require('@/assets/images/searchImg.png'),
          aiChatboxLogoImg: require('@/assets/images/ai_chatbox_logo.png'),
        },
        noDataSearch: [
          {
            content: '猜你想问：E点通如何帮助你智能办公？',
          },
          {
            content: 'E点通如何开通',
          },
        ],
        footerBtnList: [
          {
            key: 'deepThinking',
            title: '深度思考',
            imgSrc: require('@/assets/images/deepThinking.png'),
            selectImgSrc: require('@/assets/images/deepThinking.png'),
          },
        ],
      }
    },
    computed: {
      isUserMsg() {
        console.log(this.messages)
        return this.messages.some((item) => item.role === 'user')
      },
    },
    mounted() {
      this.checkScroll()
      window.addEventListener('resize', this.checkScroll)
    },
    updated() {
      // 列表变化后重新检查
      this.$nextTick(this.checkScroll)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.checkScroll)
    },
    methods: {
      //生成文字功能
      generateText() {},
      //处理文字功能
      processText() {},

      /* 核心：判断是否需要按钮 */
      checkScroll() {
        const el = this.$refs.fileContainer
        if (!el) return
        const hasOverflow = el.scrollWidth > el.clientWidth
        this.showRightBtn =
          hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 5
        this.showLeftBtn = hasOverflow && el.scrollLeft > 5
      },
      /* 点击向右滚动 */
      scrollToRight() {
        const el = this.$refs.fileContainer
        el.scrollBy({ left: 200, behavior: 'smooth' })
      },
      /* 点击向左滚动 */
      scrollToLeft() {
        const el = this.$refs.fileContainer
        el.scrollBy({ left: -200, behavior: 'smooth' })
      },
      //删除按钮
      remove(index) {
        this.fileList.splice(index, 1) // 触发 Vue 响应式更新
      },
      onScroll() {
        this.checkScroll()
      },
      // 向左滑动方法
      scrollLeft() {
        const container = this.$refs.fileContainer
        if (container) {
          container.scrollBy({
            left: -100, // 每次向左滑动 100 像素
            behavior: 'smooth', // 平滑滑动效果
          })
        }
      },
      scrollBottom() {
        this.$nextTick(() => {
          const body = this.$refs.body
          body &&
            body.scrollTo({
              top: body.scrollHeight,
              behavior: 'smooth',
            })
        })
      },
      fillInput(val) {
        if (val) {
          this.input = val
          this.$refs.input.focus()
        }
      },
      //编辑
      handleEditMessage(index) {
        this.messages[index].edit = true
        // this.fillInput(this.messages[index].html)
      },
      handleInputEdit(type, i) {
        this.messages[i].edit = false
        switch (type) {
          case 'cancel':
            break
          case 'reset':
            // this.messages[i].html = true;
            break
        }
      },
      //总结文档
      handleSummaryFile() {
        this.fileList = []
        this.submit('总结文档')
      },
      //刷新
      handleRefreshMessage(index) {
        for (let i = index - 1; i >= 0; i--) {
          if (this.messages[i].role === 'user') {
            this.messages[i] && this.submit(this.messages[i].html)
            break
          }
        }
      },
      handleCopyMessage(index) {
        const messageContent = this.messages[index].html
        // 去除 HTML 标签，只复制文本内容
        const textContent = messageContent.replace(/<[^>]*>?/gm, '')
        // 使用 Clipboard API 进行复制
        navigator.clipboard
          .writeText(textContent)
          .then(() => {
            // 复制成功，给出提示，可根据实际项目替换提示方式
            this.$message.success('复制成功')
          })
          .catch((err) => {
            console.error('复制失败:', err)
            this.$message.error('复制失败，请重试')
          })
      },
      //停止输出
      handleStopMessage(index) {
        this.messages[index].loading = false
      },
      clickMessage(message) {
        if (message.role === 'system') {
          this.fillInput(message.html)
        }
      },
      handlePreview() {},
      //上传成功的回调
      handleUploadSuccess(response, file, fileList) {
        // 假设响应里包含文件的 URL，根据实际接口调整
        if (response && response.url) {
          this.fileList.push({
            name: file.name,
            url: response.url,
          })
        } else {
          console.warn('响应中未找到文件 URL，使用临时文件对象')
          this.fileList.push({
            name: file.name,
            url: file.url || URL.createObjectURL(file.raw),
          })
        }
      },
      handleProgress(event, file, fileList) {
        const index = fileList.findIndex((f) => f.uid === file.uid)
        if (index !== -1) {
          this.$set(this.fileList[index], 'progress', file.percentage)
        }
      },
      handleRemove() {
        console.log('删除文件')
      },
      handleExceed() {},
      beforeRemove() {},
      closeDialog() {
        this.$emit('closeDialog')
        this.input = ''
        // this.messages = [];
        // this.fileList = [];
      },
      handleNoDataSearch(item) {
        this.input = item.content
      },
      //发送功能按钮
      async submit(val) {
        let input = typeof val === 'string' ? val : this.input

        // 添加字数限制验证
        if (input && input.length > 2000) {
          // 这里el-popconfirm已经处理了弹窗，直接返回不发送
          return
        }

        if (input && input.trim()) {
          console.log('打印this.isLoading', this.isLoading)
          if (this.isLoading) {
            return
          }
          this.isLoading = true

          this.messages = this.messages.filter((item) => item.role !== 'system')

          this.messages.push({
            role: 'user',
            html: input,
            loading: false,
            edit: false,
          })

          const message = {
            role: 'assistant',
            html: '',
            status: 'success',
            loading: true,
            isDeepThinking: this.globalDeepThinking,
            thinkingText: '根据以往信息，以下是一些相关梳理',
            answer: '',
          }

          this.input = ''
          this.messages.push(message)
          let answerSource = ''
          this.scrollBottom()
          this.runDifyWorkflow(
            {
              query: input,
            },
            (e) => {
              if (e.data) {
                const data = JSON.parse(e.data)
                const answer = getValue(data, 'answer', '')
                const event = getValue(data, 'event', '')
                if (answer) {
                  answerSource += answer
                  message.answer = answerSource
                  message.html = window.marked(answerSource)
                  message.loading = false
                  this.scrollBottom()
                }
                if (event === 'message_end') {
                  this.isLoading = false
                  // this.saveChatHistory()
                  if (!message.html) {
                    message.html = '文本生成失败'
                  }
                }
              }
            }
          )
          // 这里处理是防止报错callback没有回调回来
          this.clearTimeout()
          this.timeoutTag = setTimeout(() => {
            this.isLoading = false
          }, 10000)
        }
      },
      runDifyWorkflow(parameters, callback) {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer app-88bk0tEH3cEekFzZ0CdQgOIm',
          },
          payload: JSON.stringify({
            ...parameters,
            inputs: {
              token: `Bearer ${this.accessToken}`,
            },
            user: 'teamWork',
            response_mode: 'streaming',
          }),
        }
        const url = `${window.context.portal}/ai-api/v1/chat-messages`
        const source = new SSE(url, options)
        source.addEventListener('message', (e) => {
          callback && callback(e)
        })
        source.stream()
      },
      clearTimeout() {
        this.timeoutTag && clearTimeout(this.timeoutTag)
      },
    },
  }
</script>

<style scoped lang="scss">
  .aiChatBoxSty {
    width: 100%;
    height: 100%;
    .ai-chat-close {
      position: absolute;
      top: 12px;
      right: 26px;
      cursor: pointer;
    }
    .no-data-sty {
      height: 620px;
      .no-data-top {
        height: 66px;
        background: linear-gradient(133deg, #f3eeff 0%, #eef6ff 100%);
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
    .ai-refresh,
    .ai-copy,
    .ai-edit-input {
      // display: none;
      // 修改为使用 opacity 控制显示隐藏
      opacity: 0;
      width: 16px;
      height: 16px;
      cursor: pointer;
      vertical-align: top;
      color: rgb(100 116 139);
      margin-top: 5px;
      // 添加过渡效果
      transition: opacity 0.2s ease;
    }
    .ai-stop {
      // display:inline-block;
      display: flex;
      line-height: 32px;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #606266;
      cursor: pointer;
      margin-top: 32px;
      width: 112px;
      height: 32px;
      background: url('~@/assets/images/stop_rectangle.png') no-repeat
        center/100%;
    }
    .chat-item {
      &:hover {
        .ai-refresh,
        .ai-copy,
        .ai-edit-input {
          // display: inline-block;
          // 鼠标悬停时显示图标
          opacity: 1;
        }
      }
    }

    .ai-refresh {
      margin-left: 8px;
    }

    .ai-edit-input {
      margin-right: 8px;
    }
    .ai-chat-box-content {
      height: 620px;
      overflow-y: auto;
      //border-radius: 5px;
      //border:1px solid #e8e8e9;
      //padding:8px 8px 0px 8px;
      ::v-deep {
        .el-pagination.is-background .btn-prev {
          background-color: #fff;
          border: 1px solid #ececec;
        }
      }
      .ai-item-center {
        display: flex;
      }
      .chat-content {
        overflow: auto;
        flex: 1;
      }
      .chat-item {
        display: flex;
        flex-direction: column;

        //overflow: auto;

        & + .chat-item {
          margin-top: 12px;
        }

        .chat-item-content {
          //background: rgba(23, 119, 244, 0.1);
          background: #186df5;
          display: inline-block;
          //border-radius: 2px;
          font-size: 18px;
          color: #ffffff;
          border-radius: 16px 16px 0px 16px;
          padding: 8px 16px;
          text-align: left;
          max-width: calc(100% - 110px);
          overflow: auto;
        }
        .ai-edit-input-sty {
          width: 560px;
          height: 94px;
          background: #186df5 #ffffff;
          border-radius: 16px 16px 16px 16px;
          border: 1px solid #186df5;
          padding: 10px 40px;

          ::v-deep {
            .el-textarea__inner {
              border: none !important;
            }
            .el-button--small.is-round {
              padding: 5px 15px;
            }
            textarea {
              height: 65px !important;
              font-size: 16px;
              padding: 5px;
              resize: none; /* 禁止手动拖拽 */
              overflow-y: auto; /* 超出出现滚动条 */
            }
          }
        }
        &.chat-item-right {
          //text-align: right;
          align-items: flex-end;
        }
      }
      .chatItem {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
      }
      .chatLeftItem {
        display: flex;
        flex-direction: column;
      }
      .chatItemContent {
        height: auto;
        padding: 6px;
      }

      .leftClass {
        margin-right: 50px;
      }

      .rightClass {
        display: flex;
        align-items: center;
        padding: 10px 40px;
        background: #186df5;
        margin-left: 258px;
        max-width: 692px;
        min-height: 34px;
        border-radius: 16px 16px 0px 16px;
        font-weight: 400;
        font-size: 18px;
        color: #ffffff;
        line-height: 32px;
        text-align: left;
      }
    }
    .ai-input-box-sty-other {
      height: 230px;
    }
    //.scroll-btn {
    //  position: absolute;
    //  right: 10px;
    //  top: 50%;
    //  transform: translateY(-50%);
    //  width: 30px;
    //  height: 30px;
    //  border-radius: 50%;
    //  background-color: rgba(0, 0, 0, 0.3);
    //  color: white;
    //  display: flex;
    //  justify-content: center;
    //  align-items: center;
    //  cursor: pointer;
    //  z-index: 1;
    //
    //  &:hover {
    //    background-color: rgba(0, 0, 0, 0.5);
    //  }
    //}
    .wrap {
      position: relative;
      display: inline-block;
      width: 100%;
    }
    /* 滚动按钮 */
    .scroll-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 28px;
      height: 28px;
      border: none;
      background: rgba(0, 0, 0, 0.45);
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      cursor: pointer;
      z-index: 2;
    }
    .scroll-btn.left {
      left: 0;
    }
    .scroll-btn.right {
      right: 0;
    }

    /* 淡入淡出 */
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.2s;
    }
    .fade-enter,
    .fade-leave-to {
      opacity: 0;
    }
    .ai-input-box-sty {
      //height:calc(100% - 640px);
      margin-top: 8px;
      border-radius: 5px;
      border: 1px solid #e8e8e9;
      padding: 8px;
      .ai-file-sty {
        display: flex;
        white-space: nowrap;
        overflow: hidden; /* 关键：隐藏横向滚动条 */
        scroll-behavior: smooth;
        // 为滑动按钮留出空间
        margin-top: 8px;
        .ai-file-box {
          position: relative;
          display: inline-block;
          min-width: 180px;
          height: 72px;
          border-radius: 12px;
          border: 1px solid rgba(144, 147, 153, 0.32);
          background: #ffffff;
          opacity: 0.99;
          margin-right: 12px;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          .file-mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.3);
            border-radius: 12px;
            z-index: 1;
          }
          .file-progress {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background-color: #e0e0e0;
            border-radius: 0 0 12px 12px;
            z-index: 2;
          }

          .file-progress-bar {
            height: 100%;
            background-color: #409eff;
            border-radius: 0 0 0 12px;
          }

          .file-progress-text {
            position: absolute;
            bottom: 8px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-size: 12px;
            z-index: 3;
          }
          .file_logo {
            width: 56px;
            height: 56px;
          }
          .file_content {
            display: flex;
            flex-direction: column;
            flex: 1;
            .file_content_title {
              font-weight: 400;
              font-size: 14px;
              color: #303133;
              line-height: 24px;
              width: 100px;
              white-space: nowrap; /* 文本不换行 */
              overflow: hidden; /* 隐藏溢出的文本 */
              text-overflow: ellipsis; /* 溢出的文本用省略号表示 */
            }
            .file_content_text {
              font-weight: 400;
              font-size: 12px;
              color: #909399;
              line-height: 24px;
            }
          }
          /*====== 3. hover 时出现 ======*/
          &:hover {
            .del-btn {
              display: inline-block;
            }
          }
        }
        .del-btn {
          display: none;
          position: absolute;
          top: 5px;
          right: 5px;
          margin-left: 8px;
          width: 16px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 50%;
          //background: #ff4d4f;
          background: rgba(0, 0, 0, 0.45);
          color: #fff;
          font-size: 12px;
          cursor: pointer;
          z-index: 99;
        }
        .del-btn:hover {
          background: #ff7875;
        }
      }
      ::v-deep {
        .el-textarea__inner {
          border: none !important;
        }
        .el-upload-list {
          display: none;
        }
      }
      .fixed-textarea {
        ::v-deep {
          textarea {
            height: 105px !important;
            //min-height: 110px !important;
            //max-height: 110px !important;
            padding: 5px;
            resize: none; /* 禁止手动拖拽 */
            overflow-y: auto; /* 超出出现滚动条 */
          }
        }
      }
      .footer-btn {
        display: flex;
        justify-content: space-between;
      }
      .footer-fjbtn-sty {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 112px;
        height: 32px;
        border-radius: 16px;
        margin-right: 12px;
        // background: linear-gradient(133deg, #f4f0fe 0%, #eff6fe 100%), #ffffff;
        background: #ffffff;
        border: 1px solid rgba(144, 147, 153, 0.56);
        font-weight: 400;
        font-size: 16px;
        color: #606266;
        line-height: 32px;
        cursor: pointer;
      }
      .footer-btn-sty {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 112px;
        height: 32px;
        border-radius: 16px;
        margin-right: 12px;
        border-image: linear-gradient(
            225deg,
            rgba(147, 115, 246, 1),
            rgba(24, 109, 245, 1)
          )
          1 1;
        background: linear-gradient(133deg, #f4f0fe 0%, #eff6fe 100%);
        border: 1px solid rgba(144, 147, 153, 0.56);
        font-weight: 400;
        font-size: 16px;
        color: #606266;
        line-height: 32px;
        cursor: pointer;
      }
      .select-footer-btn {
        color: #006ffd;
        font-weight: 500;
        font-size: 16px;
      }
      .send-btn {
        width: 80px;
        height: 32px;
        border-radius: 16px;
        line-height: 32px;
        display: flex;
        justify-content: center;
        background: rgba(144, 147, 153, 0.2);
        align-items: center;
        cursor: not-allowed;
      }
      .select-send-btn {
        cursor: pointer;
        background: #2a79f6;
        color: #fff;
      }
      .custom-popover {
        background-color: #fdf7ed !important;
      }
    }
    .ai-thinking-header {
      box-sizing: border-box;
      background: linear-gradient(133deg, #f3eeff 0%, #eef6ff 100%);
      max-width: 560px;
      border-radius: 16px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      .ai-thinking-title {
        height: 36px;
        border-bottom: #d9d9d9 1px solid;
        margin-bottom: 4px;
      }
    }
  }
</style>

<style lang="scss">
  .custom-bg {
    background-color: #fdf7ed !important;
  }
</style>
