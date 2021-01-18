<template>
  <div class="app-container">
    <el-form label-width="120px" :rules="formRules" :model="photographer">
      <el-form-item label="摄影师名称" prop="name">
        <el-input v-model="photographer.name" />
      </el-form-item>
      <el-form-item label="摄影师头衔">
        <el-select v-model="photographer.level" clearable placeholder="请选择">
          <el-option :value="1" label="签约摄影师" />
          <el-option :value="2" label="爱好者" />
        </el-select>
      </el-form-item>
      <el-form-item label="摄影师资历" prop="career">
        <el-input v-model="photographer.career" />
      </el-form-item>
      <el-form-item label="摄影师简介">
        <el-input v-model="photographer.intro" :rows="10" type="textarea" />
      </el-form-item>
      <!-- 摄影师头像 -->
      <el-form-item label="摄影师头像">

        <!-- 头衔缩略图 -->
        <pan-thumb :image="photographer.avatar" />
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
        </el-button>
        <!--
        v-show：是否显示上传组件
        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
        :url：后台上传的url地址
        @close：关闭上传组件
        @crop-upload-success：上传成功后的回调 -->
        <image-cropper
          v-show="imagecropperShow"
          :key="imagecropperKey"
          :width="300"
          :height="300"
          :url="VUE_APP_BASE_API+'/aliyun/fileoss/photographer'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />

      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import photographerApi from '@/api/photography/photographer'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      photographer: {
        name: '',
        sort: 0,
        level: 1,
        career: '',
        intro: '',
        avatar: ''
      },
      saveBtnDisabled: false, // 保存按钮是否禁用,
      imagecropperShow: false, // 上传弹框组件是否显示
      imagecropperKey: 0, // 上传组件key的值
      VUE_APP_BASE_API: process.env.VUE_APP_BASE_API, // 获取端口号
      formRules: {
        name: [
          { required: true, message: '请输入摄影师姓名', trigger: 'blur' }
        ],
        career: [
          { required: true, message: '请输入摄影师资历', trigger: 'blur' }
        ]
      }
    }
  },
  watch: { // 监听
    $route(to, form) { // 路由变化方式，路由发生变话，方法就会执行
      this.init()
    }
  },
  created() { // 页面渲染之前执行
    this.init()
  },
  methods: {
    // 上传成功的方法
    cropSuccess(data) {
      // 上传成功之后接口返回地址
      this.photographer.avatar = data.url
      this.imagecropperShow = false
    },
    // 关闭上传弹框
    close() {
      this.imagecropperShow = false
      // 上传组件初始化
      this.imagecropperKey = this.imagecropperKey + 1
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        // 从路径获取id值
        const id = this.$route.params.id
        this.getInfo(id)
      }
    },
    // 根据摄影师id查询
    getInfo(id) {
      photographerApi.getPhotographerInfo(id)
        .then(response => {
          this.photographer = response.data.photographer
        })
    },
    saveOrUpdate() {
      // 判断是修改还是添加
      if (!this.photographer.id) {
        // 添加
        this.savePhotographer()
      } else {
        // 修改
        this.updatePhotographer()
      }
    },
    // 添加摄影师
    savePhotographer() {
      photographerApi.addPhotographer(this.photographer)
        .then(response => { // 添加成功
          // 提示信息
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          // 回到列表页面
          this.$router.push({ path: '/photographer/list' })
        }).catch((response) => {
          this.$message({
            type: 'error',
            message: '保存失败'
          })
        })
    },
    // 修改摄影师
    updatePhotographer() {
      photographerApi.updatePhtotgrapher(this.photographer)
        .then(response => { // 添加成功
          // 提示信息
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.$router.push({ path: '/photographer/list' })
        }).catch((response) => {
          this.$message({
            type: 'error',
            message: '修改失败'
          })
        })
    }
  }
}
</script>
