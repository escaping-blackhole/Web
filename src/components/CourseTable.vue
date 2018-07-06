<template>
  <div style="text-align: left; width: 80%; margin: 20px auto;">
    <div>
      <el-input placeholder="请输入内容" v-model="inputText">
        <el-select style="width: 150px" v-model="select" slot="prepend" placeholder="请选择课程分类">
          <el-option
            style="width: 180px"
            label="所有专业"
            value="">
          </el-option>
          <el-option
            style="width: 180px"
            v-for="item in majorList"
            :key="item.majorId"
            :label="item.majorName"
            :value="item.majorName">
          </el-option>
        </el-select>
        <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        property="courseId"
        label="课程编号"
        width="180">
      </el-table-column>
      <el-table-column
        property="courseName"
        label="课程名"
        width="220">
      </el-table-column>
      <el-table-column
        prop="majorName"
        label="所属专业"
        :filters="tableFilters"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="['', 'primary', 'success', 'info', 'warning', 'primary', 'success', ''][scope.row.courseId % 7]"
            disable-transitions>{{scope.row.majorName}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
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
  export default {
    courseName: "CourseTable",
    data() {
      return {
        // request: new Request(),
        loading: false,
        pageNum: 1,
        pageSize: 10,
        tableDataTotal: 0,
        inputText: '',
        select: '',
        majorList: [],
        tableFilters: [],
        tableData: []
      }
    },
    methods: {
      async getTableData(pageNum, pageSize, majorName) {
        this.loading = true;
        var result = await this.request.get('/demo/console/course/list', {
          pageNum: pageNum || this.pageNum,
          pageSize: pageSize || this.pageSize,
          majorName: majorName || ''
        });
        result = JSON.parse(result);
        if (result.success) {
          this.tableDataTotal = result.data.total;
          this.tableData = result.data.list;
        }
        this.getMarjorList();
        this.loading = false;
      },
      async getMarjorList() {
        var result = await this.request.get('/demo/console/major/list', { pageNum: 1, pageSize: 100 });
        result = JSON.parse(result);
        if (result.success) {
          // 重新组织过滤的值
          this.tableFilters = [];
          this.majorList = result.data.list;
          for (var item of result.data.list) {
            var tag = {
              text: item.majorName,
              value: item.majorName,
              key: item.majorId
            };
            this.tableFilters.push(tag);
          }
        }
      },
      filterTag(value, row) {
        return row.majorName === value;
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getTableData(undefined, val);
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.getTableData(val, undefined);
      },
      async search() {
        var result = this.request.get('/demo/console/course/list', {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          majorName: this.select,
          courseName: this.inputText
        });
        result = JSON.parse(await result);
        if (result.success) {
          this.tableData = result.data.list;
          this.tableDataTotal = result.data.total;
        }
      }
    },
    created() {
      this.getTableData();
    }
  }
</script>

<style scoped>
  .el-select .el-input {
    width: 180px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
