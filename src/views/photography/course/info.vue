<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="提交审核" />
    </el-steps>

    <el-form label-width="120px">

      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写" />
      </el-form-item>

      <el-form-item label="课程分类">
        <el-select v-model="one" placeholder="一级分类" @change="subjectLevelOneChanged">
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />

        </el-select>

        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="二级分类" style="margin-left: 5px">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>

      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select
          v-model="courseInfo.photographerId"
          placeholder="请选择"
        >
          <el-option
            v-for="photographer in photographerList"
            :key="photographer.id"
            :label="photographer.name"
            :value="photographer.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number v-model="courseInfo.lessonNum" :min="0" controls-position="right" placeholder="请填写课程的总课时数" />
      </el-form-item>

      <!-- 课程简介-->
      <el-form-item label="课程简介">
        <tinymce v-model="courseInfo.description" :height="300" />
      </el-form-item>

      <!-- 课程封面-->
      <el-form-item label="课程封面">
        <el-upload
          :action="VUE_APP_BASE_API+'/aliyun/fileoss/course'"
          list-type="picture-card"
          :auto-upload="true"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
        >
          <i slot="default" class="el-icon-plus" />
          <div slot="file" slot-scope="{file}">
            <img
              class="el-upload-list__item-thumbnail"
              :src="courseInfo.cover"
              alt=""
            >
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in" />
              </span>
            </span>
          </div>
        </el-upload>

      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number v-model="courseInfo.price" :min="0" controls-position="right" placeholder="免费课程请设置为0元" /> 元
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="courseInfo.cover" alt="">
    </el-dialog>
  </div>
</template>
<script>
import courseApi from '@/api/photography/course'
import photographerApi from '@/api/photography/photographer'
import courseSubjectApi from '@/api/photography/courseSubject'
import Tinymce from '@/components/Tinymce'
export default {
  components: { Tinymce },
  data() {
    return {
      courseInfo: {
        title: '',
        subjectId: '',
        photographerId: '',
        lessonNum: 0,
        description: '',
        cover: '',
        price: 0
      },
      fileList: [],
      one: '',
      photographerList: [],
      subjectOneList: [], // 一级分类
      subjectTwoList: [], // 二级分类
      courseId: '',
      VUE_APP_BASE_API: process.env.VUE_APP_BASE_API, // 获取端口号
      saveBtnDisabled: false, // 保存按钮是否禁用
      dialogVisible: false
    }
  },

  created() {
    // 获取路由中的id值
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
      // 调用根据id查询课程的方法
      this.getInfo()
    } else {
      // 初始化所有摄影师
      this.initPhotographerList()
      // 初始化一级分类
      this.getOneSubject()
    }
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = this.courseInfo.cover
      this.dialogVisible = true
    },
    // 根据课程id查询信息
    getInfo() {
      courseApi.getCourseInfo(this.courseId)
        .then(response => {
          this.courseInfo = response.data.courseInfoVo
          // 查询所有分类，包含一级和二级
          courseSubjectApi.getAllListTree()
            .then(response => {
              // 获取所有一级分类
              this.subjectOneList = response.data.list
              // 遍历所有一级分类的数组
              for (var i = 0; i < this.subjectOneList.length; i++) {
                // 获取每个一级分类
                var oneSubject = this.subjectOneList[i]
                // 遍历一级分类下的所有二级分类
                for (var j = 0; j < oneSubject.children.length; j++) {
                  // 获取每个二级分类
                  var twoSubject = oneSubject.children[j]
                  if (this.courseInfo.subjectId === twoSubject.id) {
                    this.subjectTwoList = oneSubject.children
                    this.one = oneSubject.id
                  }
                }
              }
            })
          this.initPhotographerList()
        })
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      this.courseInfo.cover = res.data.url
    },
    // 上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 点击某个一级分类，触发change，显示对应二级分类
    // value就是一份分类id
    subjectLevelOneChanged(value) {
      // 遍历所有分类，包含一级和二级
      for (var i = 0; i < this.subjectOneList.length; i++) {
        // 每个一级分类
        var oneSubject = this.subjectOneList[i]
        // 判断： 所有一级分类id和点击一级分类id是否一样
        if (value === oneSubject.id) {
          // 从一级分类中获取所有二级分类
          this.subjectTwoList = oneSubject.children
          // 清空二级表单
          this.courseInfo.subjectId = ''
        }
      }
    },
    // 获取一级分类
    getOneSubject() {
      courseSubjectApi.getAllListTree()
        .then(response => {
          this.subjectOneList = response.data.list
        })
    },
    // 获取摄影师列表
    initPhotographerList() {
      photographerApi.getAllList().then(response => {
        this.photographerList = response.data.list
      })
    },
    // 添加课程
    addCourse() {
      courseApi.addCourseInfo(this.courseInfo)
        .then(response => {
          // 提示
          this.$message({
            type: 'success',
            message: '添加课程信息成功！'
          })
          this.$router.push({ path: '/course/chapter/' + response.data.courseId })
        })
    },
    // 修改课程
    updateCourse() {
      courseApi.updateCourseInfo(this.courseInfo)
        .then(response => {
          // 提示
          this.$message({
            type: 'success',
            message: '修改课程信息成功！'
          })
          this.$router.push({ path: '/course/chapter/' + this.courseId })
        })
    },
    // 判断是添加还是修改
    saveOrUpdate() {
      if (!this.courseInfo.id) {
        this.addCourse()
      } else {
        this.updateCourse()
      }
    }
  }
}
</script>
<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>
