<template>
  <div class="app-container">
    <!--查询表单-->
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search" />
        <span>筛选搜索</span>
      </div>

      <div style="margin-top: 20px">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="courseQuery.title" placeholder="课程名称" />
          </el-form-item>

          <el-form-item>
            <el-select v-model="courseQuery.status" clearable placeholder="课程状态">
              <el-option :value="1" label="已发布" />
              <el-option :value="0" label="未发布" />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-select v-model="courseQuery.photographerId" placeholder="课程讲师">
              <el-option
                v-for="photographer in photographerList"
                :key="photographer.id"
                :label="photographer.name"
                :value="photographer.id"
              />
            </el-select>
          </el-form-item>

          <el-button type="primary" icon="el-icon-search" @click="getList()">查 询</el-button>
          <el-button type="default" @click="resetData()">清空</el-button>
          <el-button type="danger" @click="removeRows()">批量删除</el-button>
          <el-button type="default" @click="down()">下载</el-button>
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
      @selection-change="handleSelectionChange"
    >

      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        label="序号"
        width="70"
        align="center"
      >
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="封面" width="100" align="center">
        <template slot-scope="scope">
          <el-popover placement="right" trigger="hover">
            <img :src="scope.row.cover" style="height: 100px; width: 100px" alt="scope.row.title">
            <img
              slot="reference"
              :src="scope.row.cover"
              :alt="scope.row.title"
              style="height: 40px; width: 40px"
            >
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="title" align="center" label="课程名称" width="200" />

      <el-table-column align="center" label="课程状态" width="100">
        <template slot-scope="scope">
          {{ scope.row.status==='1'?'已发布':'未发布' }}
        </template>
      </el-table-column>

      <el-table-column prop="lessonNum" align="center" label="课时数" width="70" />

      <el-table-column prop="gmtCreate" align="center" label="添加时间" width="160" />

      <el-table-column prop="gmtModified" align="center" label="修改时间" width="160" />

      <el-table-column prop="viewCount" align="center" label="浏览量" width="70" />

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/course/info/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑信息</el-button>
          </router-link>&nbsp;
          <router-link :to="'/course/chapter/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑大纲</el-button>
          </router-link>&nbsp;
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
  </div>
</template>

<script>
import courseApi from '@/api/photography/course'
import photographerApi from '@/api/photography/photographer'

export default {
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      courseQuery: {},
      list: null,
      listLoading: true,
      photographerList: [],
      multipleSelection: [] // 批量选择中选择的记录列表
    }
  }, created() {
    this.getList()
    // 初始化所有摄影师
    this.initPhotographerList()
  },
  methods: {
    // 批量删除
    removeRows() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择要删除的记录!'
        })
        return
      }
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // promise
        // 点击确定，远程调用ajax
        // 遍历selection，将id取出放入id列表
        var idList = []
        this.multipleSelection.forEach(item => {
          idList.push(item.id)
        })
        // 调用api
        return courseApi.batchRemove(idList)
      }).then((response) => {
        this.getList()
        if (response.success) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 当表格复选框选项发生变化的时候触发
    handleSelectionChange(selection) {
      this.multipleSelection = selection
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除课程记录，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用删除方法
        courseApi.remove(id)
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
    },
    // 获取摄影师列表
    getList(page = 1) {
      this.page = page
      courseApi.getListCourse(this.page, this.limit, this.courseQuery)
        .then(response => {
          this.list = response.data.list // 表格数据
          this.total = response.data.total
          this.listLoading = false
        })
    },
    // 获取摄影师列表
    initPhotographerList() {
      photographerApi.getAllList().then(response => {
        this.photographerList = response.data.list
      })
    },
    // 清空的方法
    resetData() {
      // 表单输入项数据清空
      this.courseQuery = {}
      // 查询所有讲师数据
      this.getList()
    },
    // 下载excel
    down() {
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
    }
  }

}
</script>

<style scoped>

</style>
