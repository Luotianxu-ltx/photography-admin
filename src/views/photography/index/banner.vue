<template>
  <div class="app-container">

    <!--查询表单-->
    <el-card class="filter-container" shadow="never">
      <div style="margin-top: 20px">
        <el-form :inline="true" class="demo-form-inline">
          <el-button type="primary" @click="add()">新增</el-button>
        </el-form>
      </div>
    </el-card>
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
      style="margin-top: 20px"
    >

      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="图片" width="100" align="center">
        <template slot-scope="scope">
          <el-popover placement="right" trigger="hover">
            <img :src="scope.row.imageUrl" style="height: 100px; width: 100px">
            <img
              slot="reference"
              :src="scope.row.imageUrl"
              :alt="scope.row.imageUrl"
              style="height: 40px; width: 40px"
            >
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="title" label="标题" width="100" />

      <el-table-column prop="imageUrl" label="图片地址" />

      <el-table-column prop="linkUrl" label="链接地址" width="160" />

      <el-table-column prop="sort" label="排序" width="50" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="update(scope.row.id)">修改</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

    <!--新增弹出框-->
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form ref="form" :rules="rules" :model="form">
        <!-- 课程封面-->
        <el-form-item label="图片">

          <el-upload
            :action="VUE_APP_BASE_API+'/aliyun/fileoss/banner'"
            list-type="picture-card"
            :auto-upload="true"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
          >
            <i slot="default" class="el-icon-plus" />
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="form.imageUrl"
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
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="链接地址" prop="linkUrl">
          <el-input v-model="form.linkUrl" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button v-if="isUpdate" type="primary" @click="updateById()">确 定</el-button>
        <el-button v-else type="primary" @click="save()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible1">
      <img width="100%" :src="form.imageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import bannerApi from '@/api/photography/banner'

export default {
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      list: null,
      listLoading: true,
      form: {},
      dialogFormVisible: false,
      dialogVisible1: false,
      isUpdate: false,
      VUE_APP_BASE_API: process.env.VUE_APP_BASE_API, // 获取端口号
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        linkUrl: [
          { required: true, message: '请输入链接地址', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = this.form.imageUrl
      this.dialogVisible1 = true
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
    // 上传成功
    handleAvatarSuccess(res, file) {
      this.form.imageUrl = res.data.url
    },
    add() {
      this.dialogFormVisible = true
      this.form = {}
      this.form.imageUrl = ''
    },
    save() {
      bannerApi.saveBanner(this.form)
        .then(response => {
          if (response.data.flag === true) {
            this.$message({
              type: 'success',
              message: '新增成功！'
            })
            this.getList()
          }
        })

      this.dialogFormVisible = false
    },
    update(id) {
      this.form = {}
      this.isUpdate = true
      bannerApi.getBanner(id)
        .then(response => {
          this.form = response.data.item
        })
      this.getList()
      this.dialogFormVisible = true
    },
    updateById() {
      bannerApi.updateBanner(this.form)
        .then(response => {
          if (response.data.flag === true) {
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
            this.getList()
          }
        })

      this.isUpdate = false
      this.dialogFormVisible = false
    },
    // 获取列表数据
    getList(page = 1) {
      this.page = page
      bannerApi.getList(this.page, this.limit)
        .then(response => {
          this.list = response.data.items // 表格数据
          this.total = response.data.total
          this.listLoading = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 删除摄影师的方法
    removeDataById(id) {
      this.$confirm('此操作将永久删除摄影师记录，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用删除方法
        bannerApi.delete(id)
          .then(response => { // 删除成功
            // 提示信息
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            // 回到列表页面
            this.getList()
          }).catch((response) => {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          })
      })
    }
  }

}
</script>

<style scoped>

</style>
