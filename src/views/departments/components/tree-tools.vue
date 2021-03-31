<template>
  <el-row type="flex" justify="space-between" align="middle" style="width:100%;height:40px">
    <el-col>
      <span>{{ treeData.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeData.manager }}</el-col>
        <el-col>
          <el-dropdown @command="operateDepts">
            <span>操作<i class="el-icon-arrow-down"></i></span>
            <el-dropdown-menu v-if="checkPermission('add-depts')" slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import { delDepartments } from '@/api/departments'
export default {
  name: 'TreeTools',
  components: {},
  props: {
    // 拿过来的当前行的信息
    treeData: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},

  mounted() {},
  methods: {
    operateDepts(type) {
      if (type === 'add') {
        this.$emit('addDialog', this.treeData)
      } else if (type === 'edit') {
        this.$emit('editDialog', this.treeData)
      } else {
        this.$confirm('确定要删除该部门吗')
          .then(() => {
            return delDepartments(this.treeData.id)
          })
          .then(() => {
            this.$emit('delDepartments')
            this.$message.success('删除成功')
          })
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
