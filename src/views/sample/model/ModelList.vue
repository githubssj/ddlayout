<template>
  <div class="nsneo-inner-root">
    <div class="nsneo-inner-header">
      <Breadcrumb class="nsneo-module-breadcrumb">
          <BreadcrumbItem>
            <Icon type="ios-home-outline"></Icon>模块管理
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Icon type="logo-buffer"></Icon>模块列表
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
      tableData: this.mocktableData(),
      tableColumns: [
        {
          title: "名称",
          key: "name",sortable: true,
        },
        {
          title: "状态",
          key: "status",sortable: true,
          render: (h, params) => {
            const row = params.row;
            const color =
              row.status === 1
                ? "primary"
                : row.status === 2
                ? "success"
                : "error";
            const text =
              row.status === 1
                ? "运行中"
                : row.status === 2
                ? "成功"
                : "失败";

            return h(
              "Tag",
              {
                props: {
                  type: "dot",
                  color: color
                }
              },
              text
            );
          }
        },
        {
          title: "描述",
          key: "portrayal",sortable: true,
          render: (h, params) => {
            return h(
              "Poptip",
              {
                props: {
                  trigger: "hover",
                  title: params.row.portrayal.length + "portrayals",
                  placement: "bottom"
                }
              },
              [
                h("Tag", params.row.portrayal.length),
                h(
                  "div",
                  {
                    slot: "content"
                  },
                  [
                    h(
                      "ul",
                      this.tableData[params.index].portrayal.map(item => {
                        return h(
                          "li",
                          {
                            style: {
                              textAlign: "center",
                              padding: "4px"
                            }
                          },
                          item
                        );
                      })
                    )
                  ]
                )
              ]
            );
          }
        },
        {
          title: "人数",
          key: "people",
          render: (h, params) => {
            return h(
              "Poptip",
              {
                props: {
                  trigger: "hover",
                  title: params.row.people.length + "customers",
                  placement: "bottom"
                }
              },
              [
                h("Tag", params.row.people.length),
                h(
                  "div",
                  {
                    slot: "content"
                  },
                  [
                    h(
                      "ul",
                      this.tableData[params.index].people.map(item => {
                        return h(
                          "li",
                          {
                            style: {
                              textAlign: "center",
                              padding: "4px"
                            }
                          },
                          item.n + "：" + item.c + "People"
                        );
                      })
                    )
                  ]
                )
              ]
            );
          }
        },
        {
          title: "采样时间",
          key: "time",
          render: (h, params) => {
            return h("div", "大约" + params.row.time + "天");
          }
        },
        {
          title: "更新时间",
          key: "update",
          render: (h, params) => {
            return h(
              "div",
              this.formatDate(this.tableData[params.index].update)
            );
          }
        }
      ]
    };
  },
  methods: {
    mocktableData() {
      let data = [];
      for (let i = 0; i < 10; i++) {
        data.push({
          name: "任务" + Math.floor(Math.random() * 100 + 1),
          status: Math.floor(Math.random() * 3 + 1),
          portrayal: ["City", "People", "Cost", "Life", "Entertainment"],
          people: [
            {
              n: "People" + Math.floor(Math.random() * 100 + 1),
              c: Math.floor(Math.random() * 1000000 + 100000)
            },
            {
              n: "People" + Math.floor(Math.random() * 100 + 1),
              c: Math.floor(Math.random() * 1000000 + 100000)
            },
            {
              n: "People" + Math.floor(Math.random() * 100 + 1),
              c: Math.floor(Math.random() * 1000000 + 100000)
            }
          ],
          time: Math.floor(Math.random() * 7 + 1),
          update: new Date()
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
      this.tableData = this.mocktableData();
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
