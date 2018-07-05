<template>
  <el-dialog
    title="提示"
    :visible.sync="visible"
    width="30%"
    :before-close="handleClose">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import SimpleLogin from "./SimpleLogin";
  export default {
    name: "AdminLoginDialog",
    components: { SimpleLogin },
    props: ['visible'],
    data() {
      return {
        dialogVisible: false
      }
    },
    methods: {
      handleClose(done) {
      }
    }
  }
</script>

<style scoped>

</style>
