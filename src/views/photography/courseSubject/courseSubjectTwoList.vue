<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="dialogFormVisible1 = true">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.name" placeholder="二级分类名" />
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
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
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
    <el-dialog title="修改课程二级目录" :visible.sync="dialogFormVisible" @close="closeDialog">
      <el-form>
        <el-form-item label="课程二级目录名称">
          <el-input v-model="form.title" auto-complete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateById">确 定</el-button>
      </div>
    </el-dialog>
    <!--新增弹出框-->
    <el-dialog title="修改课程二级目录" :visible.sync="dialogFormVisible1" @close="closeDialog">
      <el-form>
        <el-form-item label="课程二级目录名称">
          <el-input v-model="form.title" auto-complete="off" />
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
      parentId: null,
      form: {},
      dialogFormVisible: false,
      dialogFormVisible1: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    download() {
      courseApi.downTwo(this.parentId)
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
    // 删除课程二级分类
    removeDataById(id) {
      this.$confirm('此操做将永久删除课程二级分类，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        courseApi.deleteCourseSubjectTwo(id)
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
    closeDialog() {
      this.form = {}
    },
    // 修改课程二级分类
    updateById() {
      courseApi.updateCourseSubjectTwo(this.form)
        .then(response => {
          this.init()
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: '修改成功！'
          })
        }).catch((response) => {
          this.$message({
            type: 'error',
            message: '修改失败'
          })
        })
    },
    // 新增课程二级类别
    add() {
      const data = {
        'parentId': this.parentId,
        'form': this.form
      }
      courseApi.addCourseSubjectTwo(data)
        .then(response => {
          this.init()
          this.dialogFormVisible1 = false
          this.$message({
            type: 'success',
            message: '新增成功！'
          })
        }).catch((response) => {
          this.$message({
            type: 'error',
            message: '新增失败'
          })
        })
    },
    // 根据id查询二级分类名称
    update(id) {
      this.dialogFormVisible = true
      courseApi.getTwoListById(id)
        .then(response => {
          this.form = response.data.list2
        })
        .catch(error => {
          console.log(error)
        })
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        // 从路径获取id值
        this.parentId = this.$route.params.id
        this.getList()
      }
    },
    // 获取二级分类列表
    getList(page = 1) {
      this.page = page
      courseApi.getCourseSubjectTwoListPage(this.parentId, this.page, this.limit, this.searchObj)
        .then(response => {
          this.list = response.data.rows // 表格数据
          this.total = response.data.total
          this.listLoading = false
        })
        .catch(error => {
          console.log(error)
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
