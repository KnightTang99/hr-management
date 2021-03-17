import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg component

// register globally
Vue.component('svg-icon', SvgIcon)
// 第一个参数路径，第二个参数是否便利子文件，第三个参数正则表达式
const req = require.context('./svg', false, /\.svg$/)
// req 是返回的函数
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
