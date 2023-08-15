```vue
<template>
   <div>
       <Pagination
            :total="total"
            :page="page"
            :limit="limit"
            :page-sizes="pageSizes"
            @pageChange="pageChange"
        ></Pagination>
    </div>
</template>
<script>
    // 引入
	import Pagination from '@/components/Pagination'
    export default{
        data(){
            return {
                page:1,
                limit:10,
                pageSizes:[15,20,30,60],
                total:0
            }
        }
    }
    
    // 更新分页
    pageChange(pagination) {
      this.page = pagination.page
      this.limit = pagination.pageSize
        
	  // 列表数据
      this.getList()
    }           
</script>

```

