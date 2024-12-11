export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './Login' }],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '安全管理',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/user/manage' },
      { path: '/admin/user/manage', name: '用户管理', component: './UserManage' },
      { path: '/admin/interface/manage', name: '接口管理', component: './InterfaceManage' },
      { path: '/admin/role/manage', name: '角色管理', component: './RoleManage' },
    ],
  },
  { name: 'API目录', icon: 'api', path: '/interface/docs', component: './InterfaceDocs' },
  { name: '用户中心', icon: 'user', path: '/user/center', component: './UserCenter' },
  { name: '数据分析', icon: 'https://pic.imgdb.cn/item/6756bc39d0e0a243d4e0715a.png', path: '/interface/analysis', component: './InterfaceAnalysis' },
  { name: "查看接口文档", path: "/interface/detail/:interfaceId", component: "./InterfaceDetail", hideInMenu: true},
  { name: "在线调用接口", path: "/interface/online/:interfaceId", component: "./InterfaceOnline", hideInMenu: true},
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
