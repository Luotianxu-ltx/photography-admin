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
            <el-input v-model="searchObj.username" placeholder="用户名" />
          </el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
          <el-button type="default" @click="resetData()">清空</el-button>
          <el-button type="primary" @click="addUser()">添加</el-button>
          <el-button type="danger" @click="removeRows()">批量删除</el-button>
        </el-form>
      </div>
    </el-card>

    <!-- 管理员列表 -->
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
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="150" />
      <el-table-column prop="nickName" label="用户昵称" />
      <el-table-column prop="gmtCreate" label="创建时间" width="180" />
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <router-link :to="'/acl/user/role/'+scope.row.id" style="padding-right: 5px">
            <el-button type="info" size="mini" icon="el-icon-info">角色</el-button>
          </router-link>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="updateById(scope.row.id)">修改</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
      @size-change="changeSize"
    />

    <el-dialog title="新增管理员" :visible.sync="dialogFormVisible" @close="closeDialog">
      <el-form ref="user" :model="user" :rules="validateRules" label-width="120px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username" />
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input v-model="user.nickName" />
        </el-form-item>

        <el-form-item v-if="!user.id" label="用户密码" prop="password">
          <el-input v-model="user.password" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="修改管理员" :visible.sync="dialogFormVisible1" @close="closeDialog">
      <el-form ref="user" :model="user" :rules="validateRules" label-width="120px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username" />
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input v-model="user.nickName" />
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="user.password" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="update">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import userApi from '@/api/acl/user'

const validatePass = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('密码不能小于6位'))
  } else {
    callback()
  }
}

export default {
  data() {
    return {
      listLoading: true, // 数据是否正在加载
      list: null, // 讲师列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询表单对象
      multipleSelection: [], // 批量选择中选择的记录列表
      dialogFormVisible: false,
      dialogFormVisible1: false,
      username: '',
      nickName: '',
      password: '',
      user: {},
      validateRules: {
        username: [
          { required: true, trigger: 'blur', message: '用户名必须输入' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    save() {
      userApi.save(this.user)
        .then(response => {
          if (response.success) {
            this.$message({
              type: 'success',
              message: response.message
            })
            this.dialogFormVisible = false
            this.fetchData()
          }
        })
    },
    update() {
      // teacher数据的获取
      userApi.updateById(this.user)
        .then(response => {
          if (response.success) {
            this.$message({
              type: 'success',
              message: response.message
            })
            this.dialogFormVisible1 = false
            this.fetchData()
          }
        })
    },
    updateById(id) {
      userApi.getById(id)
        .then(response => {
          this.user = response.data.item
        })
      this.dialogFormVisible1 = true
    },
    // 当页码发生改变的时候
    changeSize(size) {
      this.limit = size
      this.fetchData(1)
    },
    closeDialog() {
      this.user = {}
      this.$nextTick(() => {
        this.$refs.user.clearValidate()
      })
    },
    addUser() {
      this.dialogFormVisible = true
    },
    // 加载列表数据
    fetchData(page = 1) {
      // 异步获取远程数据（ajax）
      this.page = page

      userApi.getPageList(this.page, this.limit, this.searchObj).then(
        response => {
          this.list = response.data.items
          this.total = response.data.total

          // 数据加载并绑定成功
          this.listLoading = false
        }
      )
    },
    // 重置查询表单
    resetData() {
      console.log('重置查询表单')
      this.searchObj = {}
      this.fetchData()
    },
    // 根据id删除数据
    removeDataById(id) {
      // debugger
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // promise
        // 点击确定，远程调用ajax
        return userApi.removeById(id)
      }).then((response) => {
        this.fetchData(this.page)
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
        return userApi.removeRows(idList)
      }).then((response) => {
        this.fetchData(this.page)
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
    }
  }
}
</script>

