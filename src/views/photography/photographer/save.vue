<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="摄影师名称">
        <el-input v-model="photographer.name" />
      </el-form-item>
      <el-form-item label="摄影师排序">
        <el-input-number v-model="photographer.sort" controls-position="right" />
      </el-form-item>
      <el-form-item label="摄影师头衔">
        <el-select v-model="photographer.level" clearable placeholder="请选择">
          <el-option :value="1" label="签约摄影师" />
          <el-option :value="2" label="爱好者" />
        </el-select>
      </el-form-item>
      <el-form-item label="摄影师资历">
        <el-input v-model="photographer.career" />
      </el-form-item>
      <el-form-item label="摄影师简介">
        <el-input v-model="photographer.intro" :rows="10" type="textarea" />
      </el-form-item>

      <!-- 讲师头像：TODO -->

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import photographerApi from '@/api/photography/photographer'
export default {
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
      saveBtnDisabled: false // 保存按钮是否禁用,
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
          this.$router.push({ path: '/photographer/table' })
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
          this.$router.push({ path: '/photographer/table' })
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
