<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools :tree-data="company" :is-root="true" @addDialog="addDialogShow" />
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 拿到当前行的信息，并传递 -->
          <tree-tools slot-scope="{ data }" :tree-data="data" @delDepartments="getDepartments" @addDialog="addDialogShow" @editDialog="editDialogShow" />
        </el-tree>
      </el-card>
    </div>
    <add-department ref="addDepartmentRef" :dialog-show.sync="isDialogShow" :item-data="itemData" @update="getDepartments" />
  </div>
</template>

<script>
// 树状数据的组件
import TreeTools from './components/tree-tools.vue'
// 获取组织架构的函数
import { getDepartments } from '@/api/departments'
// 将列表数据转换成树状结构的处理函数
import { transArrayToTree } from '@/utils/index'
// 添加部门的弹框组件
import AddDepartment from './components/add-department.vue'
export default {
  name: 'Departments',
  components: {
    TreeTools,
    AddDepartment
  },
  data() {
    return {
      company: {},
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      isDialogShow: false,
      itemData: null,
      loading: false
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    // 获取部门架构列表
    async getDepartments() {
      this.loading = true
      const res = await getDepartments()
      this.company = { name: res.companyName, manager: '负责人', id: '' } // 这里声明id是因为头部的验证需要id，不声明就为undefined
      this.departs = transArrayToTree(res.depts, '')
      this.loading = false
    },
    // 添加的弹框
    addDialogShow(itemData) {
      this.isDialogShow = true // 这里是为了传参让弹框显示
      this.itemData = itemData // 记下点击的是哪个节点
    },
    // 编辑的弹框
    editDialogShow(itemData) {
      this.isDialogShow = true
      this.itemData = itemData
      this.$refs.addDepartmentRef.getDepartmentDetail(itemData.id) // 通过$refs触发子组件里面的方法 addDepartmentRef 定义在子组件上的ref
    }

    // 更新部门数据
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
