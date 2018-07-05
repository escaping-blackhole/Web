<template>
  <div id="app">
    <el-container>
      <el-header style="padding: 0;"><Navigation></Navigation></el-header>
      <el-container style="margin-top: 1px;">
        <el-aside style="text-align: left;" width="200px">
          <el-row>
            <el-col :span="24">
              <el-menu
                default-active="1"
                @open="handleOpen"
                :router="true"
                @close="handleClose">
                <el-submenu index="1-1">
                  <template slot="title">
                    <i class="el-icon-search"></i>
                    <span>检索</span>
                  </template>
                  <el-menu-item index="/user">用户检索</el-menu-item>
                  <el-menu-item index="0-1-2">文件检索</el-menu-item>
                  <el-menu-item index="0-1-3">学校检索</el-menu-item>
                  <el-menu-item index="0-1-4">专业检索</el-menu-item>
                  <el-menu-item index="/course">课程检索</el-menu-item>
                </el-submenu>
                <el-submenu index="2-1">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>用户</span>
                  </template>
                  <el-menu-item index="/console/user">用户管理</el-menu-item>
                  <!--<el-menu-item-group title="用户">-->
                  <!--</el-menu-item-group>-->
                </el-submenu>
                <el-submenu index="3-1">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>院校</span>
                  </template>
                  <el-menu-item index="1-3">院校管理</el-menu-item>
                  <el-menu-item index="1-4">专业管理</el-menu-item>
                  <el-menu-item index="/console/course">课程管理</el-menu-item>
                </el-submenu>
                <el-submenu index="4-1">
                  <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>文件</span>
                  </template>
                  <el-menu-item index="/console/file">文件管理</el-menu-item>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main style="padding: 0;">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Navigation from "./components/Navigation";
  export default {
    name: 'App',
    components: { Navigation },
    methods: {
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      }
    }
  }
</script>

<style>
  body {
    padding: 0;
    margin: 0;
  }
  a {
    color: #333333;
    text-decoration: none;
    cursor: pointer;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
</style>
