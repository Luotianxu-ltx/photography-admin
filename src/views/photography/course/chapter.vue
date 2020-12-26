<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>

    <el-button type="text" @click="openChapterDialog()">添加章节</el-button>

    <!--章节-->
    <ul class="chanpterList">
      <li v-for="chapter in chapterVideoList" :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button style="" type="text" @click="openVideo(chapter.id,chapter.id)">添加小节</el-button>
            <el-button style="" type="text" @click="openEditChapter(chapter.id)">编辑</el-button>
            <el-button type="text" @click="deleteChapter(chapter.id)">删除</el-button>
          </span>
        </p>
        <!-- 视频 -->
        <ul class="chanpterList videoList">
          <li v-for="video in chapter.children" :key="video.id">
            <p>
              {{ video.title }}
              <span class="acts">
                <el-button style="" type="text">编辑</el-button>
                <el-button type="text" @click="deleteVideo(video.id)">删除</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <div>
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
    </div>

    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title" />
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapter.sort" :min="0" controls-position="right" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加和修改小节表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title" />
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number v-model="video.sort" :min="0" controls-position="right" />
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.free">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <el-upload
            :on-success="handleVodUploadSuccess"
            :on-remove="handleVodRemove"
            :before-remove="beforeVodRemove"
            :on-exceed="handleUploadExceed"
            :file-list="fileList"
            :action="VUE_APP_BASE_API+'/vodservice/video/uploadAlyVideo'"
            :limit="1"
            class="upload-demo">
            <el-button size="small" type="primary">上传视频</el-button>
            <el-tooltip placement="right-end">
              <div slot="content">最大支持1G，<br>
                支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                SWF、TS、VOB、WMV、WEBM 等视频格式上传</div>
              <i class="el-icon-question"/>
            </el-tooltip>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateVideo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import chapterApi from '@/api/photography/chapter'
import videoApi from '@/api/photography/video'
export default {
  data() {
    return {
      chapterVideoList: [],
      courseId: '',
      chapter: {
        title: '',
        sort: 0
      }, // 封装章节数据
      video: {
        title: '',
        sort: 0,
        free: 0,
        videoSourceId: '',
        videoOriginalName: '' // 上传视频的名称
      },
      videoId:'',
      saveBtnDisabled: false, // 保存按钮是否禁用
      dialogChapterFormVisible: false, // 章节弹框
      dialogVideoFormVisible: false, // 小节弹框
      fileList: [], // 上传文件列表
      VUE_APP_BASE_API: process.env.VUE_APP_BASE_API // 获取端口号
    }
  },

  created() {
    // 获取路由中的id
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
      this.getChapterVideo()
    }
  },

  methods: {
    // 点击确定调用的方法
    handleVodRemove() {
      videoApi.deleteAlyvod(this.video.videoSourceId)
        .then(response => {
          this.$message({
            type: 'success',
            message: '删除视频成功'
          })
          // 文件列表清空
          this.fileList = []
          // 把video视频id和视频名称清空
          this.video.videoSourceId = ''
          this.video.videoOriginalName = ''
        })
    },
    // 点击叉调用的方法
    beforeVodRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 上传视频成功回调
    handleVodUploadSuccess(response, file, fileList) {
      // 上传文件id
      this.videoId = response.data.videoId
      console.log(this.videoId)
      // 上传文件名称
      this.video.videoOriginalName = file.name
    },
    // 视图上传多于一个视频
    handleUploadExceed(files, fileList) {
      this.$message.warning('想要重新上传视频，请先删除已上传的视频')
    },
    // ================================================================================
    // 删除小节
    deleteVideo(id) {
      this.$confirm('此操作将永久删除小节，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        videoApi.deleteVideo(id)
          .then(response => {
            this.$message({
              type: 'success',
              message: '删除小节成功！'
            })
            this.getChapterVideo()
          })
      })
    },
    // 添加小节
    addVideo() {
      // 设置课程id
      this.video.courseId = this.courseId
      this.video.videoSourceId = this.videoId
      console.log(this.video.videoSourceId)
      videoApi.addVideo(this.video)
        .then(response => {
          // 关闭弹框
          this.dialogVideoFormVisible = false
          // 提示信息
          this.$message({
            type: 'success',
            message: '添加小节成功！'
          })
          // 刷新页面
          this.getChapterVideo()
          this.video = {}
          // 文件列表清空
          this.fileList = []
          // 把video视频id和视频名称清空
          this.video.videoSourceId = ''
          this.video.videoOriginalName = ''
        })
    },
    saveOrUpdateVideo() {
      this.addVideo()
    },
    // 添加小节弹框
    openVideo(chapterId) {
      // 弹框
      this.dialogVideoFormVisible = true
      // 设置章节id
      this.video.chapterId = chapterId
    },
    // ========================================================================= //
    // 删除章节
    deleteChapter(chapter) {
      this.$confirm('此操作将永久删除章节，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        chapterApi.deleteChapter(chapter)
          .then(response => {
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            this.getChapterVideo()
          })
      })
    },
    // 修改章节弹框数据回显
    openEditChapter(chapterId) {
      this.dialogChapterFormVisible = true
      chapterApi.getChapter(chapterId)
        .then(response => {
          this.chapter = response.data.chapter
        })
    },
    // 弹出添加章节页面
    openChapterDialog() {
      this.dialogChapterFormVisible = true
      // 清空表单数据
      this.chapter.id = ''
      this.chapter.title = ''
      this.chapter.sort = 0
    },
    // 添加章节
    addChapter() {
      // 设置课程id到chapter对象中
      this.chapter.courseId = this.courseId
      chapterApi.addChapter(this.chapter)
        .then(response => {
          // 关闭弹框
          this.dialogChapterFormVisible = false
          // 提示信息
          this.$message({
            type: 'success',
            message: '添加章节成功！'
          })
          // 刷新页面
          this.getChapterVideo()
        })
    },
    // 修改章节的方法
    updateChapter() {
      chapterApi.updateChapter(this.chapter)
        .then(response => {
        // 关闭弹框
          this.dialogChapterFormVisible = false
          // 提示信息
          this.$message({
            type: 'success',
            message: '修改章节成功！'
          })
          // 刷新页面
          this.getChapterVideo()
        })
    },
    saveOrUpdate() {
      if (!this.chapter.id) {
        this.addChapter()
      } else {
        this.updateChapter()
      }
    },
    // 根据课程id查询章节和小节
    getChapterVideo() {
      chapterApi.getAllChapterVideo(this.courseId)
        .then(response => {
          this.chapterVideoList = response.data.allChapterVideo
        })
    },
    previous() {
      this.$router.push({ path: '/course/info/' + this.courseId })
    },

    next() {
      this.$router.push({ path: '/course/publish/' + this.courseId })
    }
  }
}
</script>
<style scoped>
.chanpterList{
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList li{
  position: relative;
}
.chanpterList p{
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}
.chanpterList .acts {
  float: right;
  font-size: 14px;
}

.videoList{
  padding-left: 50px;
}
.videoList p{
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}

</style>
