import NotFoundView from "../components/404.vue";
import menuList from "../pages/sys/menu.vue";
import role from "../pages/sys/role.vue";
import login from "../pages/login.vue";
import app from "../App.vue";
import sysUser from "../pages/sys/user.vue";
import userAdd from "../pages/sys/userAdd.vue";
import resetPwd from "../pages/resetPwd.vue";

const AdminOrderList = resolve => require(['../pages/order/AdminOrderList.vue'], resolve)
const BusinessOrderList = resolve => require(['../pages/order/BusinessOrderList.vue'], resolve)
const WithdrawalList = resolve => require(['../pages/walletmgr/withdrawalList.vue'], resolve)
const RechargeList = resolve => require(['../pages/walletmgr/rechargeList.vue'], resolve)
const wasteInfo = resolve => require(['../pages/wasteInfo/wasteInfo'], resolve)
const category = resolve => require(['../pages/sys/category'], resolve)
const personalCenter = resolve => require(['../pages/sys/percenal-center'], resolve)
const config = resolve => require(['../pages/sys/config'], resolve)
const authorization = resolve => require(['../pages/sys/authorization'], resolve)
const document = resolve => require(['../pages/sys/document.vue'], resolve)
const classesService = resolve => require(['../pages/wasteInfo/classesService.vue'], resolve)
const classesServiceManagement = resolve => require(['../pages/wasteInfo/classesServiceManagement.vue'], resolve)
const classesOrder = resolve => require(['../pages/order/classesOrder.vue'], resolve)
const JoinUs = resolve => require(['../pages/sys/join-us'], resolve)
const NoticeManager = resolve => require(['../pages/notice/NoticeManager.vue'], resolve)
const UserNoticeList = resolve => require(['../pages/notice/UserNoticeList.vue'], resolve)
const MyWallet = resolve => require(['../pages/wallet/MyWallet.vue'], resolve)
const BusinessConsole = resolve => require(['../pages/console/BusinessConsole.vue'], resolve)
const AdminConsole = resolve => require(['../pages/console/AdminConsole.vue'], resolve)
const Home = resolve => require(['../pages/console/Home.vue'], resolve)
const LoginLog = resolve => require(['../pages/log/LoginLog.vue'], resolve)
const SystemLog = resolve => require(['../pages/log/SystemLog.vue'], resolve)
const OnlineUserList = resolve => require(['../pages/log/OnlineUserList.vue'], resolve)


const routes = [
    { path: '/login', component: login },
    {
        path: '',
        component: app,
        children: [
            { path: '', redirect:'/home' },
            { path: '/waste', component: wasteInfo },
            { path: '/admin-order', component: AdminOrderList},
            { path: '/business-order', component: BusinessOrderList},
            { path: '/home', component: Home},
            { path: '/busi-console',component:BusinessConsole},
            { path: '/console',component:AdminConsole},
            { path: '/personal-center', component: personalCenter },
            { path: '/system/config', component: config },
            { path: '/wallet-manage/withdraw',component: WithdrawalList},
            { path: '/wallet-manage/recharge',component: RechargeList},
            { path: '/log/login-log',component: LoginLog},
            { path: '/log/system-log',component: SystemLog},
            { path: '/log/online-user',component: OnlineUserList},
            { path: '/wallet',component: MyWallet},
            { path: '/resetPwd', component: resetPwd },
            { path: '/system/menu', component: menuList },
            { path: '/system/role', component: role },
            { path: '/system/user', component: sysUser },
            { path: '/system/userAdd', component: userAdd },
            { path: '/system/waste-category', component: category },
            { path: '/system/notice', component: NoticeManager},
            { path: '/system/user-notice', component: UserNoticeList},
            { path: '/system/join-us', component: JoinUs},
            { path: '/system/document', component: document},
            { path: '/classes-service', component: classesService},
            { path: '/classes-service-manage', component: classesServiceManagement},
            { path: '/classes-order', component: classesOrder},
            //{ path: '/system/authorization', component: authorization},
        ]
    },
    { path: '*', component: NotFoundView }
]

export default routes
