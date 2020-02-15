<template>
  <el-submenu :index="item.menuUrl" v-if="item.childs && item.childs.length>0" class="el-menu-sub">
    <template slot="title"><i :class="item.icon"></i><span>{{item.menuName}}</span></template>
    <template v-for="child in item.childs">
      <sub-menu v-if="child.childs && child.childs.length>0" :param="child"></sub-menu>
      <el-menu-item :index="child.menuUrl" v-else><i :class="child.icon"></i><span>{{child.menuName}}</span></el-menu-item>
    </template>
  </el-submenu>
  <el-menu-item :index="item.menuUrl" v-else class="el-menu-each"><i :class="item.icon"></i><span>{{item.menuName}}</span></el-menu-item>
</template>
<script>
  import subMenu from "./subMenu.vue"

  export default {
    name: 'subMenu',
    props: ['param'],
    data: function () {
      return {item: this.param}
    },
    components: {
      subMenu
    }
  }
</script>
<style>
  .el-menu .fa {
    margin-right: 10px;
  }
</style>
