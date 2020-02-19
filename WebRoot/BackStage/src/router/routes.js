import NotFoundView from "../components/404.vue";
import menuList from "../pages/sys/menu.vue";
import role from "../pages/sys/role.vue";
import login from "../pages/login.vue";
import app from "../App.vue";
import sysUser from "../pages/sys/user.vue";
import userAdd from "../pages/sys/userAdd.vue";
import resetPwd from "../pages/resetPwd.vue";

const OrderList = resolve => require(['../pages/order/OrderList'], resolve)
const WithdrawalList = resolve => require(['../pages/walletmgr/withdrawalList.vue'], resolve)
const RechargeList = resolve => require(['../pages/walletmgr/rechargeList.vue'], resolve)
const wasteInfo = resolve => require(['../pages/wasteInfo/wasteInfo'], resolve)
const category = resolve => require(['../pages/sys/category'], resolve)
const NoticeManager = resolve => require(['../pages/notice/NoticeManager.vue'], resolve)
const MyWallet = resolve => require(['../pages/wallet/MyWallet.vue'], resolve)
    // Routes
const routes = [
    { path: '/login', component: login },
    {
        path: '',
        component: app,
        children: [
            { path: '/waste', component: wasteInfo },
            { path: '/order', component: OrderList },
            { path: '/wallet-manage/withdraw',component: WithdrawalList},
            { path: '/wallet-manage/recharge',component: RechargeList},
            { path: '/wallet',component: MyWallet},
            { path: '/resetPwd', component: resetPwd },
            { path: '/system/menu', component: menuList },
            { path: '/system/role', component: role },
            { path: '/system/user', component: sysUser },
            { path: '/system/userAdd', component: userAdd },
            { path: '/system/waste-category', component: category },
            { path: '/system/notice', component: NoticeManager},
        ]
    },
    { path: '*', component: NotFoundView }
]

export default routes
