<template>
  <div class="nsneo-inner-root">
    <div class="nsneo-inner-header">
      <Breadcrumb class="nsneo-module-breadcrumb">
        <BreadcrumbItem>
          <Icon type="ios-home-outline"></Icon>角色管理
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Icon type="logo-buffer"></Icon>角色编辑
        </BreadcrumbItem>
      </Breadcrumb>
      <div class="nsneo-module-btns">
        <ButtonGroup>
          <Button type="primary" @click="save">
            <Icon type="ios-checkbox" />保存
          </Button>
        </ButtonGroup>
      </div>
    </div>
    <div class="nsneo-inner-container">
      <Form :model="mainForm" :label-width="80" style="width:900" inline>
        <FormItem label="角色名称">
          <Input v-model="mainForm.name" style="width:200px" placeholder="请输入角色名称"></Input>
        </FormItem>
        <FormItem label="角色状态">
          <Select v-model="mainForm.state" style="width:200px">
            <Option value="在用">在用</Option>
            <Option value="作废">作废</Option>
          </Select>
        </FormItem>

        <FormItem label="创建时间">
          <Input v-model="mainForm.createdatetime" style="width:200px" readonly="readonly"></Input>
        </FormItem>

        <FormItem label="角色描述">
          <Input
            v-model="mainForm.caption"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder
            style="width:490px"
          ></Input>
        </FormItem>
        <Row>
          <Col span="24">
            <Table :data="accesMenusTable" :columns="tableColumns" stripe></Table>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  name: "nsneoroleedit",
  components: {},
  data() {
    return {
      mainForm: {
        name: "新角色",
        state: "在用",
        createdatetime: new Date().format("yyyy-MM-dd hh:mm"),
        caption: ""
      },

      tableColumns: [],
      accesMenusTable: []
    };
  },
  methods: {
    save() {
      this.$router.replace("./rolelist");
    }
  },
  mounted() {
    console.log("编辑界面的数据编码[" + this.$route.query.id + "]");
    this.tableColumns = [
      {
        type: "selection",
        width: 60,
        align: "center"
      },
      {
        title: "可访问资源",
        key: "name"
      },
      {
        title: "描述",
        key: "caption"
      }
    ];
    this.accesMenusTable = [
      {
        name: "角色管理",
        caption: ""
      },
      {
        name: "用户管理",
        caption: ""
      },
      {
        name: "访问日志",
        caption: ""
      },
      {
        name: "关系数据库",
        caption: "数据来源-关系数据库"
      },
      {
        name: "消息中间件",
        caption: "数据来源-消息中间件"
      },
      {
        name: "融合ETL",
        caption: "数据来源-融合ETL"
      },
      {
        name: "分布式日志",
        caption: "数据来源-分布式日志"
      },
      {
        name: "调度规则器",
        caption: "数据适配器-调度规则器"
      },
      {
        name: "融合规则器",
        caption: "数据适配器-融合规则器"
      },
      {
        name: "输出格式化器",
        caption: "数据适配器-输出格式化器"
      },
      {
        name: "适配器管理",
        caption: "数据适配器"
      },
      {
        name: "图表组件",
        caption: ""
      },
      {
        name: "数据面板",
        caption: ""
      }
    ];
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
