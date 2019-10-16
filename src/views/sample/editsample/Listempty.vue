<template>
  <div class="nsneo-inner-root">
    <div class="nsneo-inner-header">
      <Breadcrumb class="nsneo-module-breadcrumb">
        <BreadcrumbItem>
          <Icon type="ios-home-outline"></Icon>管理
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Icon type="logo-buffer"></Icon>列表
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
        //console.log(this.tableData)
        //console.log('test....beginrow['+beginrow+'],endrow['+endrow+']')
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
      //加载列
      this.tableColumns = [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "名称",
          key: "name",
          sortable: true
        },
        {
          title: "状态",
          key: "status",
          sortable: true
        },
        {
          title: "描述",
          key: "portrayal",
          sortable: true
        },
        {
          title: "人数",
          key: "people"
        },
        {
          title: "采样时间",
          key: "time"
        },
        {
          title: "更新时间",
          key: "update"
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.edit(params);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ];
      //加载数据
      this.tableData = new Array();
      for (let i = 0; i < 100; i++) {
        this.tableData.push({
          id: "ID_" + i,
          name: "任务" + Math.floor(Math.random() * 100 + 1),
          status: Math.floor(Math.random() * 3 + 1),
          portrayal: "测试数据[" + Math.floor(Math.random() * 10000 + 1) + "]",
          people: Math.floor(Math.random() * 25 + 1),
          time: Math.floor(Math.random() * 7 + 1),
          update: new Date().format("yyyy-MM-dd hh:mm")
        });
      }

      this.pagesize = 10;
      this.currentPage = 1;
      this.totalPages = this.tableData.length;
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
      this.$router.replace({ path: "./sampleedit", query: { id: "" } });
    },
    edit(param) {
      console.log(param);
      this.$router.replace({ path: "./sampleedit", query: { id: param.row.id } });
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
