<template>
  <el-dialog
    title="登录"
    :visible.sync="visible"
    width="360px"
    :before-close="handleClose">
    <span style="display: inline-block; margin: 10px 0; color: #f56c6c;">对不起，您的登录信息已过期请您重新登录。</span>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm.username" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%;" type="primary" :loading="loading" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
    <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button @click="cancleLogin">取 消</el-button>-->
    <!--<el-button type="primary" @click="login">确 定</el-button>-->
    <!--</span>-->
  </el-dialog>
</template>

<script>
  import SimpleLogin from "./SimpleLogin";
  export default {
    name: "AdminLoginDialog",
    components: { SimpleLogin },
    props: ['visible'],
    data() {
      var checkUsername = async (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不得为空'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        dialogVisible: false,
        loading: false,
        // request: new Request(),
        ruleForm: {
          username: '',
          nickname: '',
          pass: '',
          checkPass: '',
        },
        rules: {
          username: [
            { validator: checkUsername, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleClose() {
        this.$emit('closeDialog', '');
        this.resetForm('ruleForm');
      },
      login() {
        this.handleClose();
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            this.loading = true;
            var result = await this.request.post('/demo/console/login', {
              adminname: this.ruleForm.username,
              password: this.ruleForm.pass
            });
            console.log(result);
            result = JSON.parse(result);
            this.loading = false;
            if (result.success) {
              this.$message({
                message: '登录成功',
                type: 'success'
              });
            } else {
              this.$message.error(result.msg || "登录失败，请稍后重试。");
            }
            this.handleClose();
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>
