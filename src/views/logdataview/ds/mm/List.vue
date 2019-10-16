<template>
  <div class="nsneo-inner-root">
    <div class="nsneo-inner-header">
      <Breadcrumb class="nsneo-module-breadcrumb">
        <BreadcrumbItem>
          <Icon type="ios-home-outline"></Icon>消息中间件管理
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Icon type="logo-buffer"></Icon>消息中间件列表
        </BreadcrumbItem>
      </Breadcrumb>
      <div class="nsneo-module-btns">
        <ButtonGroup>
          <Button type="primary" @click="create">
            <Icon type="md-add" />新建
          </Button>
        </ButtonGroup>
      </div>
    </div>
    <div class="nsneo-inner-container">
      <Table :data="currentPageData" :columns="tableColumns" stripe></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page
            :total="totalPages"
            :current="currentPage"
            :page-size="pagesize"
            show-sizer
            @on-change="changePage"
            @on-page-size-change="pageSizeChange"
          ></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "nsneorolelist",
  components: {},
  computed: {
    currentPageData() {
      if (this.tableData == null || this.tableData.length == 0) {
        return [];
      } else {
        let beginrow = (this.currentPage - 1) * this.pagesize;
        let endrow = this.currentPage * this.pagesize;
        if (beginrow <= 0) {
          beginrow = 0;
        }
        if (endrow >= this.tableData.length) {
          endrow = this.tableData.length;
        }
        return this.tableData.slice(beginrow, endrow);
      }
    }
  },
  data() {
    return {
      totalPages: 100, //总页数量
      currentPage: 1, //当前页
      pagesize: 10, //每页数量
      tableData: [],
      tableColumns: []
    };
  },
  mounted() {
    this.loadTableData();
  },
  methods: {
    loadTableData() {

      //初始化数据
      this.tableColumns = [];
      this.tableData = [];
      this.totalPages = 0;
      this.pagesize = 10;
      this.currentPage = 1;

      //从网络上加载数据
      this.$nsneohttp.get('/localmock/logdataview/mm.json').then(httpdata => {
        //获得列头
        this.tableColumns = httpdata.datas.tableColumns;

        //添加操作项
        this.renderTableColumn(this.tableColumns);

        //获得内容
        this.tableData = httpdata.datas.tableData;

        
        this.pagesize = 10;
        this.currentPage = 1;
        this.totalPages = this.tableData.length;
      });
    },
    renderTableColumn(tableColumns){
      //对操作列进行重绘
      tableColumns.forEach(col=>{
        if(col.key&&col.key=='action'){
          col.render = loadivewtablerender(this);
        }
      })
    },
    changePage(v) {
      //console.log('改变页号['+this.currentPage+'],v['+v+']');
      this.currentPage = v;
    },
    pageSizeChange(v) {
      //console.log('改变每页数量['+v+']');
      this.pagesize = v;
    },
    create() {
      this.$router.replace({ path: "./mmedit", query: { id: "" } });
    },
    edit(param) {
      console.log(param);
      this.$router.replace({ path: "./mmedit", query: { id: param.row.id } });
    },
    remove(param) {
      console.log(param);
      this.$Message.info("删除数据");
    }
  }
};
</script>

<style scoped>
.nsneo-inner-root {
  background: #ffffff;
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.nsneo-inner-header {
  height: 40px;
  line-height: 40px;
  padding-left: 15px;
  padding-right: 15px;
}

.nsneo-inner-container {
  flex: 1;
  box-sizing: border-box;
  padding: 5px;
  overflow: auto;
}
</style>
