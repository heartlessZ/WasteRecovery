import Vue from "vue";
import Vuex from "vuex";
import types from "./mutation-types";
import defaultValue from "../services/default";
import * as api from "../api";
import { getCurrentMenu, getSessionKey } from '../common/utils'
import { getMenuListByUserId } from '../api/system'
import user from './modules/user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: true, // process.env.NODE_ENV !== 'production', 直接修改state 抛出异常
    modules: {
        user
    },
    getters: {
        loading: state => state.loading,
        menuList: state => state.menuList,
        sidebar: state => state.sidebar,
        //userInfo: state => state.userInfo,
        device: state => state.device,
        currentMenus: state => state.currentMenus,
        //user
        avatar: state => state.user.avatar,
        isLogin: state => state.user.isLogin,
        name: state => state.user.name,
        roles: state => state.user.roles,
        userInfo: state => state.user.userInfo,
        userId: state => state.user.userId,
        regionId: state => state.user.regionId,
        rootCategories: state => state.user.rootCategories,
        childrenCategories: state => state.user.childrenCategories
    },
    state: {
        loading: false,
        menuList: {},
        sidebar: {
            collapsed: getSessionKey('state.sidebar.collapsed', 'false') === 'true',
            show: getSessionKey('state.sidebar.show', 'true') === 'true',
        },
        device: {
            isMobile: false
        },
        //userInfo: { name: '佚名' },
        currentMenus: [],
    },
    mutations: {
        //只能同步的函数
        [types.TOGGLE_DEVICE](state, isMobile) {
            state.device.isMobile = isMobile
        },
        [types.TOGGLE_LOADING](state) {
            state.loading = !state.loading
        },
        [types.LOAD_MENU](state, menu) {
            state.menuList = menu;
        },
        [types.LOAD_CURRENT_MENU](state, menu) {
            state.currentMenus = menu;
        },
        [types.SET_USER_INFO](state, info) {
            state.userInfo = info;
        },
        [types.TOGGLE_SIDEBAR](state, collapsed) {
            if (collapsed == null) collapsed = !state.sidebar.collapsed;
            state.sidebar.collapsed = collapsed;
            window.sessionStorage.setItem("state.sidebar.collapsed", collapsed)
        },
        [types.TOGGLE_SIDEBAR_SHOW](state, show) {
            if (show == null) state.sidebar.show = !state.sidebar.show;
            else {
                state.sidebar.show = show;
            }
            window.sessionStorage.setItem("state.sidebar.show", state.sidebar.show)
        },
    },
    actions: {
        //异步的函数
        toggleLoading: ({ commit }) => commit(types.TOGGLE_LOADING),
        loadMenuList: ({ commit }) => {
            getMenuListByUserId(store.getters.userInfo.id).then(res => {
                console.log(res)
                commit(types.LOAD_MENU, res.data);
            }).catch();
        },
        changeCurrentMenu: ({ state, commit }, { path, matched, fullPath }) => {
            const a = getCurrentMenu(fullPath, state.menuList);
            commit(types.LOAD_CURRENT_MENU, a.reverse());
        }
    },
})

export default store
