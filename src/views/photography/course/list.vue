<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="courseQuery.name" placeholder="课程名称" />
      </el-form-item>

      <el-form-item>
        <el-select v-model="courseQuery.status" clearable placeholder="课程状态">
          <el-option :value="Normal" label="已发布" />
          <el-option :value="Draft" label="未发布" />
        </el-select>
      </el-form-item>
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

      <el-table-column prop="title" label="课程名称" width="200" />

      <el-table-column label="课程状态" width="100">
        <template slot-scope="scope">
          {{ scope.row.level==='Normal'?'已发布':'未发布' }}
        </template>
      </el-table-column>

      <el-table-column prop="lessonNum" label="课时数" width="100"/>

      <el-table-column prop="gmtCreate" label="添加时间" width="160" />

      <el-table-column prop="gmtModified" label="修改时间" width="160" />

      <el-table-column prop="viewCount" label="浏览数量" width="100" />

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/photographer/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程基本信息</el-button>
          </router-link>&nbsp;
          <router-link :to="'/photographer/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程大纲</el-button>
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

export default {
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      courseQuery: {},
      list: null,
      listLoading: true
    }
  }, created() {
    this.getList()
  },
  methods: {
    // 获取摄影师列表
    getList() {
      courseApi.getListCourse()
        .then(response => {
          this.list = response.data.list // 表格数据
          this.listLoading = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 清空的方法
    resetData() {
      // 表单输入项数据清空
      this.courseObj = {}
      // 查询所有讲师数据
      this.getList()
    }
  }

}
</script>

<style scoped>

</style>
