/**
 * 获取路由列表：商户端菜单由前端自行配置（无权限模块）
 */
const routers: any[] = [
  {
    component: 'Layout',
    path: '/catalog',
    redirect: '/catalog',
    meta: {
      title: '目录',
      icon: 'log',
      hidden: false,
      alwaysShow: true,
      roles: ['ADMIN'],
      keepAlive: true
    },
    children: [
      {
        path: 'catalog-menu1',
        component: 'catalog/menu1/index',
        name: 'catalog-menu1',
        meta: {
          title: '菜单1',
          icon: 'list',
          hidden: false,
          alwaysShow: false,
          roles: ['ADMIN'],
          keepAlive: false
        }
      },
      {
        path: 'catalog-menu2',
        component: 'catalog/menu2/index',
        name: 'catalog-menu2',
        meta: {
          title: '菜单2',
          icon: 'list',
          hidden: false,
          alwaysShow: false,
          roles: ['ADMIN'],
          keepAlive: false
        }
      },
      {
        path: 'catalog-menu3',
        component: 'catalog/menu3/index',
        name: 'catalog-menu3',
        meta: {
          title: '菜单3',
          icon: 'order',
          hidden: false,
          alwaysShow: false,
          roles: ['ADMIN'],
          keepAlive: false
        }
      }
    ]
  },
  {
    path: '/',
    component: 'Layout',
    redirect: '/menu4',
    meta: {
      roles: ['ADMIN']
    },
    children: [
      {
        path: '/menu4',
        component: 'menu4/index',
        name: 'menu4',
        meta: {
          title: '菜单4',
          icon: 'tool',
          hidden: false,
          alwaysShow: false,
          roles: ['ADMIN']
        }
      }
    ]
  }
];
export function listRoutes() {
  return new Promise((resolve, reject) => {
    if (routers) {
      resolve({
        data: routers
      });
    } else {
      reject({});
    }
  });
}
