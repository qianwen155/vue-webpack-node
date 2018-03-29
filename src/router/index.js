import Vue from 'vue'
import Router from 'vue-router'

const myAccount = () => import('@/components/home/myAccount')
const transfer = () => import('@/components/transfer/transfer')
const carryover = () => import('@/components/carryover/carryover')
const carryoverList = () => import('@/components/carryoverList/carryoverList')
const carryoverDetail = () => import('@/components/carryoverDetail/carryoverDetail')
const qrcode = () => import('@/components/qrcode/qrcode')
const checking = () => import('@/components/checking/checking')
const checkingDetail = () => import('@/components/checking/checkingDetail')
const sendChecking = () => import('@/components/checking/sendChecking')
const importGoods = () => import('@/components/importGoods/importGoods')
const gatherDetail = () => import('@/components/gatherDetail/gatherDetail')
const transferDetail = () => import('@/components/transfer-detail/transfer-detail')
const transferList = () => import('@/components/transferlist/transferlist')
const success = () => import('@/components/pay/success')
const pay = () => import('@/components/pay/pay')
const setPassword = () => import('@/components/setPassword/setPassword')
// 收派员
const vendormyAccount = () => import('@/vendor_components/home/myAccount')
const vendortransfer = () => import('@/vendor_components/transfer/transfer')
const vendorcarryover = () => import('@/vendor_components/carryover/carryover')
const vendorcarryoverList = () => import('@/vendor_components/carryoverList/carryoverList')
const vendorcarryoverDetail = () => import('@/vendor_components/carryoverDetail/carryoverDetail')
const vendorchecking = () => import('@/vendor_components/checking/checking')
const vendorcheckingDetail = () => import('@/vendor_components/checking/checkingDetail')
const vendorsendChecking = () => import('@/vendor_components/checking/sendChecking')
const vendorgatherDetail = () => import('@/vendor_components/gatherDetail/gatherDetail')
const vendortransferDetail = () => import('@/vendor_components/transfer-detail/transfer-detail')
const vendortransferList = () => import('@/vendor_components/transferlist/transferlist')
const vendorcompleteProfile = () => import('@/vendor_components/completeProfile/completeProfile')
const vendorvouchersList = () => import('@/vendor_components/vouchersList/vouchersList')

import VueDocumentTitlePlugin from 'vue-document-title-plugin'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/importGoods',
      name: importGoods.name,
      meta: { title: '进件' },
      component: importGoods
    },
    {
      path: '/home',
      name: myAccount.name,
      meta: { title: '我的账户' },
      component: myAccount
    },
    {
      path: '/transfer',
      name: transfer.name,
      meta: { title: '提现' },
      component: transfer
    },
    {
      path: '/transferDetail/:vid',
      name: transferDetail.name,
      meta: { title: '提现详情' },
      component: transferDetail
    },
    {
      path: '/transferlist',
      name: transferList.name,
      meta: { title: '提现历史' },
      component: transferList
    },
    {
      path: '/qrcode',
      name: qrcode.name,
      meta: { title: '二维码收款' },
      component: qrcode
    },
    {
      path: '/gatherDetail/:vid',
      name: gatherDetail.name,
      meta: { title: '收款详情' },
      component: gatherDetail
    },

    {
      path: '/checking',
      name: checking.name,
      meta: { title: '对账' },
      component: checking
    },
    {
      path: '/checkingDetail/:mid/:totalNumber/:totalMoney',
      name: checkingDetail.name,
      meta: { title: '对账详情' },
      component: checkingDetail
    },
    {
      path: '/sendChecking',
      name: sendChecking.name,
      meta: { title: '对账单' },
      component: sendChecking
    },
    {
      path: '/success',
      name: success.name,
      meta: { title: '支付成功' },
      component: success
    },
    {
      path: '/pay',
      name: pay.name,
      meta: { title: '向商户付款' },
      component: pay
    },
    {
      path: '/setPassword',
      name: setPassword.name,
      meta: { title: '设置密码' },
      component: setPassword
    },
    {
      path: '/carryover',
      name: carryover.name,
      meta: { title: '转账' },
      component: carryover
    },
    {
      path: '/carryoverlist',
      name: carryoverList.name,
      meta: { title: '转账历史' },
      component: carryoverList
    },
    {
      path: '/carryoverdetail/:vid',
      name: carryoverDetail.name,
      meta: { title: '转账详情' },
      component: carryoverDetail
    },
    // 收派员
    {
      path: '/vendor-home',
      name: vendormyAccount.name,
      meta: { title: '我的账户' },
      component: vendormyAccount
    },
    {
      path: '/vendor-transfer',
      name: vendortransfer.name,
      meta: { title: '提现' },
      component: vendortransfer
    },
    {
      path: '/vendor-transferDetail/:vid',
      name: vendortransferDetail.name,
      meta: { title: '提现详情' },
      component: vendortransferDetail
    },
    {
      path: '/vendor-transferlist',
      name: vendortransferList.name,
      meta: { title: '提现历史' },
      component: vendortransferList
    },
    {
      path: '/vendor-gatherDetail/:vid',
      name: vendorgatherDetail.name,
      meta: { title: '收款详情' },
      component: vendorgatherDetail
    },
    {
      path: '/vendor-checking',
      name: vendorchecking.name,
      meta: { title: '对账' },
      component: vendorchecking
    },
    {
      path: '/vendor-checkingDetail/:mid/:totalNumber/:totalMoney',
      name: vendorcheckingDetail.name,
      meta: { title: '对账详情' },
      component: vendorcheckingDetail
    },
    {
      path: '/vendor-sendChecking',
      name: vendorsendChecking.name,
      meta: { title: '对账单' },
      component: vendorsendChecking
    },
    {
      path: '/vendor-completeProfile',
      name: vendorcompleteProfile.name,
      meta: { title: '收派员完善信息' },
      component: vendorcompleteProfile
    },
    {
      path: '/vendor-carryover',
      name: vendorcarryover.name,
      meta: { title: '转账' },
      component: vendorcarryover
    },
    {
      path: '/vendor-carryoverlist',
      name: vendorcarryoverList.name,
      meta: { title: '转账历史' },
      component: vendorcarryoverList
    },
    {
      path: '/vendor-carryoverdetail/:vid',
      name: vendorcarryoverDetail.name,
      meta: { title: '转账详情' },
      component: vendorcarryoverDetail
    },
    {
      path: '/vendor-vendorvouchersList',
      name: vendorvouchersList.name,
      meta: { title: '收派员账单列表' },
      component: vendorvouchersList
    }
  ]
})
/**
 * 修改名称插件
 */
Vue.use(VueDocumentTitlePlugin, router)

export default router
