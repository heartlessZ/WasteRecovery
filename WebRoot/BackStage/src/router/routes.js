import NotFoundView from "../components/404.vue";
import menuList from "../pages/sys/menu.vue";
import role from "../pages/sys/role.vue";
import resource from "../pages/sys/resource.vue";
import login from "../pages/login.vue";
import app from "../App.vue";
import sysUser from "../pages/sys/user.vue";
import userAdd from "../pages/sys/userAdd.vue";
import resetPwd from "../pages/resetPwd.vue";

const OrderList = resolve => require(['../pages/order/OrderList'], resolve)
    // Routes
const routes = [
    { path: '/login', component: login },
    {
        path: '',
        component: app,
        children: [
            { path: '/order', component: OrderList },
            { path: '/resetPwd', component: resetPwd },
            { path: '/system/menu', component: menuList },
            { path: '/system/role', component: role },
            { path: '/system/user', component: sysUser },
            { path: '/system/userAdd', component: userAdd },
            { path: '/system/resource', component: resource }
        ]
    },
    { path: '*', component: NotFoundView }
]


export default routes