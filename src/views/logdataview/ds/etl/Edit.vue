<template>
  <div class="nsneo-inner-root">
    <div class="nsneo-inner-header">
      <Breadcrumb class="nsneo-module-breadcrumb">
        <BreadcrumbItem>
          <Icon type="ios-home-outline"></Icon>融合ETL管理
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Icon type="logo-buffer"></Icon>融合ETL编辑
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

        <FormItem label="状态">
          <Select v-model="mainForm.state">
            <Option value="在用">在用</Option>
            <Option value="作废">作废</Option>
          </Select>
        </FormItem>

        <FormItem label="连接包装器">
          <Select v-model="mainForm.linkpkg">
            <Option value="融合ETL连接包装器">融合ETL连接包装器</Option>
          </Select>
        </FormItem>

        <FormItem label="ETL输出">
          <Select v-model="mainForm.etloutid">
            <Option value="空调电力消耗耗数据">空调电力消耗耗数据</Option>
            <Option value="空调销售数据">空调销售数据</Option>
          </Select>
        </FormItem>

        <FormItem label="ETL连接用户名">
          <Input v-model="mainForm.linkusername" placeholder="请输入ETL连接用户名"></Input>
        </FormItem>
        <FormItem label="ETL连接用户密码">
          <Input v-model="mainForm.linkuserpwd" type="password" placeholder="请输入ETL连接密码"></Input>
        </FormItem>
        <FormItem label="ETL连接连接URL">
          <Input v-model="mainForm.linkurl" placeholder="请输入ETL连接连接URL，根据连接包装器采用不同的连接串格式"></Input>
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
        name: "电力能耗数据连接",
        state: "在用",
        etloutid:"",
        linkpkg:"融合ETL连接包装器",
        linkusername:"",
        linkuserpwd:"",
        linkurl:"",
        createdatetime: new Date().format("yyyy-MM-dd hh:mm"),
        caption: ""
      }

    };
  },
  methods: {
    save() {
      this.$router.replace("./etllist");
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
