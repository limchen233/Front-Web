<template>
  <div class="p-contianer">
    <el-pagination
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size.sync="pageSize"
      :total="total"
      :layout="layout"
      class="p-bar"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <div v-if="selected" class="selected">已选{{ selected }}条</div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 30, 50, 100]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    selected: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10
    }
  },
  watch: {
    page(val) {
      this.currentPage = val
    },
    limit(val) {
      this.pageSize = val
    }
  },
  created() {
    this.currentPage = this.page
    this.pageSize = this.limit
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.$emit('pageChange', { page: this.currentPage, pageSize: this.pageSize })
    },

    handleCurrentChange(val) {
      this.currentPage = val
      this.$emit('pageChange', { page: this.currentPage, pageSize: this.pageSize })
    }
  }
}
</script>

<style lang="scss" scoped>
/** 分页布局 */
.p-contianer {
  position: relative;
  background-color: white;
  height: 44px;
  padding: 5px 0;
  .p-bar {
    float: right;
    // margin: 5px 0 0 0;
    font-size: 14px !important;
  }
  .selected {
    position: relative;
    display: inline-block;
    top: 5px;
  }
}
</style>
