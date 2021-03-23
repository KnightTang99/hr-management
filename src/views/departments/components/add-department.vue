<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="showTitle" :visible="dialogShow" :before-close="handleClose">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="departmentFormRef" label-width="120px" :model="newDepartmentInfo" :rules="departmentFormRules" size="small" :hide-required-asterisk="true">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="newDepartmentInfo.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="newDepartmentInfo.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="newDepartmentInfo.manager" style="width:80%" placeholder="请选择" @focus="getSimpleList">
          <el-option v-for="item in people" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="newDepartmentInfo.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button size="small" @click="onCancel">取消</el-button>
        <el-button type="primary" size="small" @click="addOrEdit">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import { getDepartments, addDepartments, getDepartmentDetail, editDepartment } from '@/api/departments'
import { getSimpleList } from '@/api/employees'
export default {
  name: 'AddDepartments',
  components: {},
  props: {
    dialogShow: {
      type: Boolean,
      default: false
    },
    // 编辑的信息
    itemData: {
      type: Object,
      default: null
    }
  },

  data() {
    const checkNameRepeat = async (rule, value, callback) => {
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.newDepartmentInfo.id) {
        isRepeat = depts.filter(item => item.pid === this.itemData.id && item.id !== this.newDepartmentInfo.id).some(item => item.name === value)
      } else {
        isRepeat = depts.filter(item => item.pid === this.itemData.id).some(item => item.name === value)
      }
      isRepeat ? callback(new Error(`同级部门下已经有${value}了`)) : callback()
    }
    const checkCodeRepeat = async (rule, value, callback) => {
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.newDepartmentInfo.id) {
        isRepeat = depts.some(item => item.code === value && item.code && item.code !== this.newDepartmentInfo.code)
      } else {
        isRepeat = depts.some(item => item.code === value && item.code)
      }
      isRepeat ? callback(new Error(`组织架构中已经有部门使用${value}编码了`)) : callback()
    }
    return {
      newDepartmentInfo: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      departmentFormRules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1~50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkNameRepeat }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1~50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkCodeRepeat }
        ],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 300,
            message: '部门介绍要求1~300个字符',
            trigger: 'blur'
          }
        ]
      },
      people: []
    }
  },
  computed: {
    showTitle() {
      return this.newDepartmentInfo.id ? '编辑部门' : '新增子部门'
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleClose() {
      this.onCancel()
    },
    // 取消并重置
    onCancel() {
      this.$emit('update:dialogShow', false)
      if (this.newDepartmentInfo.id) {
        this.newDepartmentInfo = {
          name: '',
          code: '',
          manager: '',
          introduce: ''
        }
      }
      this.$refs.departmentFormRef.resetFields() // 去掉所有验证信息和所填信息
    },
    // 部门负责人的简单列表
    async getSimpleList() {
      const data = await getSimpleList()
      this.people = data
    },
    // 根据id判断是添加还是修改
    addOrEdit() {
      this.$refs.departmentFormRef.validate(async valid => {
        if (valid) {
          this.newDepartmentInfo.id ? await editDepartment(this.newDepartmentInfo) : await addDepartments({ ...this.newDepartmentInfo, pid: this.itemData.id })
        }
        this.$emit('update') // 更新数据
        this.onCancel() // 重置表单
      })
    },
    // 获取部门详情
    async getDepartmentDetail(id) {
      this.newDepartmentInfo = await getDepartmentDetail(id)
    }
  }
}
</script>
<style lang="less" scoped></style>
