<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template slot="after">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="addPermission(1, '0')">添加权限</el-button>
        </template>
      </page-tools>
      <el-table :data="permissionList" style="width: 100%" row-key="id">
        <el-table-column label="菜单名称">
          <template slot-scope="{ row }">
            <i class="el-icon-folder-opened" style="margin-right:4px"></i>
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="权限标识" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="address" label="操作" align="center">
          <template slot-scope="{ row }">
            <el-button v-if="row.type === 1" size="mini" type="text" @click="addPermission(2, row.id)">添加</el-button>
            <el-button size="mini" type="text" @click="getPermissionDetail(row.id)">编辑</el-button>
            <el-button size="mini" type="text" @click="removePermission(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 编辑添加权限弹框 -->
      <el-dialog :visible="showDialog" :title="showText" @close="btnCancel">
        <el-form ref="permissionRef" :model="formData" label-width="100px" :rules="addPermissionRules">
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" style="width:90%" />
          </el-form-item>
          <el-form-item label="企业可见">
            <el-switch v-model="formData.enVisible" active-text="可见" active-value="1" inactive-text="不可见" inactive-value="0" />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" @click="btnCancel">取消</el-button>
            <el-button size="small" type="primary" @click="btnOk">确定</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPermission, removePermission, addPermission, getPermissionDetail, updatePermission } from '@/api/permission'
import { transArrayToTree } from '@/utils/index'

export default {
  name: 'AddIndex',
  data() {
    return {
      permissionList: [],
      formData: {
        name: '',
        code: '',
        description: '',
        enVisible: '0',
        pid: '',
        type: ''
      },
      showDialog: false,
      addPermissionRules: {
        name: [{ required: true, trigger: 'blur', message: '权限名称不能为空' }],
        code: [{ required: true, trigger: 'blur', message: '权限标识不能为空' }]
      }
    }
  },
  computed: {
    showText() {
      return this.formData.id ? '编辑权限' : '添加权限'
    }
  },
  created() {
    this.getPermission()
  },
  methods: {
    async getPermission() {
      this.permissionList = transArrayToTree(await getPermission(), '0')
    },
    // 移除权限
    async removePermission(id) {
      try {
        await this.$confirm('确认删除该权限吗')
        await removePermission(id)
        this.getPermission()
        this.$message.success('删除权限成功')
      } catch (err) {
        this.$message.error('删除权限失败')
      }
    },
    addPermission(type, pid) {
      this.showDialog = true
      this.formData.pid = pid
      this.formData.type = type
    },
    // 提交按钮
    btnOk() {
      this.$refs.permissionRef.validate(async valid => {
        if (valid) {
          this.formData.id ? await updatePermission(this.formData) : await addPermission(this.formData)
          this.btnCancel()
          this.getPermission()
          this.$message.success('添加成功')
        }
      })
    },
    // 取消按钮
    btnCancel() {
      this.showDialog = false
      this.formData = {
        name: '',
        code: '',
        description: '',
        enVisible: '0',
        pid: '',
        type: ''
      }
      this.$refs.permissionRef.resetFields()
    },
    // 权限详情
    async getPermissionDetail(id) {
      const result = await getPermissionDetail(id)
      this.formData = result
      this.showDialog = true
    }
  }
}
</script>

<style></style>
