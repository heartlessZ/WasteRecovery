<template>
  <header class="main-header animated" :class="{closeLogo:sidebar.collapsed,mobileLogo:device.isMobile}">
    <a href="#" class="logo">
      <span class="logo-lg">
        <i class="fa fa-diamond"></i>&nbsp;
        <b>环保卫士后台管理系统</b>
      </span>
    </a>
    <nav class="navbar">
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button" @click.stop.prevent="toggleMenu(!sidebar.collapsed,device.isMobile)">
      </a>
      <div class="navbar-custom-menu">
        <el-dropdown class="navbar-dropdown">
          <div class="el-dropdown-link" style="height: auto;line-height: inherit" @click="onClickNotice">
            <el-badge :value="count" class="item" style="margin-right: 10px;">
              <i class="el-icon-message-solid" style="font-size: 20px;"></i>
            </el-badge>
          </div>
          <el-dropdown-menu></el-dropdown-menu>
        </el-dropdown>

        <el-dropdown trigger="click" class="navbar-dropdown">
          <div class="el-dropdown-link">
            <img :src='userInfo.avatar' style="width: 25px;height: 25px;border-radius: 50%; vertical-align: middle;"
              alt="U">
            {{userInfo.nikeName}}
          </div>
          <el-dropdown-menu style="padding: 0px">
            <div>
              <div class="header-pic">
                <img :src='userInfo.avatar' class="img-circle" alt="User Image">
                <p>{{userInfo.nikeName}}</p>
              </div>
              <div class="pull-left">
                <router-link :to="{ path: '/personal-center' }">
                  <el-button type="default">个人中心</el-button>
                </router-link>
              </div>
              <div class="pull-right">
                <el-button type="default" @click="logout">退出</el-button>
              </div>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </nav>
  </header>
</template>
<script>
  import {
    mapGetters,
    mapActions,
    mapMutations
  } from 'vuex'
  import types from "../../store/mutation-types"
  import * as api from "../../api"
  import auth from '../../common/auth'
  import * as sysApi from '../../services/sys'
  import {
    userFindNewNoticeNum
  } from '@/api/notice.js'
  export default {
    data() {
      return {
        showMessageBox: false,
        showProfileBox: false,
        list: [],
        count: null,
        show: true,
        websock: null
      }
    },
    computed: mapGetters({
      sidebar: 'sidebar',
      userInfo: 'userInfo',
      device: 'device',
    }),
    created() {

    },
    beforeDestroy() {
      console.log('销毁')
      this.websock.close() //离开路由之后断开websocket连接
    },
    methods: {
      toggleMenu(collapsed, isMobile) {
        if (isMobile) {
          this.toggleSidebarShow();
        } else {
          this.toggleSidebar();
        }
      },
      //点击公告图标事件
      onClickNotice() {
        this.$router.push({
          path: '/system/user-notice'
        })
        this.count = null
      },
      logout() {
        this.$store.dispatch('LogOut').then(res => {
          this.$router.push('/login')
        })
      },
      ...mapMutations({
        toggleSidebar: types.TOGGLE_SIDEBAR,
        toggleSidebarShow: types.TOGGLE_SIDEBAR_SHOW,
        setUserInfo: types.SET_USER_INFO,
      }),
      toggleMessage() {
        this.showMessageBox = !this.showMessageBox;
      },
      toggleProfile() {
        this.showProfileBox = !this.showProfileBox;
      },
      autoHide(evt) {
        if (!this.$el.querySelector('li.messages-menu').contains(evt.target)) {
          this.showMessageBox = false
        }
        if (!this.$el.querySelector('li.user-menu').contains(evt.target)) {
          this.showProfileBox = false
        }
      },
      initWebSocket() { //初始化weosocket
        //判断当前浏览器是否支持WebSocket
        if ('WebSocket' in window) {
          const wsuri = "ws://safeclean.tx-q.cn:4399/webSocket/" + this.userInfo.username;
          this.websock = new WebSocket(wsuri);
          this.websock.onmessage = this.websocketonmessage;
          this.websock.onopen = this.websocketonopen;
          this.websock.onerror = this.websocketonerror;
          this.websock.onclose = this.websocketclose;
          console.log("初始化")
        } else {
          alert('当前浏览器 Not support websocket')
        }
      },
      websocketonopen() { //连接建立之后执行send方法发送数据
        console.log("连接成功!")
      },
      websocketonerror() { //连接建立失败重连
        console.log("连接失败调用")
        this.initWebSocket();
      },
      websocketonmessage(e) { //数据接收
        console.log('websocket返回数据')
        var data = JSON.parse(e.data)
        this.$notify.info({
          title: data.data.title,
          message: data.data.message+data.data.sendTime
        });
        console.log(data)
      },
      websocketsend(Data) { //数据发送
        this.websock.send(Data);
      },
      websocketclose(e) { //关闭
        console.log('断开连接', e);
      }
    },
    created() {
      sysApi.msgList()
        .then(res => {
          if (res && res.length > 0) {
            this.count = res.length;
            this.list = res;
          }
        })
    },
    mounted() {
      //查询新公告数目
      userFindNewNoticeNum().then((res) => {
        if (res.status) {
          if (res.num == 0) {
            this.count = null
          } else {
            this.count = res.num
          }
        } else {
          this.$message.error(res.msg)
        }
      }).catch((err) => {
        this.$message.error(err.message)
      })
      this.initWebSocket();
    },
  }
</script>
<style scoped>
  .animated {
    animation-duration: 0.2s;
  }

  .main-header a {
    text-decoration: none;
    color: #48576a;
  }

  .main-header {
    position: fixed;
    min-width: 100%;
    box-shadow: 0 2px 3px hsla(0, 0%, 7%, 0.1), 0 0 0 1px hsla(0, 0%, 7%, 0.1);
    z-index: 1999;
    animation-name: slideInDown;
    animation-fill-mode: both;
    color: #48576a;
  }

  .main-header .navbar .sidebar-toggle {
    float: left;
    background-color: transparent;
    background-image: none;
    padding: 15px 15px;
    font-family: fontAwesome;
    line-height: 20px;
  }

  .main-header .navbar .sidebar-toggle:before {
    content: "\f03b";
  }

  .main-header {
    background-color: #ffffff;
  }

  .main-header .logo {
    -webkit-transition: width 0.3s ease-in-out;
    -o-transition: width 0.3s ease-in-out;
    transition: width 0.3s ease-in-out;
    display: block;
    float: left;
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    text-align: center;
    width: 230px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    padding: 0 15px;
    font-weight: 300;
    overflow: hidden;
    text-decoration: none;
  }

  .main-header .logo .logo-lg {
    display: block;
    height: 38px;
    line-height: 38px;
    margin-top: 6px;
  }

  .main-header .navbar {
    -webkit-transition: margin-left 0.3s ease-in-out;
    -o-transition: margin-left 0.3s ease-in-out;
    transition: margin-left 0.3s ease-in-out;
    margin-bottom: 0;
    margin-left: 230px;
    border: none;
    min-height: 50px;
    border-radius: 0;
    background-color: #ffffff;
  }

  .layout-top-nav .main-header .navbar {
    margin-left: 0;
  }

  body.hold-transition .main-header .navbar,
  body.hold-transition .main-header .logo {
    -webkit-transition: none;
    -o-transition: none;
    transition: none;
  }

  .main-header .navbar .sidebar-toggle {
    display: block;
  }

  .main-header .navbar .sidebar-toggle:hover {
    background: #f9f9f9;
  }

  .main-header .logo {
    border-bottom: 0 solid transparent;
  }

  @media (max-width: 800px) {
    .main-header .logo {
      display: none;
    }


    @media (max-width: 800px) {

      .main-header .logo {
        display: none;
      }

      .main-header .navbar {
        margin: 0;
      }

      .main-header .logo,
      .main-header .navbar {
        width: 100%;
        float: none;
      }

    }

    .main-header.closeLogo .navbar {
      margin-left: 44px;
    }

    .main-header.closeLogo .logo {
      width: 44px;
      padding: 0 8px;
    }

    .main-header.closeLogo .logo .logo-lg b {
      display: none;
    }

    .main-header.closeLogo .sidebar-toggle {
      background: #f9f9f9;
    }
  }

  .main-header.closeLogo .navbar {
    margin-left: 44px;
  }

  .main-header.closeLogo .logo {
    width: 44px;
    padding: 0 8px;
  }

  .main-header.closeLogo .logo .logo-lg b {
    display: none;
  }

  .main-header.closeLogo .sidebar-toggle {
    background: #f9f9f9;
  }

  .main-header.closeLogo .navbar .sidebar-toggle:before {
    content: "\f03c";
  }

  .navbar-custom-menu {
    float: right;
  }

  .navbar-custom-menu .el-dropdown-link {
    cursor: pointer;
    height: 50px;
    padding: 13px 5px;
    min-width: 50px;
    text-align: center;
  }

  .navbar-custom-menu .el-dropdown-link img {
    background-color: #108ee9;
  }

  .navbar-custom-menu .el-dropdown-link:hover {
    background: #f9f9f9;
  }

  .message-list {
    list-style: none;
    padding: 0 10px;
  }

  .message-list li {
    list-style: none;
    height: 25px;
    line-height: 25px;
  }

  .message-list li a {
    text-decoration: none;
    color: #666666;
  }

  .message-list li:hover {
    background-color: #f9f9f9;
  }

  .el-dropdown-menu .header-pic {
    text-align: center;
    background-color: #108ee9;
    padding: 20px;
  }

  .el-dropdown-menu .header-pic img {
    vertical-align: middle;
    height: 90px;
    width: 90px;
    border: 3px solid;
    border-color: transparent;
    border-color: hsla(0, 0%, 100%, .2);
    background-color: #108ee9;
  }

  .el-dropdown-menu .header-pic p {
    font-size: 1.5rem;
    color: #ffffff;
  }

  .el-dropdown-menu .pull-left {
    background-color: #f9f9f9;
    padding: 10px;
    display: inline-block;
    float: left;
  }

  .el-dropdown-menu .pull-right {
    background-color: #f9f9f9;
    padding: 10px;
    float: right;
    display: inline-block;
  }
</style>
