<template>
  <div class="nsneo-inner-root">
    <div class="nsneo-inner-header">
      <Breadcrumb class="nsneo-module-breadcrumb">
        <BreadcrumbItem>
          <Icon type="ios-home-outline"></Icon>图表组件管理
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Icon type="logo-buffer"></Icon>图表组件编辑
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
          <Input v-model="mainForm.name" placeholder="请输入图表名称"></Input>
        </FormItem>

        <FormItem label="类型">
          <Input v-model="mainForm.type" placeholder="图表类型类型"></Input>
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

        <FormItem label="数据适配器">
          <Select v-model="mainForm.adapter">
            <Option value="柱状图数据适配器">柱状图数据适配器</Option>
            <Option value="折线图数据适配器">折线图数据适配器</Option>
            <Option value="饼图数据适配器">饼图数据适配器</Option>
            <Option value="正负条形图数据适配器">正负条形图数据适配器</Option>
          </Select>
        </FormItem>

        <FormItem label="输出格式化工具">
          <Select v-model="mainForm.out">
            <Option value="列去重后,JSON输出">列去重后,JSON输出</Option>
          </Select>
        </FormItem>

        <FormItem label="调度规则器">
          <Select v-model="mainForm.dispatch">
            <Option value="被动抽取规则器">被动抽取规则器</Option>
            <Option value="定时调用规则器">定时调用规则器</Option>
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
        name: "柱状图",
        state: "在用",
        type: "柱状图",
        param: `
    {
    color: ['#3398DB'],tooltip : {trigger: 'axis',axisPointer : {type : 'shadow'}},grid: {left: '3%',right: '4%',bottom: '3%',containLabel: true},
    xAxis : [{
            type : 'category',
            data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {alignWithLabel: true}
        }],
    yAxis : [{type : 'value'}],
    series : [{
            name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:[10, 52, 200, 334, 390, 330, 220]
        }]
    }
        `,
        adapter: "柱状图数据适配器",
        out: "列去重后,JSON输出",
        dispatch: "被动抽取规则器",
        createdatetime: new Date().format("yyyy-MM-dd hh:mm"),
        caption: ""
      }
    };
  },
  methods: {
    save() {
      this.$router.replace("./chartctrllist");
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
