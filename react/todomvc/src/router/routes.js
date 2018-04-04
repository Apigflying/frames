const routes = [
  {
    key: 'a01',
    name: '首页',
    path: '/home'
  }, {
    key: 'b01',
    name: '资料',
    icon: 'mail',
    path: '/material',
    children: [
      {
        key: 'b10',
        path: 'storage-material',
        name: '仓库资料'
      }, {
        key: 'b11',
        path: 'brand-mag',
        name: '品牌管理'
      }
    ]
  }, {
    key: 'c01',
    name: '采购',
    icon: 'menu-fold',
    path: '/purchase',
    children: [
      {
        key: 'c10',
        path: 'purchase-business',
        name: '采购业务'
      }
    ]
  }, {
    key: 'd01',
    name: '仓储',
    icon: 'menu-fold',
    path: '/storages',
    children: [
      {
        key: 'd10',
        path: 'out-put',
        name: '出入库业务'
      }
    ]
  }
];

export default routes;