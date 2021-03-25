<template>
  <el-dialog class="addEmployee" title="新增员工" :visible.sync="addDialog" width="40%" :before-close="handleClose">
    <el-form ref="newEmployeeRef" :model="newEmployeeInfo" :rules="newEmployeeRules" :hide-required-asterisk="true" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="newEmployeeInfo.username" style="width:300px" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="newEmployeeInfo.mobile" style="width:300px" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="newEmployeeInfo.timeOfEntry" style="width:300px" placeholder="请选择日期" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="newEmployeeInfo.formOfEmployment" style="width:300px" placeholder="请选择">
          <el-option v-for="item in employeeInfo.hireType" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="newEmployeeInfo.workNumber" style="width:300px" placeholder="1-20个字符" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="newEmployeeInfo.departmentName" style="width:300px" placeholder="请选择部门" @focus="getDepartments" />
        <el-tree v-if="showTreeData" v-loading="loading" :data="treeData" :props="{ label: 'name' }" :default-expand-all="true" @node-click="getTreeNode" />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="newEmployeeInfo.correctionTime" style="width:300px" placeholder="请选择日期" />
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="center">
      <el-col :span="6"> <el-button size="small" @click="handleClose">取消</el-button> <el-button size="small" type="primary" @click="submitForm">确定</el-button></el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import { getDepartments } from '@/api/departments'
import { transArrayToTree } from '@/utils/index'
import employeeInfo from '@/api/constant/employees'
// 新增员工接口
import { addEmployee } from '@/api/employees'
export default {
  name: 'AddEmployee',
  components: {},
  props: {
    addDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      newEmployeeInfo: {
        username: '',
        mobile: '',
        timeOfEntry: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        correctionTime: ''
      },
      newEmployeeRules: {
        username: [
          { required: true, trigger: 'blur', message: '用户名不能为空' },
          { min: 1, max: 4, trigger: 'blur', message: '姓名长度为1-4位' }
        ],
        mobile: [
          { required: true, trigger: 'blur', message: '手机号不能为空' },
          { pattern: /^1(3|5|7|8|9)\d{9}$/, trigger: 'blur', message: '手机号格式不正确' }
        ],
        timeOfEntry: [{ required: true, trigger: 'blur', message: '入职时间不能为空' }],
        formOfEmployment: [{ required: true, trigger: 'blur', message: '聘用形式不能为空' }],
        workNumber: [{ required: true, trigger: 'blur', message: '工号不能为空' }],
        departmentName: [{ required: true, trigger: 'change', message: '部门不能为空' }],
        correctionTime: [{ required: true, trigger: 'blur', message: '转正时间不能为空' }]
      },
      treeData: [],
      showTreeData: false,
      loading: false,
      employeeInfo
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 关闭弹框
    handleClose() {
      this.$refs.newEmployeeRef.resetFields()

      this.$emit('update:addDialog', false)
    },
    // 提交表单
    async submitForm() {
      await this.$refs.newEmployeeRef.validate()
      await addEmployee(this.newEmployeeInfo)
      this.$parent.getEmployeeList()
      this.handleClose()
    },
    // 获取组织架构
    async getDepartments() {
      this.showTreeData = true
      this.loading = true
      const { depts } = await getDepartments()
      this.treeData = transArrayToTree(depts, '')
      this.loading = false
    },
    // 获取节点信息
    getTreeNode(node) {
      this.newEmployeeInfo.departmentName = node.name
      this.showTreeData = false
    }
  }
}
</script>
<style lang="less" scoped></style>
