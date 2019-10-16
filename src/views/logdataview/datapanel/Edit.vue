<template>
  <div class="nsneo-inner-draggable-root">
    <div class="nsneo-draggable-head">
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
          
          <Button type="primary" @click="importdata">
            <Icon type="md-flash" />导入
          </Button>
          <Button type="primary" @click="exportdata">
            <Icon type="ios-folder-open-outline" />导出
          </Button>
        </ButtonGroup>
      </div>

      <div style="float:right;height:40px;line-height:40px;margin-left:10px;margin-right:10px;">
        <input
          style="height:25px;line-height:25px;display: none !important;"
          @change="readFile"
          ref="importInput"
          type="file"
        />
      </div>
    </div>
    <div class="nsneo-draggable-content">
      <div class="nsneo-draggable-left">
        <div v-for="(g,gindex) in nsneodndctrls" :key="gindex" class="nsneo-draggable-left-itemset">
          <div class="nsneo-draggable-left-itemset-title">{{g.name}}</div>

          <draggable
            class="nsneo-draggable-left-itemset-content"
            :list="g.ctrls"
            :group="{ name: g.group, pull: 'clone', put: false }"
            :clone="clonectrl"
            :sort="false"
          >
            <div
              v-for="(chart,chartindex) in g.ctrls"
              :key="chartindex"
              class="nsneo-draggable-left-item"
            >
              <img class="nsneo-draggable-left-item-img" :src="chart.img" />
              <div class="nsneo-draggable-left-item-title">{{chart.name}}</div>
            </div>
          </draggable>
        </div>
      </div>
      <div class="nsneo-draggable-carea">
        <nsneodraggable-page :page="page"></nsneodraggable-page>
      </div>

      <div class="nsneo-draggable-right">
        <Form :model="mainForm">
          <FormItem label="名称">
            <Input v-model="mainForm.uuid" placeholder="图表面板编码"></Input>
          </FormItem>

          <FormItem label="名称">
            <Input v-model="mainForm.name" placeholder="图表面板名称"></Input>
          </FormItem>

          <FormItem label="访问地址">
            <Input v-model="mainForm.url" placeholder="访问地址"></Input>
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
    <Modal
      v-model="rowSettingDialog.show"
      width="800"
      title="行设置"
      @on-ok="okrow"
      @on-cancel="cancelrow"
    >
      <div class="nsneo-settingdialog" v-if="rowSettingDialog.currentObj!=null">
        <Form v-model="rowSettingDialog.currentObj" :label-width="80">
          <FormItem label="行高">
            <Input v-model="rowSettingDialog.currentObj.height" placeholder="行高"></Input>
          </FormItem>
          <FormItem label="显示风格">
            <Input v-model="rowSettingDialog.currentObj.style" placeholder="显示风格"></Input>
          </FormItem>
        </Form>
      </div>
    </Modal>

    <Modal
      v-model="colSettingDialog.show"
      title="列设置"
      @on-ok="okcol"
      @on-cancel="cancelcol"
      width="800"
    >
      <div class="nsneo-settingdialog" v-if="colSettingDialog.currentObj!=null">
        <Form v-model="colSettingDialog.currentObj" :label-width="80">
          <FormItem label="列高">
            <Input v-model="colSettingDialog.currentObj.height" placeholder="列高"></Input>
          </FormItem>
          <FormItem label="列宽">
            <Input v-model="colSettingDialog.currentObj.width" placeholder="列宽"></Input>
          </FormItem>
          <FormItem label="显示风格">
            <Input v-model="colSettingDialog.currentObj.style" placeholder="显示风格"></Input>
          </FormItem>
        </Form>
      </div>
    </Modal>
    <Modal
      v-model="chartSettingDialog.show"
      title="图表设置"
      @on-ok="okchart"
      @on-cancel="cancelchart"
      width="800"
    >
      <div class="nsneo-settingdialog" v-if="chartSettingDialog.currentObj!=null">
        <Form v-model="chartSettingDialog.currentObj" :label-width="80">
          <FormItem label="名称">
            <Input v-model="chartSettingDialog.currentObj.name" placeholder="名称"></Input>
          </FormItem>
          <FormItem label="图表高">
            <Input v-model="chartSettingDialog.currentObj.height" placeholder="图表高"></Input>
          </FormItem>
          <FormItem label="图表宽">
            <Input v-model="chartSettingDialog.currentObj.width" placeholder="图表宽"></Input>
          </FormItem>
          <FormItem label="数据调度器">
            <Select v-model="chartSettingDialog.currentObj.dataDispatch">
              <Option value="被动抽取规则器">被动抽取规则器</Option>
              <Option value="定时调用规则器">定时调用规则器</Option>
            </Select>
          </FormItem>
          <FormItem label="数据适配器">
            <Select v-model="chartSettingDialog.currentObj.dataAdapter">
              <Option value="柱状图数据适配器">柱状图数据适配器</Option>
              <Option value="折线图数据适配器">折线图数据适配器</Option>
              <Option value="饼图数据适配器">饼图数据适配器</Option>
              <Option value="正负条形图数据适配器">正负条形图数据适配器</Option>
            </Select>
          </FormItem>
          <FormItem label="显示风格">
            <Input v-model="chartSettingDialog.currentObj.style" placeholder="显示风格"></Input>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import draggable from "vuedraggable";
import nsneodraggablePage from "./Draggable2Page.vue";
import bus from "../../../assets/bus";

let gid = 1;
export default {
  name: "datapanel",
  data() {
    return {
      nsneodndctrls: [],
      page: {
        title: "系统访问日志面板",
        layouts: []
      },
      mainForm: {
        uuid: "001",
        name: "系统访问日志面板",
        state: "在用",
        url: "http://localhost:8086",
        param: "",
        createdatetime: new Date().format("yyyy-MM-dd hh:mm"),
        caption: ""
      },
      rowSettingDialog: {
        show: false,
        currentObj: null
      },
      colSettingDialog: {
        show: false,
        currentObj: null
      },
      chartSettingDialog: {
        show: false,
        currentObj: null
      }
    };
  },
  components: {
    draggable,
    nsneodraggablePage
  },
  methods: {
    clonectrl(original) {
      console.log("克隆...");
      gid++;
      if (original.type == "row") {
        return {
          id: gid,
          name: "第" + gid + "行",
          type: "row",
          style: "",
          ref: original,
          height: 100,
          setting: {},
          cols: []
        };
      } else if (original.type == "col") {
        return {
          id: gid,
          name: "第" + gid + "列",
          type: "col",
          ref: original,
          width: 2,
          height: -1,
          style: "",
          setting: {},
          contents: []
        };
      } else if (original.type == "chart") {
        console.log(original)
        return {
          id: gid,
          name: original.name,
          type: "chart",
          style: "",
          height: -1,
          width: '',
          dataAdapter:original.dataAdapter,//数据适配器
          dataDispatch:original.dataDispatch,//数据调度器
          ref: original,
          setting: {},
          cols: []
        };
      }
      return null;
    },
    save() {
      this.$router.replace("./datapanellist");
    },
    exportdata(){
      console.log('导出数据...')
      let paneljson = JSON.stringify({page: this.page,mainForm: this.mainForm});
      console.log(paneljson)
      
      let blob = new Blob([paneljson], { type: "text/plain;charset=utf-8" });
      FileSaver.saveAs(blob, "datapanellayout.json"); //saveAs(blob,filename) //仅限于chorme的下载目录里
    },
    importdata(){
      console.log('导入数据...')
      this.$refs.importInput.click();
    },
    readFile(evt) {
      console.log("读入文件");
      const file = evt.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        let txt = e.target.result;
        console.log(txt);
        try {
          let jsonobj = JSON.parse(txt);
          this.page = jsonobj.page;
          this.mainForm = jsonobj.mainForm;
        } catch(e) {
          console.log(e);
          this.$Message.warning('导入失败')
        }
      };
      reader.readAsText(file);
    },
    rowsetting(row) {
      //console.log('显示行设置方法')
      //console.log(row);
      this.rowSettingDialog.currentObj = row;
      this.rowSettingDialog.show = true;
    },
    colsetting(col) {
      //console.log('显示列设置方法')

      this.colSettingDialog.currentObj = col;
      this.colSettingDialog.show = true;
    },
    chartsetting(chart) {
      //console.log('显示图表设置方法')

      this.chartSettingDialog.currentObj = chart;
      this.chartSettingDialog.show = true;
    },
    okrow() {
      console.log("行对话框确定");
    },
    cancelrow() {
      console.log("行对话框取消");
    },
    okcol() {
      console.log("列对话框确定");
    },
    cancelcol() {
      console.log("列对话框取消");
    },
    okchart() {
      console.log("图表对话框确定");
    },
    cancelchart() {
      console.log("图表对话框取消");
    }
  },
  mounted() {
    this.$nsneohttp.get('/localmock/logdataview/datapaneledit.json').then(httpdata => {
      this.nsneodndctrls = httpdata.datas.nsneodndctrls;
      this.page = httpdata.datas.page;
    });

    console.log("编辑界面的数据编码[" + this.$route.query.id + "]");
  },
  created() {
    bus.$on("rowsetting", msg => {
      this.rowsetting(msg);
    });
    bus.$on("colsetting", msg => {
      this.colsetting(msg);
    });
    bus.$on("chartsetting", msg => {
      this.chartsetting(msg);
    });
  }
};
</script>

<style>
.nsneo-inner-draggable-root {
  background: #ffffff;
  overflow: auto;
  width: 100%;
  height: 100%;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 5px;
  display: flex;
  flex-direction: column;
}

.nsneo-draggable-head {
  height: 40px;
  line-height: 40px;
  padding-left: 15px;
  padding-right: 15px;
}
.nsneo-draggable-content {
  flex: 1;
  display: flex;
}
.nsneo-draggable-left {
  width: 220px;
  height: 100%;
  border: 1px solid #e9e9e9;
  margin-right: 5px;
}

.nsneo-draggable-right {
  width: 220px;
  height: 100%;
  border: 1px solid #e9e9e9;
  margin-left: 5px;
  padding: 5px;
}

.nsneo-draggable-left-itemset {
  border-top: 1px solid #e9e9e9;
}
.nsneo-draggable-left > .nsneo-draggable-left-itemset:first-child {
  border-top: none !important;
}
.nsneo-draggable-left-itemset-title {
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  font-size: 14px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #e9e9e9;
}

.nsneo-draggable-left-itemset-content > .nsneo-draggable-left-item {
  width: 80px;
  height: 80px;
  margin: 5px;
  text-align: center;
  display: inline-block;
}

.nsneo-draggable-left-itemset-content > .nsneo-draggable-left-item > img {
  width: 60px;
  height: 60px;
}

.nsneo-draggable-left-itemset-content > .nsneo-draggable-left-item > div {
  text-align: center;
}

.nsneo-draggable-carea {
  flex: 1;
  height: 100%;
  border: 1px solid #e9e9e9;
  overflow: hidden;
}

.nsneodraggable-setting {
  width: 100%;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
}

.col-setting {
  margin-top: -5px;
}

.nsneo-setting-icon {
  color: #6699cc;
  margin-right: 5px;
}

.nsneo-setting-icon:hover {
  color: #cc6633;
}

.nsneodraggable-page {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.nsneodraggable-row {
  min-height: 100px;
  border: 1px dashed #abc;
  box-sizing: border-box;
  padding-right: 5px;
}
.nsneodraggable-row-outter {
  margin: 5px;
}
/*
.nsneodraggable-col-outter{
  
}*/
.nsneodraggable-col {
  border: 1px dashed #abc;
  min-height: 100px;
  box-sizing: border-box;
  margin: 5px 0px 5px 5px;
}

.row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: 0px;
  margin-left: 0px;
}
.col-1,
.col-2,
.col-3,
.col-4,
.col-5,
.col-6,
.col-7,
.col-8,
.col-9,
.col-10,
.col-11,
.col-12,
.col {
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 0px;
  padding-left: 0px;
}

.col {
  -ms-flex-preferred-size: 0;
  flex-basis: 0;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  max-width: 100%;
}

.col-1 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 8.333333%;
  flex: 0 0 8.333333%;
  max-width: 8.333333%;
}

.col-2 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 16.666667%;
  flex: 0 0 16.666667%;
  max-width: 16.666667%;
}

.col-3 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 25%;
  flex: 0 0 25%;
  max-width: 25%;
}

.col-4 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 33.333333%;
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
}

.col-5 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 41.666667%;
  flex: 0 0 41.666667%;
  max-width: 41.666667%;
}

.col-6 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 50%;
  flex: 0 0 50%;
  max-width: 50%;
}

.col-7 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 58.333333%;
  flex: 0 0 58.333333%;
  max-width: 58.333333%;
}

.col-8 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 66.666667%;
  flex: 0 0 66.666667%;
  max-width: 66.666667%;
}

.col-9 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 75%;
  flex: 0 0 75%;
  max-width: 75%;
}

.col-10 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 83.333333%;
  flex: 0 0 83.333333%;
  max-width: 83.333333%;
}

.col-11 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 91.666667%;
  flex: 0 0 91.666667%;
  max-width: 91.666667%;
}

.col-12 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
  max-width: 100%;
}

.ivu-form-item {
  margin-bottom: 2px;
}
</style>
