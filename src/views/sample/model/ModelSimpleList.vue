<template>
  <div class="nsneo-inner-root">
    <div class="nsneo-inner-header">
      <Breadcrumb class="nsneo-module-breadcrumb">
          <BreadcrumbItem>
            <Icon type="ios-home-outline"></Icon>模块管理
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Icon type="logo-buffer"></Icon>简单列表
          </BreadcrumbItem>
        </Breadcrumb>
        <div class="nsneo-module-btns">
        <ButtonGroup>
          <Button type="primary" @click="create">
            <Icon type="md-add" />创建
          </Button>

          <Button type="primary" @click="edit">
            <Icon type="ios-settings" />编辑
          </Button>
          <Button type="warning" @click="del">
            <Icon type="ios-checkbox" />删除
          </Button>
        </ButtonGroup>
          
        </div>
    </div>
    <div class="nsneo-inner-container">
        <Table :data="tableData" :columns="tableColumns" stripe></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="100" :current="1" @on-change="changePage"></Page>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "nsneomodellist",
  components: {},
  data() {
    return {
      tableData: this.mockTableData(),
      tableColumns: [
        {
          title: "名称",
          key: "name",sortable: true,
        },
        {
          title: "状态",
          key: "status",sortable: true,
        },
        {
          title: "描述",
          key: "portrayal",sortable: true,
        },
        {
          title: "人数",
          key: "people",
        },
        {
          title: "采样时间",
          key: "time",
        },
        {
          title: "更新时间",
          key: "update",
        }
      ]
    };
  },
  methods: {
    mockTableData() {
      let data = [];
      for (let i = 0; i < 10; i++) {
        data.push({
          name: "任务" + Math.floor(Math.random() * 100 + 1),
          status: Math.floor(Math.random() * 3 + 1),
          portrayal: '测试数据['+Math.floor(Math.random() * 10000 + 1)+']',
          people:Math.floor(Math.random() * 25 + 1),
          time: Math.floor(Math.random() * 7 + 1),
          update: new Date().format("yyyy-MM-dd hh:mm")
        });
      }
      return data;
    },
    formatDate(date) {
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    changePage() {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.tableData = this.mockTableData();
    },
    create(){
      //console.log('创建')
      this.$router.replace("./modelcreate");
    },
    edit(){
      //console.log('编辑')
      this.$router.replace("./modelcreate");
    },del(){
      //console.log('删除');
      this.$Message.warning('删除记录');
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
