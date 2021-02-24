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
            <el-input v-model="searchObj.title" placeholder="标题名" />
          </el-form-item>

          <el-form-item label="添加时间">
            <el-date-picker
              v-model="searchObj.gmtCreate"
              type="datetime"
              placeholder="选择开始时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              default-time="00:00:00"
            />
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="searchObj.gmtModified"
              type="datetime"
              placeholder="选择截止时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              default-time="00:00:00"
            />
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
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="封面" width="100" align="center">
        <template slot-scope="scope">
          <el-popover placement="right" trigger="hover">
            <img :src="scope.row.picture" style="height: 100px; width: 100px" alt="scope.row.title">
            <img
              slot="reference"
              :src="scope.row.picture"
              :alt="scope.row.title"
              style="height: 40px; width: 40px"
            >
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="title" label="标题" align="center" />

      <el-table-column prop="userName" label="用户姓名" align="center" />

      <el-table-column prop="gmtCreate" label="添加时间" align="center" />
      <el-table-column prop="gmtModified" label="修改时间" align="center" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
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
import articleApi from '@/api/photography/article'

export default {
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      searchObj: {},
      list: null,
      listLoading: true,
      multipleSelection: [] // 批量选择中选择的记录列表
    }
  }, created() {
    this.getList()
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
        return articleApi.deleteAll(idList)
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
    getList(page = 1) {
      this.page = page
      articleApi.getPageList(this.page, this.limit, this.searchObj)
        .then(response => {
          this.list = response.data.list // 表格数据
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
      this.getList()
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除文章，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用删除方法
        articleApi.delete(id)
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
    // 下载excel
    down() {
      articleApi.down()
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
