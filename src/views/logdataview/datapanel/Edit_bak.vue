<template>
  <div class="nsneo-inner-root">
    <div class="nsneo-inner-header">
      <Breadcrumb class="nsneo-module-breadcrumb">
        <BreadcrumbItem>
          <Icon type="ios-home-outline"></Icon>数据面板管理
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Icon type="logo-buffer"></Icon>数据面板编辑
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
      <Form :model="formItem" :label-width="80" style="width:800px;">
        <FormItem label="姓名">
          <Input v-model="formItem.input" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="位置">
          <Select v-model="formItem.select">
            <Option value="beijing">青岛</Option>
            <Option value="shanghai">即墨</Option>
            <Option value="shenzhen">胶州</Option>
          </Select>
        </FormItem>
        <FormItem label="创建时间">
          <div>
            <DatePicker
              type="date"
              placeholder="日期"
              v-model="formItem.date"
              style="display:block-inline"
            ></DatePicker>
            <span style="margin-left:10px;margin-right:10px;">-</span>
            <TimePicker
              type="time"
              placeholder="时间"
              v-model="formItem.time"
              style="display:block-inline"
            ></TimePicker>
          </div>
        </FormItem>
        <FormItem label="性别">
          <RadioGroup v-model="formItem.radio">
            <Radio label="男">男</Radio>
            <Radio label="女">女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="开发语言">
          <CheckboxGroup v-model="formItem.checkbox">
            <Checkbox label="java"></Checkbox>
            <Checkbox label="csharp"></Checkbox>
            <Checkbox label="html"></Checkbox>
            <Checkbox label="javascript"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="是否在职">
          <i-switch v-model="formItem.switch" size="large">
            <span slot="open">在职</span>
                <span slot="close">离职</span>
          </i-switch>
        </FormItem>
        
        <FormItem label="Slider">
          <Slider v-model="formItem.slider"></Slider>
        </FormItem>
        <FormItem label="描述">
          <Input
            v-model="formItem.textarea"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="Enter something..."
          ></Input>
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
      formItem: {
        input: "",
        select: "",
        date: "",
        time: "",
        radio: '男',
        checkbox: ['html','javascript'],
        switch: true,
        slider: 20,
        textarea: "是一个很好的前端开发"
      }
    };
  },
  methods: {
    save() {
      this.$router.replace("./datapanellist");
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
