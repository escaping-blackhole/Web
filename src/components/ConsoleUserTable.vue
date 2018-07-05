<template>
  <div style="text-align: left;">
    <div style="margin: 20px;">
      <el-row>
        <el-button size="small" type="danger" plain @click="multipleDele">多项删除</el-button>
        <el-button size="small" type="success" plain @click="addUser">添加用户</el-button>
        <UserDialog
          v-bind:visible="dialogVisible"
          v-bind:majorList="majorList"
          v-on:dialogClose="closeDialog">
        </UserDialog>
      </el-row>
    </div>
    <el-table
      :data="tableData"
      ref="multipleTable"
      v-loading="loading"
      @selection-change="handleSelectionChange"
      border
      style="width: 100%;">
      <el-table-column
        type="selection"
        width="44">
      </el-table-column>
      <el-table-column
        fixed
        prop="nickname"
        label="花名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="userId"
        label="用户 ID"
        width="120">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="integral"
        label="积分"
        width="100">
      </el-table-column>
      <el-table-column
        prop="userNo"
        label="学号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="userMajor"
        label="专业"
        width="200">
      </el-table-column>
      <el-table-column
        prop="userSchool"
        label="学校"
        width="240">
      </el-table-column>
      <el-table-column
        prop="gmtCreate"
        label="注册日期"
        width="160">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" size="mini">编辑</el-button>
          <el-button @click="handleDele(scope.row)" size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改用户信息" style="margin: 0 auto; text-align: center; width: 800px;" :visible.sync="formVisible">
      <el-form style="text-align: left;" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="userMajor">
          <el-select v-model="ruleForm.userMajor" placeholder="专业列表" style="width: 100%;">
            <el-option
              v-for="item in majorList"
              :key="item.majorId"
              :label="item.majorName"
              :value="item.majorName">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="danger" @click="formVisible = false">取消更新</el-button>
        <el-button size="small" @click="resetForm('ruleForm')">重置表格</el-button>
        <el-button size="small" type="primary" @click="submitForm('ruleForm')">提交更新</el-button>
      </span>
    </el-dialog>
    <div style="margin: 20px;">
      <el-row>
        <el-button size="small" type="danger" plain @click="multipleDele">多项删除</el-button>
        <el-button size="small" type="success" plain @click="addUser">添加用户</el-button>
        <UserDialog
          v-bind:visible="dialogVisible"
          v-bind:majorList="majorList"
          v-on:dialogClose="closeDialog">
        </UserDialog>
      </el-row>
    </div>
    <div class="block" style="text-align: center; margin-top: 20px; margin-bottom: 20px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="pageNum"
        :page-sizes="[10, 20, 30]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableDataTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import request from '../assets/request';
  import UserDialog from "./UserDialog";
  export default {
    name: "UserTable",
    components: {UserDialog},
    data() {
      var checkUsername = function (rule, value, callback) {
        if (!value) {
          return callback(new Error("用户名不得为空！"))
        } else {
        
        }
      };
      return {
        request: new Request(),
        formVisible: false,
        multipleSelection: [],
        loading: true,
        dialogVisible: false,
        ruleForm: {
          userId: '',
          username: '',
          userMajor: '',
          email: '',
          sdept: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
          ],
          email: [
            { type: 'email', required: true, message: '请输入邮箱', trigger: 'blur' }
          ],
          userMajor: [
            { required: true, message: '请选择专业', trigger: 'change' }
          ],
        },
        pageNum: 1,
        pageSize: 10,
        tableDataTotal: 0,
        tableData: [],
        majorList: []
      }
    },
    methods: {
      async getTableData(pageNum, pageSize) {
        this.loading = true;
        var result = await this.request.get('/demo/console/user/list', { pageNum: pageNum || this.pageNum, pageSize: pageSize || this.pageSize });
        result = JSON.parse(result);
        if (result.success) {
          this.tableDataTotal = result.data.total;
          this.tableData = result.data.list;
          this.loading = false;
        }
        // 获取专业列表
        this.getMajorList();
      },
      async getMajorList() {
        var result = await this.request.get('/demo/console/major/list', { pageNum: 1, pageSize: 100 });
        result = JSON.parse(result);
        if (result.success) {
          this.majorList = result.data.list;
        }
      },
      async deleteUser() {
        this.loading = true;
        var result = await this.request.delete('/demo/console/user/' + this.multipleSelection, {});
        result = JSON.parse(result);
        if (result.success) {
          console.log(result);
        }
        this.getTableData();
        this.loading = false;
      },
      async updateUser(val) {
        console.log(val);
        var result = await this.request.put('demo/console/user/' + val.userId, {
          username: val.username,
          nickname: val.nickname,
          password: val.password,
          email: val.email,
          userSchool: val.userSchool,
          userNo: val.userNo,
          userMajor: val.userMajor,
          integral: val.integral
        });
        result = JSON.parse(result);
        if (result.success) {
          this.getTableData(this.pageNum, this.pageSize);
        }
      },
      addUser() {
        // 改变子组件的状态
        this.dialogVisible = true;
      },
      closeDialog() {
        // 提供子组件的通信接口
        this.dialogVisible = false;
        // this.getTableData();
      },
      handleSelectionChange(val) {
        this.multipleSelection = [];
        for (var item of val) {
          this.multipleSelection.push(item.userId)
        }
      },
      handleEdit(row) {
        this.formVisible = true;
        this.ruleForm.username = row.username;
        this.ruleForm.email = row.email;
        this.ruleForm.userId = row.userId;
        this.ruleForm.userMajor = row.userMajor;
        this.ruleForm.sdept = row.sdept;
      },
      multipleDele() {
        if (this.multipleSelection.length === 0) return;
        this.deleteUser();
      },
      handleDele(row) {
        this.multipleSelection = row.userId;
        this.deleteUser();
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getTableData(undefined, val);
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.getTableData(val, undefined);
      },
      submitForm(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            this.formVisible = false;
            this.updateUser(this.ruleForm);
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        // this.$refs[formName].resetFields();
        for (var item in this.ruleForm) {
          this.ruleForm[item] = '';
        }
      }
    },
    created() {
      this.getTableData();
    }
  }
</script>

<style scoped>

</style>
