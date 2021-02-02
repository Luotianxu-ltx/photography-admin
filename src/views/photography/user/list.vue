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
            <el-input v-model="searchObj.nickname" placeholder="昵称" />
          </el-form-item>

          <el-form-item>
            <el-select v-model="searchObj.isDisabled" clearable placeholder="是否禁用">
              <el-option :value="1" label="已禁用" />
              <el-option :value="0" label="未禁用" />
            </el-select>
          </el-form-item>

          <!--          <el-form-item label="添加时间">-->
          <!--            <el-date-picker-->
          <!--              v-model="searchObj.begin"-->
          <!--              type="datetime"-->
          <!--              placeholder="选择开始时间"-->
          <!--              value-format="yyyy-MM-dd HH:mm:ss"-->
          <!--              default-time="00:00:00"-->
          <!--            />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item>-->
          <!--            <el-date-picker-->
          <!--              v-model="searchObj.end"-->
          <!--              type="datetime"-->
          <!--              placeholder="选择截止时间"-->
          <!--              value-format="yyyy-MM-dd HH:mm:ss"-->
          <!--              default-time="00:00:00"-->
          <!--            />-->
          <!--          </el-form-item>-->
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

      <el-table-column type="selection" width="55" />
      <el-table-column
        label="序号"
        width="70"
        align="center"
      >
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="头像" width="100" align="center">
        <template slot-scope="scope">
          <el-popover placement="right" trigger="hover">
            <img :src="scope.row.avatar" style="height: 100px; width: 100px" alt="scope.row.nickname">
            <img
              slot="reference"
              :src="scope.row.avatar"
              :alt="scope.row.nickname"
              style="height: 40px; width: 40px"
            >
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="nickname" label="昵称" />

      <el-table-column prop="mobile" label="手机号" width="150" />

      <el-table-column label="性别" width="100">
        <template slot-scope="scope">
          {{ scope.row.sex===1?'女':'男' }}
        </template>
      </el-table-column>

      <el-table-column prop="age" label="年龄" />

      <el-table-column label="是否禁用" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isDisabled"
            :active-value="1"
            :inactive-value="0"
            active-color="#ff4949"
            inactive-color="#13ce66"
            @change="change(scope.row.id)"
          />
        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="注册时间" width="160" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/user/edit/'+scope.row.id" style="padding-right: 5px">
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
import userApi from '@/api/photography/user'

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
    // 下载excel
    down() {
      userApi.down()
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
        return userApi.batchRemove(idList)
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
    change(id) {
      console.log(id)
      userApi.isDisabled(id)
        .then(response => {
          if (response.data.flag === true) {
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
          }
        })
    },
    // 获取会员列表
    getList(page = 1) {
      this.page = page
      userApi.getPageList(this.page, this.limit, this.searchObj)
        .then(response => {
          this.list = response.data.userList // 表格数据
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
        userApi.deleteById(id)
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
