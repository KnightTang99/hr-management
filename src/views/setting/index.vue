<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button icon="el-icon-plus" size="small" type="primary" @click="addRoleDialog = true">新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table border="" :data="rolesList">
              <el-table-column label="序号" width="150" type="index" />
              <el-table-column label="角色名称" width="150" prop="name" />
              <el-table-column label="描述" prop="description" width="655" />
              <el-table-column label="操作" width="250" align="center">
                <template slot-scope="{ row }">
                  <el-button size="small" type="text" @click="assignPerm(row.id)">分配权限</el-button>
                  <el-button size="small" type="text" @click="getRoleDetail(scope.row.id)">编辑</el-button>
                  <el-button size="small" type="text" @click="removeRole(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row type="flex" justify="end" align="middle" style="height: 60px">
              <!-- 分页组件 -->

              <el-pagination :total="total" :page-size="pagesize" :current-page.sync="page" layout="slot, prev, pager, next" @current-change="handleCurrentChange">
                <template>
                  <span style="color:#606266;font-weight:400">共 {{ total }} 条</span>
                </template>
              </el-pagination>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改" type="info" show-icon :closable="false" />
            <el-form label-width="120px" style="margin-top:50px" :model="companyInfo">
              <el-form-item label="公司名称">
                <el-input v-model="companyInfo.name" :disabled="true" style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="companyInfo.companyAddress" :disabled="true" style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="companyInfo.mailbox" :disabled="true" style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="companyInfo.remarks" type="textarea" :rows="3" :disabled="true" style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <role-dialog ref="roleDialogRef" :role-dialog.sync="addRoleDialog" @update="getRoles" />
      <el-dialog :visible="showPermDialog" title="分配权限" @close="btnCancel">
        <el-tree ref="permTree" :data="permData" :props="defaultProps" :show-checkbox="true" :default-expand-all="true" :check-strictly="true" :default-checked-keys="permList" node-key="id" />
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
import { getRoles, getCompanyInfo, removeRole, getRoleDetail, assignPerm } from '@/api/setting'
import { getPermission } from '@/api/permission'
import { transArrayToTree } from '@/utils'
import { mapGetters } from 'vuex'
import RoleDialog from './components/role-dialog.vue'
export default {
  name: 'Setting',
  components: { RoleDialog },
  props: {},
  data() {
    return {
      page: 1,
      pagesize: 5,
      rolesList: [],
      total: 0,
      companyInfo: {},
      addRoleDialog: false,
      showPermDialog: false, // 控制权限分配弹框
      permData: [],
      defaultProps: {
        label: 'name'
      },
      permList: [],
      roleId: null
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {},
  created() {
    this.getRoles()
    this.getCompanyInfo()
  },
  mounted() {},
  methods: {
    // 获取角色列表
    async getRoles() {
      const data = await getRoles({
        page: this.page,
        pagesize: this.pagesize
      })
      this.rolesList = data.rows
      this.total = data.total
    },
    // 当前页的变化
    handleCurrentChange(val) {
      this.page = val
      this.getRoles()
    },
    // 获取公司信息
    async getCompanyInfo() {
      const data = await getCompanyInfo(this.userInfo.companyId)
      this.companyInfo = data
    },
    // 移除角色
    removeRole(id) {
      this.$confirm('确定要永久删除该角色吗？', '提示', { type: 'warning' })
        .then(async () => {
          await removeRole(id)
          this.$message.success('删除成功！')
          if (this.rolesList.length === 1) {
            // 先移除，再获取，获取的时候rolesList才会刷新
            this.page--
          }
          this.getRoles()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 获取角色详情
    getRoleDetail(id) {
      this.$refs.roleDialogRef.getRoleDetail(id) // 调用子组件内的方法
      this.addRoleDialog = true
    },
    // 分配权限弹框
    async assignPerm(id) {
      this.permData = transArrayToTree(await getPermission(), '0')
      const { permIds } = await getRoleDetail(id)
      this.permList = permIds
      this.roleId = id
      this.showPermDialog = true
    },
    // 取消按钮
    btnCancel() {
      this.permList = []
      this.showPermDialog = false
    },
    // 提交按钮
    async btnOk() {
      await assignPerm({ permIds: this.$refs.permTree.getCheckedKeys(), id: this.roleId })
      this.$message.success('分配权限成功')
      this.btnCancel()
    }
  }
}
</script>
<style lang="less" scoped></style>
