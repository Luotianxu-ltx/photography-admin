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
            <el-input v-model="searchObj.name" placeholder="摄影师名" />
          </el-form-item>

          <el-form-item>
            <el-select v-model="searchObj.level" clearable placeholder="摄影师头衔">
              <el-option :value="1" label="签约摄影师" />
              <el-option :value="2" label="爱好者" />
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
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="头像" width="100" align="center">
        <template slot-scope="scope">
          <el-popover placement="right" trigger="hover">
            <img :src="scope.row.avatar" style="height: 100px; width: 100px" alt="scope.row.name">
            <img
              slot="reference"
              :src="scope.row.avatar"
              :alt="scope.row.name"
              style="height: 40px; width: 40px"
            >
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名称" width="150" align="center" />

      <el-table-column label="头衔" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.level===1?'签约摄影师':'爱好者' }}
        </template>
      </el-table-column>

      <el-table-column prop="career" label="资历" align="center" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160" align="center" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/photographer/edit/'+scope.row.id" style="padding-right: 5px">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
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
import photographerApi from '@/api/photography/photographer'

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
        return photographerApi.deleteAll(idList)
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
    // 获取摄影师列表
    getList(page = 1) {
      this.page = page
      photographerApi.getPhotographerListPage(this.page, this.limit, this.searchObj)
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
    },
    // 删除摄影师的方法
    removeDataById(id) {
      this.$confirm('此操作将永久删除摄影师记录，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用删除方法
        photographerApi.deletePhotographerId(id)
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
      photographerApi.down()
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
