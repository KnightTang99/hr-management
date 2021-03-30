<template>
  <div class="ImageUpload">
    <!-- list-type 用来控制上传控件的样式 -->
    <el-upload
      list-type="picture-card"
      action="#"
      :limit="1"
      :file-list="fileList"
      :on-preview="preview"
      :class="{ disabled: fileComputed }"
      :on-remove="removeImg"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :http-request="upload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="showDialog" title="图片预览">
      <img :src="imgUrl" alt="" style="width:100%" />
    </el-dialog>
    <el-progress v-if="showProgress" style="width:180px" :percentage="percent" />
  </div>
</template>
<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDA8rAFHAh7c4IMkqMJAlFXljkW2tW2lP4',
  SecretKey: 'd0QZRYWWWMyg7HSPRlHMCvPebHyQcfR0'
})
export default {
  name: 'ImageUpload',
  components: {},
  props: {},
  data() {
    return {
      fileList: [],
      imgUrl: '',
      showDialog: false,
      currentFileUid: null,
      showProgress: false,
      percent: null
    }
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 图片预览，可以拿到图片的信息
    preview(file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    // 删除预览的图片
    removeImg(file, fileList) {
      // 这里的fileList是移除以后剩下的文件列表
      this.fileList = fileList
    },
    // 添加图片信息
    changeFile(file, fileList) {
      // 添加或上传成功触发
      this.fileList = fileList.map(item => item)
    },
    // 上传之前判断图片的类型和大小，控制上传图片的类型和大小
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.some(item => item === file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      // 记下当前上传的图片的id，为后面获取指定图片做铺垫
      this.currentFileUid = file.uid
      // 上传进度
      this.showProgress = true
      return true
    },
    // 覆盖默认的action上传图片的方式
    upload(params) {
      if (params.file) {
        cos.putObject(
          {
            Bucket: 'hr-management-1305395350',
            Region: 'ap-nanjing',
            Key: params.file.name,
            Body: params.file,
            StorageClass: 'STANDARD',
            onProgress: params => {
              this.percent = params.percent * 100
            }
          },
          (err, data) => {
            if (!err && data.statusCode === 200) {
              this.fileList = this.fileList.map(item => {
                if (item.uid === this.currentFileUid) {
                  return { url: 'http://' + data.Location, upload: true }
                }
                return item
              })
              setTimeout(() => {
                this.showProgress = false
                this.percent = 0
              }, 1000)
            }
          }
        )
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.ImageUpload {
  ::v-deep .el-upload--picture-card {
    width: 118px;
    height: 118px;
    line-height: 120px;
    .el-icon-plus {
      font-size: 18px;
    }
    ::v-deep .el-upload-list__item.is-ready {
      display: none;
    }
  }
  .disabled {
    ::v-deep .el-upload--picture-card {
      display: none;
    }
  }
  // ::v-deep .el-upload-list__item.is-ready {
  //   display: none;
  // }
}
</style>
