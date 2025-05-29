<template>
  <div class="app-container">
    <div class="header-container">
      <h4>门禁控制器</h4>
      <div class="button-container">
        <el-button size="mini" icon="el-icon-plus" type="primary">新增</el-button>
        <el-button size="mini" icon="el-icon-search">查找</el-button>
      </div>
    </div>
    <div class="table-container">
      <el-table
        :header-cell-style="{ background: '#fafafa', padding: '8px 0' }"
        v-loading="loading"
        border
        size="small"
        style="width: 100%"
        :data="tableData"
      >
        <el-table-column prop="id" label="门禁编号" width="120" />
        <el-table-column prop="brand" label="门禁品牌类型" width="120" />
        <el-table-column prop="name" label="门禁名称" />
        <el-table-column prop="number" label="序列号" />
        <el-table-column prop="iP" label="IP地址" width="120" />
        <el-table-column prop="port" label="端口" width="120" />
        <el-table-column prop="door_count" label="门数" width="120" />
        <el-table-column prop="first_door" label="第一个房门" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.pageNo"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getAccessControler } from '@/api/colleges';
export default {
  data() {
    return {
      pagination: {
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      loading: false,
      tableData: []
    };
  },
  methods: {
    fetchRecordList() {
      this.loading = true;
      getAccessControler(this.pagination)
        .then(res => {
          if (res.status === 1) {
            this.tableData = res.data.records;
            this.total = res.data.total;
          } else {
            this.$message.error(res.msg);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.fetchRecordList();
    },
    handleCurrentChange(val) {
      this.pagination.pageNo = val;
      this.fetchRecordList();
    },
    // 格式化日期为 yyyy-mm-dd
    formatDate(dateString) {
      if (!dateString) return '-';
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date
        .getDate()
        .toString()
        .padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  },
  created() {
    this.fetchRecordList();
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  margin-top: 0;
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  color: #457cb8;

  .button-container {
    display: flex;
  }
}
.table-container {
  margin-top: 10px;
  width: 100%;
  background-color: #fff;
  padding: 15px;
  border-top: 3px solid #4b7cb1;
  border-left: 1px solid #f4f4f5;
  border-right: 1px solid #f4f4f5;
  border-bottom: 1px solid #f4f4f5;

  :deep(.el-table) {
    font-size: 11px;

    th,
    td {
      padding: 2px;
    }

    .cell {
      line-height: 16px;
      padding-left: 2px;
      padding-right: 2px;
    }

    .el-tag {
      padding: 0 2px;
      height: 18px;
      line-height: 16px;
    }
  }

  .pagination {
    text-align: center;
    margin-top: 15px;
  }
}
</style>
