<template>
  <div class="app-container">
    <el-form label-width="120px" :rules="formRules" :model="form">
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.sex" clearable placeholder="请选择">
          <el-option :value="1" label="女" />
          <el-option :value="2" label="男" />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.age" />
      </el-form-item>
      <el-form-item label="是否禁用" width="100">
        <el-switch
          v-model="form.isDisabled"
          :active-value="1"
          :inactive-value="0"
          active-color="#ff4949"
          inactive-color="#13ce66"
        />
      </el-form-item>
      <!-- 会员头像 -->
      <el-form-item label="头像">

        <!-- 头衔缩略图 -->
        <pan-thumb :image="form.avatar" />
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
          :url="VUE_APP_BASE_API+'/aliyun/fileoss/user'"
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
import userApi from '@/api/photography/user'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      form: {
        nickname: '',
        mobile: '',
        password: '',
        sex: '',
        age: '',
        isDisabled: 0
      },
      saveBtnDisabled: false, // 保存按钮是否禁用,
      imagecropperShow: false, // 上传弹框组件是否显示
      imagecropperKey: 0, // 上传组件key的值
      VUE_APP_BASE_API: process.env.VUE_APP_BASE_API, // 获取端口号
      formRules: {
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
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
      this.form.avatar = data.url
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
      userApi.selectById(id)
        .then(response => {
          this.form = response.data.list
        })
    },
    saveOrUpdate() {
      // 判断是修改还是添加
      if (!this.form.id) {
        // 添加
        console.log(123)
        this.saveUser()
      } else {
        // 修改
        console.log(456)
        this.updateUser()
      }
    },
    // 添加会员
    saveUser() {
      userApi.register(this.form)
        .then(response => { // 添加成功
          if (response.data.flag === true) {
            // 提示信息
            this.$message({
              type: 'success',
              message: '添加成功'
            })
          }
          // 回到列表页面
          this.$router.push({ path: '/user/list' })
        }).catch((response) => {
          this.$message({
            type: 'error',
            message: '保存失败'
          })
        })
    },
    // 修改会员
    updateUser() {
      userApi.updateById(this.form)
        .then(response => { // 添加成功
          if (response.data.flag === true) {
            // 提示信息
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          }
          this.$router.push({ path: '/user/list' })
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
