<template>
  <div class="nsneo-inner-root">
    <div class="nsneo-inner-header">
      <Breadcrumb class="nsneo-module-breadcrumb">
        <BreadcrumbItem>
          <Icon type="ios-home-outline"></Icon>适配器管理
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Icon type="logo-buffer"></Icon>适配器编辑
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
          <Input v-model="mainForm.name" placeholder="请输入适配器名称"></Input>
        </FormItem>
        
        <FormItem label="类型">
          <Input v-model="mainForm.type" placeholder="适配器类型"></Input>
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

        
        <FormItem label="关系数据库数据源">
          <CheckboxGroup v-model="mainForm.rdbds">
            <Checkbox label="业务订单数据库">业务订单数据库</Checkbox>
            <Checkbox label="客户信息数据库">客户信息数据库</Checkbox>
          </CheckboxGroup>
        </FormItem>

        
        <FormItem label="融合ETL数据源">
          <CheckboxGroup v-model="mainForm.etlds">
            <Checkbox label="电力能耗数据连接">电力能耗数据连接</Checkbox>
            <Checkbox label="空调销售数据连接">空调销售数据连接</Checkbox>
          </CheckboxGroup>
        </FormItem>

        
        <FormItem label="消息中间件数据源">
          <CheckboxGroup v-model="mainForm.mmds">
            <Checkbox label="设备连接消息中间件">设备连接消息中间件</Checkbox>
            <Checkbox label="CRM系统连接中间件">CRM系统连接中间件</Checkbox>
          </CheckboxGroup>
        </FormItem>

        
        <FormItem label="日志系统数据源">
          <CheckboxGroup v-model="mainForm.logsysds">
            <Checkbox label="空调启停数据">空调启停数据</Checkbox>
            <Checkbox label="空调模式改变数据">空调模式改变数据</Checkbox>
          </CheckboxGroup>
        </FormItem>

        <FormItem label="融合规则">
          <Select v-model="mainForm.fusion">
            <Option value="按Id连接合并">按Id连接合并</Option>
            <Option value="按Name连接合并">按Name连接合并</Option>
          </Select>
        </FormItem>

        <FormItem label="服务包">
          <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击此处上传以java -jar 方式打包的调度规则器</p>
            </div>
          </Upload>
        </FormItem>

        <FormItem label="规则参数">
          <Input
            v-model="mainForm.param"
            type="textarea"
            :autosize="{minRows: 5,maxRows: 5}"
            placeholder="基于脚本的规则调度参数"
          ></Input>
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
        name: "柱状图数据适配器",
        state: "在用",
        type: "柱状图",
        param:"",
        fusion:"按Id连接合并",
        rdbds:[],
        etlds:[],
        mmds:[],
        logsysds:[],
        createdatetime: new Date().format("yyyy-MM-dd hh:mm"),
        caption: ""
      }
    };
  },
  methods: {
    save() {
      this.$router.replace("./adaptermanlist");
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
