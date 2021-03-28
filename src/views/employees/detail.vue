<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="登陆账号设置" name="first">
            <el-form ref="userInfoFormRef" :model="userInfo" :rules="userInfoFormRules" label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item label="姓名：" prop="username">
                <el-input v-model="userInfo.username" style="width:300px" placeholder="请输入姓名" />
              </el-form-item>
              <el-form-item label="密码：" prop="newPassword">
                <el-input v-model="userInfo.newPassword" style="width:300px" type="password" placeholder="请输入新密码" />
              </el-form-item>
              <el-form-item>
                <el-button>重置</el-button>
                <el-button type="primary" @click="saveBaseInfoById">保存</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印个人基本信息">
                <router-link :to="`/employees/print/${$route.params.id}?type=personal`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <component :is="personalComponent" />
            <!-- <personal-info /> -->
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印岗位信息">
                <router-link :to="`/employees/print/${$route.params.id}?type=job`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <!-- 动态组件 is属性绑定组件名称，一般为变量 -->
            <component :is="jobComponent" />
            <!-- <job-info /> -->
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getBaseInfoById, saveBaseInfoById } from '@/api/employees'
import PersonalInfo from './components/personal-info.vue'
import JobInfo from './components/job-info'
export default {
  name: 'UserDetail',
  components: { PersonalInfo, JobInfo },
  props: {},
  data() {
    return {
      personalComponent: 'PersonalInfo',
      jobComponent: 'JobInfo',
      activeName: 'first',
      userInfo: {
        username: '',
        newPassword: ''
      },

      userInfoFormRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        newPassword: [
          { required: true, trigger: 'blur', message: '用户密码不能为空' },
          { min: 6, max: 9, trigger: 'blur', message: '密码长度6-9位' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getBaseInfoById()
  },
  mounted() {},
  methods: {
    // 根据id获取员工基本信息
    async getBaseInfoById() {
      this.userInfo = await getBaseInfoById(this.$route.params.id)
      this.userInfo = { ...this.userInfo, ...(await getBaseInfoById(this.$route.params.id)) }
    },
    // 保存指定员工的信息
    saveBaseInfoById() {
      this.$refs.userInfoFormRef.validate(async valid => {
        if (valid) {
          await saveBaseInfoById({ ...this.userInfo, password: this.userInfo.newPassword })
          this.$message.success('更新成功')
          this.$router.back()
        }
      })
    }
  }
}
</script>
<style lang="less" scoped></style>
