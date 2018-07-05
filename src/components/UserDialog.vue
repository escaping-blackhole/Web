<template>
  <el-dialog
    title="提示"
    :visible.sync="visible"
    :before-close="closeDialog"
    width="60%">
    <el-form style="text-align: left;" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item style="width: 45%; display: inline-block;"
                    label="花名" prop="nickname">
        <el-input v-model="ruleForm.nickname"></el-input>
      </el-form-item>
      <el-form-item style="width: 45%; display: inline-block;"
                    label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item style="width: 45%; display: inline-block;"
                    label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass"></el-input>
      </el-form-item>
      <el-form-item style="width: 45%; display: inline-block;"
                    label="学校" prop="userSchool">
        <el-input v-model="ruleForm.userSchool"></el-input>
      </el-form-item>
      <el-form-item style="width: 45%; display: inline-block;"
                    label="学号" prop="userId">
        <el-input v-model="ruleForm.userId"></el-input>
      </el-form-item>
      <el-form-item style="width: 45%; display: inline-block;"
                    label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item style="width: 45%; display: inline-block;"
                    label="专业" prop="userMajor">
        <el-select v-model="ruleForm.userMajor" placeholder="专业列表" style="width: 100%;">
          <el-option
            v-for="item in majorList"
            :key="item.majorId"
            :label="item.majorName"
            :value="item.majorName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="width: 45%; display: inline-block;"
                    label="积分" prop="integral">
        <el-input v-model="ruleForm.integral"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="danger" @click="cancleForm">取消添加</el-button>
      <el-button size="small" @click="resetForm('ruleForm')">重置表格</el-button>
      <el-button size="small" type="primary" @click="submitForm('ruleForm')">添加用户</el-button>
    
    </span>
  </el-dialog>
</template>

<script>
  import request from '../assets/request';
  export default {
    name: "UserDialog",
    // 父组件传递的参数
    props: ['visible', 'majorList'],
    data() {
      var checkUsername = async (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入用户名'));
        } else {
          var request = new Request();
          var result = await request.post('/demo/user/check', { username: this.ruleForm.username });
          result = JSON.parse(result);
          if (result.success) {
            callback();
          } else {
            return callback(new Error(result.msg));
          }
        }
      };
      var checkNickname = async (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入花名'));
        } else {
          var request = new Request();
          var result = await request.post('/demo/user/check', { nickname: this.ruleForm.nickname });
          result = JSON.parse(result);
          if (result.success) {
            callback();
          } else {
            return callback(new Error(result.msg));
          }
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var checkIntegral = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入积分'));
        } else {
          if (isNaN(parseInt(value))) {
            callback(new Error('积分非法'));
          } else {
            callback();
          }
        }
      };
      return {
        request: new Request(),
        dialogVisible: false,
        ruleForm: {
          nickname: '',
          userId: '',
          username: '',
          userMajor: '',
          email: '',
          userSchool: '',
          pass: '',
          integral: 0
        },
        rules: {
          username: { required: true, validator: checkUsername, trigger: 'blur' },
          nickname: { required: true, validator: checkNickname, trigger: 'blur' },
          email: [
            { type: 'email', required: true, message: '请输入邮箱', trigger: 'blur' }
          ],
          userMajor: [
            { required: true, message: '请选择专业', trigger: 'change' }
          ],
          userId: [
            { required: true, message: '请输入学号', trigger: 'blur' }
          ],
          userSchool: [
            { required: true, message: '请输入学校', trigger: 'blur' }
          ],
          pass: [
            { required: true, validator: validatePass, trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
          ],
          integral: [
            { required: true, validator: checkIntegral, trigger: 'blur' }
          ]
        },
      };
    },
    methods: {
      closeDialog() {
        // 委托父组件关闭弹框
        this.$emit('dialogClose', '');
      },
      submitForm(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            this.closeDialog();
            var result = this.request.post('/demo/user/signup', {
              nickname: this.ruleForm.nickname,
              username: this.ruleForm.username,
              password: this.ruleForm.pass,
              email: this.ruleForm.email,
              userSchool: this.ruleForm.userSchool,
              userId: this.ruleForm.userId,
              userMajor: this.ruleForm.userMajor,
              integral: this.ruleForm.integral
            });
            result = JSON.parse(await result);
            if (result.success) {
              this.$message({
                message: '添加用户信息成功',
                type: 'success'
              });
            } else {
              this.$message.error('添加用户信息失败');
            }
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      cancleForm() {
        this.closeDialog();
      }
    }
  }
</script>

<style scoped>

</style>
