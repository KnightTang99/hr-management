import PageTools from './pageTools'
import UploadExcel from './uploadExcel'
import ImageUpload from './imageUpload'
import Print from 'vue-print-nb'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('ImageUpload', ImageUpload)
    Vue.use(Print)
  }
}
