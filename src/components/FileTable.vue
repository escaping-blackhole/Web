<template>
  <div style="text-align: left;">
    <el-button
      size="mini"
      type="danger"
      style="margin: 20px 20px;"
      @click="deleteAll">多选删除</el-button>
    <el-table
      :data="tableData"
      ref="multipleTable"
      @selection-change="selectionChanged"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="40">
      </el-table-column>
      <el-table-column width="40" type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="文件名：">
              <span>{{ props.row.file_name }}</span>
            </el-form-item>
            <el-form-item label="姓名：">
              <span>{{ props.row.filename }}</span>
            </el-form-item>
            <el-form-item label="课程：">
              <span>{{ props.row.course }}</span>
            </el-form-item>
            <el-form-item label="类型：">
              <span>{{ props.row.type }}</span>
            </el-form-item>
            <el-form-item label="花名：">
              <span>{{ props.row.nickname }}</span>
            </el-form-item>
            <el-form-item label="下载：">
              <span>{{ props.row.download_count }}</span>
            </el-form-item>
            <el-form-item label="学号：">
              <span>{{ props.row.user_no }}</span>
            </el-form-item>
            <el-form-item label="收藏：">
              <span>{{ props.row.collect_count }}</span>
            </el-form-item>
            <el-form-item label="专业：">
              <span>{{ props.row.major }}</span>
            </el-form-item>
            <el-form-item label="喜欢：">
              <span>{{ props.row.like_count }}</span>
            </el-form-item>
            <el-form-item label="学校：">
              <span>{{ props.row.school }}</span>
            </el-form-item>
            <el-form-item label="创建日期：">
              <span>{{ props.row.gmt_create }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="文件名">
        <template slot-scope="scope">
          <span>{{ scope.row.file_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="50"
        label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.state }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="80"
        label="类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="120"
        label="拥有者">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>花名: {{ scope.row.nickname }}</p>
            <p>姓名: {{ scope.row.filename }}</p>
            <p>学号: {{ scope.row.user_no }}</p>
            <p>专业: {{ scope.row.major }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.filename }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="创建日期">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="日期">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      size="mini"
      type="danger"
      style="margin: 20px 20px;"
      @click="deleteAll">多选删除</el-button>
    <el-dialog title="修改文件信息" style="margin: 0 auto; text-align: center; width: 800px;" :visible.sync="formVisible">
      <el-form style="text-align: left;" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="文件名" prop="filename">
          <el-input v-model="ruleForm.filename"></el-input>
        </el-form-item>
        <el-form-item label="课程" prop="course">
          <el-input v-model="ruleForm.course"></el-input>
        </el-form-item>
        <el-form-item label="学校" prop="userSchool">
          <el-select v-model="ruleForm.userSchool" placeholder="学校列表" style="width: 100%;">
            <el-option label="湖北汽车工业学院" value="湖北汽车工业学院"></el-option>
            <el-option label="湖北医药学原" value="湖北医药学原"></el-option>
            <el-option label="湖北汽车工业科技学院" value="湖北汽车工业科技学院"></el-option>
            <el-option label="华中科技大学" value="华中科技大学"></el-option>
            <el-option label="华中师范大学" value="华中师范大学"></el-option>
            <el-option label="武汉大学" value="武汉大学"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="userMajor">
          <el-select v-model="ruleForm.userMajor" placeholder="专业列表" style="width: 100%;">
            <el-option label="计算机科学与技术" value="计算机科学与技术"></el-option>
            <el-option label="软件工程" value="软件工程"></el-option>
            <el-option label="机械制造及自动化" value="机械制造及自动化"></el-option>
            <el-option label="国际经济与贸易" value="国际经济与贸易"></el-option>
            <el-option label="视觉设计" value="视觉设计"></el-option>
            <el-option label="产品设计" value="产品设计"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" type="danger" @click="formVisible = false">取消更新</el-button>
        <el-button size="medium" @click="resetForm('ruleForm')">重置表格</el-button>
        <el-button size="medium" type="primary" @click="submitForm('ruleForm')">提交更新</el-button>
      </span>
    </el-dialog>
    <div class="block" style="text-align: center; margin-bottom: 20px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableDataTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import request from '../assets/request';
  
  export default {
    name: "AdminFileTable",
    data: function () {
      return {
        request: new Request(),
        formVisible: false,
        ruleForm: {
          filename: '',
          userMajor: '',
          course: '',
          userSchool: ''
        },
        rules: {
          filename: [
            { required: true, message: '请输入文件名', trigger: 'blur' },
            { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
          ],
          course: [
            { required: true, message: '请输入课程', trigger: 'blur' }
          ],
          userSchool: [
            { required: true, message: '请选择学校', trigger: 'change' }
          ],
          userMajor: [
            { required: true, message: '请选择专业', trigger: 'change' }
          ],
        },
        multipleSelection: [],
        pageNum: 4,
        pageSize: 10,
        tableDataTotal: 32,
        tableData: [
          {
            file_name: "数据库系统设计与实现",
            file_hash: "0ffd00",
            download_count: 120,
            collect_count: 199,
            like_count: 100,
            nickname: "元芳",
            course: "数据库",
            type: "Word",
            path: "/image/",
            user_no: "201500772",
            state: 1,
            gmt_create: "2015-05-02",
            school: "湖北汽车工业学院",
            filename: '阿妈那阿妈',
            major: '软件工程'
          },
          {
            file_name: "软件工程导论",
            file_hash: "0ffdee",
            download_count: 120,
            collect_count: 199,
            like_count: 100,
            nickname: "元芳",
            course: "数据库",
            type: "Word",
            path: "/image/",
            user_no: "201500772",
            state: 1,
            gmt_create: "2015-05-02",
            school: "湖北汽车工业学院",
            filename: '阿妈那阿妈',
            major: '软件工程'
          },
          {
            file_name: "操作系统原理",
            file_hash: "0edd55",
            download_count: 120,
            collect_count: 199,
            like_count: 100,
            nickname: "元芳",
            course: "数据库",
            type: "Word",
            path: "/image/",
            user_no: "201500772",
            state: 1,
            gmt_create: "2015-05-02",
            school: "湖北汽车工业学院",
            filename: '阿妈那阿妈',
            major: '软件工程'
          },
        ]
      }
    },
    methods: {
      handleEdit(index, row) {
        this.formVisible = true;
        this.ruleForm.filename = row.filename;
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      selectionChanged(val) {
        console.log("selectionChanged", val);
        this.multipleSelection = [];
        for (var item of val) {
          this.multipleSelection.push(item.file_hash.toUpperCase());
        }
        console.log(this.multipleSelection);
      },
      async deleteAll() {
        var request = new Request();
        var result = await request.get('/e/test', { pageNum: this.pageNum, pageSize: this.pageSize });
        console.log("deleteAll", result);
        if (this.multipleSelection.length > 0) {
          var selectionSet = new Set(this.multipleSelection);
          var selectionBuffer = [];
          for (var item of this.multipleSelection) {
            if (selectionSet.has(item)) {
              console.log("含有", item);
            } else {
              console.log("不含有", item);
            }
          }
        }
      },
      handleSizeChange(val) {
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.pageNum = val;
      },
      submitForm(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            this.formVisible = false;
            // this.updateUser(this.ruleForm);
          } else {
            return false;
          }
        });
      },
      resetForm() {
        for (var item in this.ruleForm) {
          this.ruleForm[item] = '';
        }
      }
    }
  }
</script>

<style scoped>
  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
