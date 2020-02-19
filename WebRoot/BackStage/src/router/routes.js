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
const WithdrawalList = resolve => require(['../pages/withdrawal/withdrawalList.vue'], resolve)
const NoticeManager = resolve => require(['../pages/notice/NoticeManager.vue'], resolve)
const MyWallet = resolve => require(['../pages/wallet/MyWallet.vue'], resolve)
    // Routes
const routes = [
    { path: '/login', component: login },
    {
        path: '',
        component: app,
        children: [
            { path: '/order', component: OrderList },
            { path: '/withdrawal',component: WithdrawalList},
            { path: '/wallet',component: MyWallet},
            { path: '/resetPwd', component: resetPwd },
            { path: '/system/menu', component: menuList },
            { path: '/system/role', component: role },
            { path: '/system/user', component: sysUser },
            { path: '/system/userAdd', component: userAdd },
            { path: '/system/resource', component: resource },
            { path: '/system/notice', component: NoticeManager},
        ]
    },
    { path: '*', component: NotFoundView }
]


export default routes
