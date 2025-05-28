<template>
  <div class="app-container">
    <div class="header-container">
      <h4>设施进出记录</h4>
      <div class="button-container">
        <el-button size="mini" icon="el-icon-search">查找</el-button>
      </div>
    </div>
    <div class="table-container">
      <el-table
        :data="recordList"
        :header-cell-style="{ background: '#fafafa', padding: '8px 0' }"
        v-loading="loading"
        border
        size="small"
        style="width: 100%"
      >
        <el-table-column prop="door_place" label="设施名称" />
        <el-table-column prop="user_id" label="会员标识" width="120" />
        <el-table-column prop="user_name" label="全名" width="120" />
        <el-table-column prop="access_card_number" label="门禁卡号" width="120" />
        <el-table-column prop="create_time" label="进出时间" width="160">
          <template slot-scope="scope">
            {{ formatDate(scope.row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="inORout" label="进出状态" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.inORout === 1 ? 'success' : 'warning'">
              {{ scope.row.inORout === 1 ? '进' : '出' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button type="text" size="mini" icon="el-icon-view" @click="handleView(scope.row)"
              >查看路径</el-button
            >
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
      <el-dialog :visible.sync="dialogVisible" title="路径" width="50%">
        <div class="path-container">
          <el-table :data="pathList" border stripe>
            <el-table-column property="user_name" label="全名" width="150"></el-table-column>
            <el-table-column property="door_place" label="设施名称"></el-table-column>
            <el-table-column property="inORout" label="进出状态" width="150">
              <template slot-scope="scope">
                {{ scope.row.inORout === 1 ? '进' : '出' }}
              </template>
            </el-table-column>
            <el-table-column property="create_time" label="进出时间" width="200">
              <template slot-scope="scope">
                {{ formatDate(scope.row.create_time) }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getFacilityRecord } from '@/api/colleges';
export default {
  name: 'doorsManage',
  data() {
    return {
      pagination: {
        pageNo: 1,
        pageSize: 10
      },
      loading: false,
      total: 0,
      recordList: [],
      dialogVisible: false,
      pathList: []
    };
  },
  methods: {
    fetchRecordList() {
      this.loading = true;
      getFacilityRecord(this.pagination)
        .then(res => {
          if (res.status === 1) {
            this.recordList = res.data.records;
            this.total = res.data.total;
          } else {
            this.$message.error(res.msg);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleCurrentChange(val) {
      this.pagination.pageNo = val;
      this.fetchRecordList();
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.fetchRecordList();
    },
    handleView(row) {
      this.dialogVisible = true;
      this.pathList = [row];
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
  margin-top: 0px;
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
