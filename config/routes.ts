import access from "@/access";

export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '安全管理',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: '管理介绍', component: './Admin', },
      { path: '/admin/user/manage', name: '用户管理', component: './UserManage' },
      { path: '/admin/interface/manage', name: '接口管理', icon: 'api', component: './InterfaceManage'},

    ],
  },
  { name: '表格', icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
