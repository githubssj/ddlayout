<template>
  <div class="nsneo-inner-root">
    <div class="nsneo-inner-header">
      <Breadcrumb class="nsneo-module-breadcrumb">
        <BreadcrumbItem>
          <Icon type="ios-home-outline"></Icon>关系数据库管理
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Icon type="logo-buffer"></Icon>关系数据库编辑
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
      
      <Form :model="mainForm" :label-width="120" style="width:900px">
        <FormItem label="名称">
          <Input v-model="mainForm.name" placeholder="请输入数据源名称"></Input>
        </FormItem>
        
        <FormItem label="数据库类型">
          <Select v-model="mainForm.type">
            <Option value="mysql">mysql</Option>
            <Option value="oracle">oracle</Option>
            <Option value="db2">db2</Option>
          </Select>
        </FormItem>

        <FormItem label="状态">
          <Select v-model="mainForm.state">
            <Option value="在用">在用</Option>
            <Option value="作废">作废</Option>
          </Select>
        </FormItem>

        <FormItem label="数据库用户名">
          <Input v-model="mainForm.dbusername" placeholder="请输入数据库用户名"></Input>
        </FormItem>
        <FormItem label="数据库用户密码">
          <Input v-model="mainForm.dbuserpwd" type="password" placeholder="请输入数据库用户密码"></Input>
        </FormItem>
        <FormItem label="数据库连接URL">
          <Input v-model="mainForm.dblinkurl" placeholder="请输入数据库连接URL，采用基于jdbc格式的连接串"></Input>
        </FormItem>

        <FormItem label="创建时间">
          <Input v-model="mainForm.createdatetime" readonly="readonly"></Input>
        </FormItem>

        <FormItem label="描述">
          <Input
            v-model="mainForm.caption"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder
          ></Input>
        </FormItem>

      </Form>
      <!--/main form-->

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
        name: "数据库连接",
        state: "在用",
        type: "mysql",
        dbusername:"",
        dbuserpwd:"",
        dblinkurl:"",
        createdatetime: new Date().format("yyyy-MM-dd hh:mm"),
        caption: ""
      }
    };
  },
  methods: {
    save() {
      this.$router.replace("./rdblist");
    }
  },mounted(){
    console.log('编辑界面的数据编码['+this.$route.query.id+']')
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
