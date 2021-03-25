<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before" style="font-size:14px">共 {{ total }} 条数据</span>
        <template v-slot:after>
          <el-button type="success" size="small" @click="$router.push('/import')">Excel导入</el-button>
          <el-button type="danger" size="small" @click="exportData">导出</el-button>
          <el-button type="primary" size="small" @click="addEmployeeDialogVisible = true">新增员工</el-button>
        </template>
      </page-tools>
      <el-card>
        <el-table :data="employeeList">
          <el-table-column label="序号" type="index" width="150" />
          <el-table-column label="姓名" prop="username" sortable="" width="150" />
          <el-table-column label="手机号" prop="mobile" sortable="" width="150" />
          <el-table-column label="工号" prop="workNumber" sortable width="120" />
          <el-table-column label="聘用形式" prop="formOfEmployment" sortable :formatter="formatEmployment" width="150" />
          <el-table-column label="部门" prop="departmentName" sortable width="150" />
          <el-table-column label="入职时间" sortable width="200">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="是否在职" prop="inServiceStatus" :formatter="formatWorkState" width="120" />
          <el-table-column label="状态" prop="enableState" width="150">
            <template slot-scope="{ row }">
              <el-switch :value="row.enableState === 1" active-color="#13ce66" />
            </template>
          </el-table-column>
          <el-table-column label="操作" type="index" width="260" align="center" fixed="right">
            <template slot-scope="{ row }">
              <el-button size="mini" type="text">查看</el-button>
              <el-button size="mini" type="text">转正</el-button>
              <el-button size="mini" type="text">调岗</el-button>
              <el-button size="mini" type="text">离职</el-button>
              <el-button size="mini" type="text">角色</el-button>
              <el-button size="mini" type="text" @click="removeEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="center" align="center">
          <el-pagination layout="prev, pager, next" :current-page="page" :page-size="size" :total="total" @current-change="handleCurrentChange" />
        </el-row>
      </el-card>
      <add-employee :add-dialog.sync="addEmployeeDialogVisible" />
    </div>
  </div>
</template>

<script>
import { getEmployeeList, removeEmployeeItem } from '@/api/employees'
import employeeInfo from '@/api/constant/employees'
import addEmployee from './components/add-Employee.vue'
import { formatDate } from '@/filters'
export default {
  name: 'Employee',
  components: { addEmployee },
  data() {
    return {
      employeeList: [],
      page: 1,
      size: 10,
      total: 0,
      addEmployeeDialogVisible: false,
      loading: false
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    // 获取员工列表
    async getEmployeeList() {
      this.loading = true
      const data = await getEmployeeList({
        page: this.page,
        size: this.size
      })
      this.employeeList = data.rows
      this.total = data.total
      this.loading = false
    },
    // 格式化聘用形式数据
    formatEmployment(row, column, cellValue, index) {
      const itemObj = employeeInfo.hireType.find(item => item.id === cellValue)
      return itemObj ? itemObj.value : '未知'
    },
    // 格式化工作状态数据
    formatWorkState(row, column, cellValue, index) {
      // const cellValue = cellValue.toString()
      const itemObj = employeeInfo.workingState.find(item => item.id === cellValue + '')
      return itemObj ? itemObj.value : '未知'
    },
    // 当前页变化
    handleCurrentChange(val) {
      this.page = val
      this.getEmployeeList()
    },
    // 移除
    removeEmployee(id) {
      this.$confirm('确定要删除该选项吗', '提示', { type: 'warning' })
        .then(async () => {
          await removeEmployeeItem(id)
          if (this.employeeList.length === 1) {
            this.page--
          }
          this.getEmployeeList()
          this.$message.success('删除成功')
        })
        .catch(() => {
          this.$message.warning('删除失败')
        })
    },
    // 导出数据
    exportData() {
      const headers = {
        姓名: 'username',
        手机号: 'mobile',
        入职日期: 'timeOfEntry',
        聘用形式: 'formOfEmployment',
        转正日期: 'correctionTime',
        工号: 'workNumber',
        部门: 'departmentName'
      }
      import('@/vendor/Export2Excel').then(async excel => {
        const { rows } = await getEmployeeList({
          page: 1,
          size: this.total
        })
        const data = this.formatJson(headers, rows)
        const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
        const merges = ['A1:A2', 'B1:F1', 'G1:G2']
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: '员工薪资表',
          autoWidth: true,
          bookType: 'xlsx',
          multiHeader,
          merges
        })
      })
    },
    // 将数组对象转换成数组套数组
    formatJson(headers, rows) {
      return rows.map(item => {
        return Object.keys(headers).map(key => {
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            return formatDate(item[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            const res = employeeInfo.hireType.find(obj => obj.id === item[headers[key]])
            return res ? res.value : '未知'
          }
          return item[headers[key]]
        })
      })
    }
  }
}
</script>

<style></style>
