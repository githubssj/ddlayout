<template>
  <div class="nsneo-inner-root">
    <div class="nsneo-inner-header">
      <Breadcrumb class="nsneo-module-breadcrumb">
        <BreadcrumbItem>
          <Icon type="ios-home-outline"></Icon>用户管理
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Icon type="logo-buffer"></Icon>用户编辑
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
      <Form :model="mainForm" :label-width="80" style="width:900px">
        <FormItem label="姓名">
          <Input v-model="mainForm.name" placeholder="请输入用户姓名"></Input>
        </FormItem>
        <FormItem label="登录名">
          <Input v-model="mainForm.loginname" placeholder="请输入用户登录名，需要唯一"></Input>
        </FormItem>
        <FormItem label="登录密码">
          <Input v-model="mainForm.loginpwd" placeholder="请输入用户登录密码"></Input>
        </FormItem>
        <FormItem label="状态">
          <Select v-model="mainForm.state">
            <Option value="在用">在用</Option>
            <Option value="作废">作废</Option>
          </Select>
        </FormItem>

        <FormItem label="创建时间">
          <Input v-model="mainForm.createdatetime" readonly="readonly"></Input>
        </FormItem>

        <FormItem label="角色">
          <Select v-model="mainForm.role">
            <Option value="系统管理员">系统管理员</Option>
            <Option value="操作员">操作员</Option>
          </Select>
        </FormItem>

        <FormItem label="描述">
          <Input
            v-model="mainForm.caption"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder
          ></Input>
        </FormItem>

        <FormItem label="头像">
          <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击此处上传头像</p>
            </div>
          </Upload>
        </FormItem>
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
        role: "操作员",
        loginname:"",
        loginpwd:"",
        createdatetime: new Date().format("yyyy-MM-dd hh:mm"),
        caption: ""
      }
    };
  },
  methods: {
    save() {
      this.$router.replace("./userlist");
    }
  },
  mounted() {
    console.log("编辑界面的数据编码[" + this.$route.query.id + "]");
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
