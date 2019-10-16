<template>
  <div class="nsneo-inner-draggable-root">
    <div class="nsneo-draggable-head">
      <Breadcrumb class="nsneo-module-breadcrumb">
        <BreadcrumbItem to="/">
          <Icon type="ios-home-outline"></Icon>功能示例
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Icon type="ios-cafe"></Icon>组件拖放
        </BreadcrumbItem>
      </Breadcrumb>

      <div class="nsneo-module-btns">
        <ButtonGroup>
          <Button type="info" @click="createPage">
            <Icon type="md-add" />创建
          </Button>

          <Button type="info" @click="settingPage">
            <Icon type="ios-settings" />设置
          </Button>
          <Button type="info" @click="savePage">
            <Icon type="ios-checkbox" />保存
          </Button>
        </ButtonGroup>
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
      <div class="nsneo-draggable-right">
        <nsneodraggable-page :page="page"></nsneodraggable-page>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import nsneodraggablePage from "./Draggable2Page.vue";
let gid = 1;
export default {
  name: "draggable2demo",
  data() {
    return {
      nsneodndctrls: [],
      page: {
        title: "布局设计",
        layouts: []
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
          style:'',
          ref: original,
          height:100,
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
          height:-1,
          style:'',
          setting: {},
          contents: []
        };
      } else if (original.type == "chart") {
        return {
          id: gid,
          name: original.name,
          type: "chart",
          style:'',
          height:-1,
          ref: original,
          setting: {},
          cols: []
        };
      }
      return null;
    },
    settingPage() {
      this.$Message.info("设置页面数据");
    },
    savePage() {
      this.$Message.info("保存页面数据");
      console.log(JSON.stringify(this.page));
    },
    createPage() {
      this.$Message.info("创建新页面");
      this.page.title = "新页面";
      this.page.layouts = [];
    }
  },
  mounted() {
    //console.log(JSON.stringify(this.nsneodndctrls));
    //console.log(JSON.stringify(this.page));

    this.$nsneohttp.get(GLobal_Api_Urls.Draggable2Demo_Datas).then(httpdata => {
      this.nsneodndctrls = httpdata.datas.nsneodndctrls;
      this.page = httpdata.datas.page;
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
  width: 100%;
  display: flex;
}
.nsneo-draggable-left {
  width: 250px;
  height: 100%;
  border: 1px solid #e9e9e9;
  margin-right: 5px;
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

.nsneo-draggable-right {
  flex: 1;
  height: 100%;
  border: 1px solid #e9e9e9;
  overflow: hidden;
}

.nsneodraggable-setting {
  width: 100%;
  font-size: 16px; 
  text-align: center;
  cursor: ns-resize;
}

.col-setting{
  margin-top: -5px;
}

.nsneo-setting-icon {
  color: #6699cc;
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
.nsneodraggable-row-outter{
  margin: 5px;
}
/*
.nsneodraggable-col-outter{
  
}*/
.nsneodraggable-col {
  border: 1px dashed #abc;
  min-height: 100px;
  box-sizing: border-box;
  margin:5px 0px 5px 5px;
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
</style>
