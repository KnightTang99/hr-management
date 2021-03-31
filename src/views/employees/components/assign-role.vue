<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" :before-close="close">
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="mini" type="primary" @click="assignRole">确定</el-button>
        <el-button size="mini" @click="close">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import { getRoles } from '@/api/setting'
import { getBaseInfoById, assignRole } from '@/api/employees'
export default {
  name: 'AssignRole',
  components: {},
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      roleList: [],
      roleIds: [] // 多选框所有选中的值的数组，值的类型由label决定
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getRoles()
  },
  mounted() {},
  methods: {
    // 获取所有角色列表
    async getRoles() {
      const { rows } = await getRoles({
        page: 1,
        pagesize: 20
      })
      this.roleList = rows
    },
    // 获取角色详情
    async getBaseInfoById(id) {
      const { roleIds } = await getBaseInfoById(id)
      this.roleIds = roleIds
    },
    // 关闭弹层
    close() {
      this.roleIds = []
      this.$emit('update:showRoleDialog', false) // 不需要清空roleIds ，因为每次点击都会给他重新赋值
    },
    // 更新员工角色
    async assignRole() {
      await assignRole({
        id: this.userId,
        roleIds: this.roleIds
      })
      this.close()
      this.$message.success('更新角色信息成功')
    }
  }
}
</script>
<style lang="less" scoped></style>
