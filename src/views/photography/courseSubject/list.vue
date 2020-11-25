<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="搜索" style="margin-bottom:30px;" />

    <el-tree
      ref="subjectTree"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
import courseApi from '@/api/photography/courseSubject'
export default {

  data() {
    return {
      filterText: '',
      data2: [], // 返回所有分类的数据
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.subjectTree.filter(val)
    }
  },

  created() {
    this.getAllSubjectList()
  },

  methods: {
    getAllSubjectList() {
      courseApi.getAllListTree()
        .then(reponse => {
          this.data2 = reponse.data.list
        })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    }
  }
}
</script>
