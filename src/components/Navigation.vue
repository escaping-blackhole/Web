<template>
  <el-menu :default-active="activeIndex"
           mode="horizontal"
           @select="handleSelect">
    <el-menu-item index="center">
      <router-link
        style="width: 100%; height: 100%; display: inline-block; text-decoration: none;"
        to="/home">
        {{ indexConf.text[0] }}
      </router-link>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">工作台</template>
      <el-menu-item index="2-1">
        <router-link
          style="width: 100%; height: 100%; display: inline-block; text-decoration: none;"
          to="/admin">
          {{ indexConf.text[0] }}
        </router-link>
      </el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="upload">
      <router-link
        style="width: 100%; height: 100%; display: inline-block; text-decoration: none;"
        to="/upload">
        {{ indexConf.text[2] }}
      </router-link>
    </el-menu-item>
    <el-menu-item index="" style="float: right; margin-right: 20px; border-bottom: 2px transparent">
      <el-button type="success" size="small" @click="openDialog" plain>登录</el-button>
    </el-menu-item>
    <AdminLoginDialog
      v-bind:visible="dialogVisible" v-on:closeDialog="closeDialog">
    </AdminLoginDialog>
  </el-menu>
</template>

<script>
  import AdminLoginDialog from "./AdminLoginDialog";
  export default {
    name: "Navigation",
    components: {AdminLoginDialog},
    data() {
      return {
        activeIndex: "2-1",
        dialogVisible: false,
        indexConf: {
          tag:["center", "pensonal", "upload"],
          text: ["消息中心", "主页", "上传文件"]
        }
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      openDialog() {
        this.dialogVisible = true;
      },
      closeDialog() {
        this.dialogVisible = false;
      }
    }
  }
</script>

<style scoped>

</style>
