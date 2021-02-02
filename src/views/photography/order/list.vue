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
            <el-input v-model="searchObj.orderNo" placeholder="订单号" />
          </el-form-item>

          <el-form-item>
            <el-select v-model="searchObj.courseId" filterable placeholder="课程名称">
              <el-option
                v-for="item in courseList"
                :key="item.id"
                :value="item.id"
                :label="item.title"
              />
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

      <el-table-column prop="orderNo" label="订单编号" width="200" />

      <el-table-column prop="courseTitle" label="课程名称" />

      <el-table-column prop="photographerName" label="摄影师名" />

      <el-table-column prop="nickname" label="用户昵称" />

      <el-table-column prop="totalFee" label="订单金额">
        <template slot-scope="scope">
          {{ scope.row.totalFee }}元
        </template>
      </el-table-column>

      <el-table-column prop="status" label="支付状态">
        <template slot-scope="scope">
          {{ scope.row.status===0?'未支付':'已支付' }}
        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="时间" width="160" />

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
import orderApi from '@/api/photography/order'

export default {
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      searchObj: {},
      list: null,
      listLoading: true,
      courseList: {},
      multipleSelection: [] // 批量选择中选择的记录列表
    }
  },
  created() {
    this.getList()
    this.getCourse()
  },
  methods: {
    getCourse() {
      orderApi.getCourseList()
        .then(response => {
          this.courseList = response.data.list
        })
    },
    // 获取列表数据
    getList(page = 1) {
      this.page = page
      orderApi.getPageList(this.page, this.limit, this.searchObj)
        .then(response => {
          this.list = response.data.list // 表格数据
          this.total = response.data.total
          this.listLoading = false
        })
    },
    // 清空的方法
    resetData() {
      // 表单输入项数据清空
      this.searchObj = {}
      // 查询所有讲师数据
      this.getList()
    },
    // 删除订单的方法
    removeDataById(id) {
      this.$confirm('此操作将永久删除订单记录，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用删除方法
        orderApi.delete(id)
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
      orderApi.down()
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
