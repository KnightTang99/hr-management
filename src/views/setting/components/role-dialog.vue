<template>
  <el-dialog title="编辑角色" :visible.sync="roleDialog" width="50%" :before-close="onCancel">
    <el-form ref="addRoleInfoRef" :model="addRoleInfo" :rules="addRoleRules" label-width="80px">
      <el-form-item label="角色名称" label-width="90px" prop="name">
        <el-input v-model="addRoleInfo.name" style="width:90%" />
      </el-form-item>
      <el-form-item label="角色描述" label-width="90px" prop="description">
        <el-input v-model="addRoleInfo.description" style="width:90%" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="addRole">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addRole, getRoleDetail, updateRole } from '@/api/setting'
export default {
  name: 'RoleDialog',
  components: {},
  props: {
    roleDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      addRoleInfo: {
        name: '',
        description: ''
      },
      addRoleRules: {
        name: [{ required: true, trigger: 'blur', message: '请输入角色名称' }],
        description: [{ required: true, trigger: 'blur', message: '请输入角色名称' }]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 取消添加
    onCancel() {
      this.$refs.addRoleInfoRef.resetFields()
      this.$emit('update:roleDialog', false)
    },
    // 添加角色
    async addRole() {
      this.$refs.addRoleInfoRef.validate(async valid => {
        if (valid) {
          this.addRoleInfo.id ? await updateRole(this.addRoleInfo) : await addRole(this.addRoleInfo)
        }
        this.onCancel()
        this.$emit('update')
      })
    },
    // 获取角色详情
    async getRoleDetail(id) {
      const res = await getRoleDetail(id)
      this.addRoleInfo = res
    }
  }
}
</script>
<style lang="less" scoped></style>
