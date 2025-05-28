<template>
  <div class="app-container">
    <div class="header-container">
      <h4>课题组权限</h4>
      <div class="button-container">
        <el-button size="mini" icon="el-icon-search">查找</el-button>
      </div>
    </div>
    <div class="table-container">
      <el-table
        :header-cell-style="{ background: '#fafafa', padding: '8px 0' }"
        v-loading="loading"
        :data="tableData"
        border
        size="small"
        style="width: 100%"
      >
        <el-table-column prop="research_group_id" label="课题组ID" width="120" />
        <el-table-column prop="research_group_name" label="课题组名称" />
        <el-table-column prop="first_door" label="第一个权限" />

        <el-table-column label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <div class="button-container">
              <el-button type="primary" size="mini" @click="handleEdit(scope.row)">
                编辑
              </el-button>
              <el-button type="danger" size="mini" @click="handleDelete(scope.row)">
                删除
              </el-button>
            </div>
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
    <edit-group-permission v-if="editDialogVisible" :data="editData" @close="handleEditClose" />
  </div>
</template>

<script>
import { getGroupPermission, delGroupPermission } from '@/api/colleges';
import EditGroupPermission from './editGroupPermission.vue';
export default {
  name: 'doorsManage',
  components: {
    EditGroupPermission
  },
  data() {
    return {
      pagination: {
        pageNo: 1,
        pageSize: 10
      },
      loading: false,
      total: 0,
      tableData: [],
      editDialogVisible: false,
      editData: {}
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.fetchRecordList();
    },
    handleCurrentChange(val) {
      this.pagination.pageNo = val;
      this.fetchRecordList();
    },
    handleDelete(row) {
      this.$confirm('确定删除该课题组权限吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true;
        delGroupPermission({ id: row.id })
          .then(res => {
            if (res.status == 1) {
              this.$message.success('删除成功');
              this.fetchRecordList();
            } else {
              this.$message.error(res.msg);
            }
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    fetchRecordList() {
      this.loading = true;
      getGroupPermission(this.pagination)
        .then(res => {
          if (res.status == 1) {
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
    handleEdit(row) {
      this.editDialogVisible = true;
      this.editData = row;
    },
    handleEditClose() {
      this.editDialogVisible = false;
      this.fetchRecordList();
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
