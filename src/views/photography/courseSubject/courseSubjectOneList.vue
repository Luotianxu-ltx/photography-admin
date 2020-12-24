<template>
  <div class="app-container">
    <!--查询表单-->
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
      </div>

      <div style="margin-top: 20px">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-button type="primary" @click="dialogFormVisible1 = true">新增</el-button>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchObj.name" placeholder="一级分类名" />
          </el-form-item>

          <el-form-item label="添加时间">
            <el-date-picker
              v-model="searchObj.begin"
              type="datetime"
              placeholder="选择开始时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              default-time="00:00:00"
            />
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="searchObj.end"
              type="datetime"
              placeholder="选择截止时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              default-time="00:00:00"
            />
          </el-form-item>

          <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
          <el-button type="default" @click="resetData()">清空</el-button>
          <el-button type="default" @click="download()">下载</el-button>
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

      <el-table-column
        label="序号"
        width="70"
        align="center"
      >
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="名称" width="300" />

      <el-table-column prop="gmtCreate" label="添加时间" />

      <el-table-column prop="gmtModified" label="更新时间" />

      <el-table-column label="二级分类操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/courseSubject/courseSubjectTwoList/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
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
    <!--修改弹出框-->
    <el-dialog title="修改课程一级目录" :visible.sync="dialogFormVisible" @close="closeDialog">
      <el-form :rules="rules" ref="form" :model="form">
        <el-form-item label="课程一级目录名称" prop="title">
          <el-input v-model="form.title"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateById">确 定</el-button>
      </div>
    </el-dialog>
    <!--新增弹出框-->
    <el-dialog title="修改课程一级目录" :visible.sync="dialogFormVisible1" @close="closeDialog">
      <el-form :rules="rules" ref="form" :model="form">
        <el-form-item label="课程一级目录名称" prop="title">
          <el-input v-model="form.title"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import courseApi from '@/api/photography/courseSubject'

export default {
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      searchObj: {},
      list: null,
      listLoading: true,
      form: {},
      dialogFormVisible: false,
      dialogFormVisible1: false,
      rules: {
        title: [
          { required: true, message: '请输入课程一级分类', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    closeDialog() {
      this.form = {}
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    // 下载excel
    download() {
      courseApi.down()
        .then(response => {
          this.$message({
            type: 'success',
            message: '下载成功！'
          })
        }).catch((response) => {
          this.$message({
            type: 'error',
            message: '下载失败'
          })
        })
    },
    // 新增课程一级分类
    add() {
      courseApi.addCourseSubjectOne(this.form)
        .then(response => {
          this.dialogFormVisible1 = false
          this.getList()
          this.$message({
            type: 'success',
            message: '新增成功'
          })
        }).catch((response) => {
          this.$message({
            type: 'error',
            message: '新增失败'
          })
        })
    },
    // 修改课程一级分类
    updateById() {
      courseApi.updateCourseSubjectOne(this.form)
        .then(response => {
          this.dialogFormVisible = false
          this.getList()
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        }).catch((response) => {
          this.$message({
            type: 'error',
            message: '修改失败'
          })
        })
    },
    // 根据id查询一级分类名称
    update(id) {
      this.dialogFormVisible = true
      courseApi.getOneListById(id)
        .then(response => {
          this.form = response.data.courseSubjectOneList
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 获取一级分类列表
    getList(page = 1) {
      this.page = page
      courseApi.getCourseSubjectOneListPage(this.page, this.limit, this.searchObj)
        .then(response => {
          this.list = response.data.rows // 表格数据
          this.total = response.data.total
          this.listLoading = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 删除一级分类
    removeDataById(id) {
      this.$confirm('此操做将永久删除课程一级分类，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        courseApi.deleteCourseSubjectOne(id)
          .then(response => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getList()
          }).catch((response) => {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          })
      })
    },
    // 清空的方法
    resetData() {
      // 表单输入项数据清空
      this.searchObj = {}
      // 查询所有讲师数据
      this.getList()
    }
  }
}

</script>

<style scoped>

</style>
