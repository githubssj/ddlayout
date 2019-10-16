<template >
  <div
    class="nsneodraggable-col-outter"
    :class="colspace(col)"
    :style="colStyle(col)"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
  >
    <draggable class="nsneodraggable-col" :list="col.contents" :group="{put: ['chart','row'] }">
      <div class="nsneodraggable-col-content" v-for="(c,index) in col.contents" :key="index">
        <nsneodraggable-chart v-if="c.type==='chart'" :chart="c" :col="col" />

        <div
          v-else-if="c.type==='row'"
          class="nsneodraggable-row-outter"
          @mouseenter="mouseenterrow(c)"
          @mouseleave="mouseleaverow(c)"
        >
          <draggable
            class="nsneodraggable-row row"
            :list="c.cols"
            :group="{ name: 'col' }"
            :style="rowStyle(c,col)"
          >
            <nsneodraggable-col v-for="(el,index) in c.cols" :key="index" :col="el" :row="c" />
          </draggable>
          <div class="nsneodraggable-setting" v-show="showSettingRow(c)">
            <Icon class="nsneo--setting-icon" type="ios-construct-outline" @click="settingRow(c)" />
            <Icon class="nsneo-setting-icon" type="ios-trash" @click="delRow(c)" />
          </div>
        </div>
      </div>
    </draggable>
    <div class="nsneodraggable-setting col-setting" v-show="showSetting">
      <Icon class="nsneo-setting-icon" type="ios-construct-outline" @click="settingCol" />
      <Icon class="nsneo-setting-icon" type="ios-trash" @click="delCol" />
      <Icon class="nsneo-setting-icon" type="md-arrow-forward" @click="addWidth" />
      <Icon class="nsneo-setting-icon" type="md-arrow-back" @click="subWidth" />
      <!--
      <Icon class="nsneo-setting-icon" type="md-arrow-down" @click="addHeight" />
      <Icon class="nsneo-setting-icon" type="md-arrow-up" @click="subHeight" />
      -->
    </div>


  </div>
</template>
<script>
import draggable from "vuedraggable";
import nsneodraggableChart from "./Draggable2Chart.vue";

import bus from '../../../assets/bus';


export default {
  props: ["col", "row"],
  components: {
    draggable,
    nsneodraggableChart
  },
  data() {
    return {
      showSetting: false,
      currentShowSettingRow: null
    };
  },
  computed: {
    //计算属性,可以传入参数
    showSettingRow() {
      //是否显示设置内容
      return function(col) {
        return this.currentShowSettingRow === col;
      };
    },
    colspace() {
      //计算列宽度
      return function(col) {
        return "col-" + col.width;
        //return "col-2";
      };
    },
    colStyle() {
      return function(col) {
        //计算列风格
        //console.log(col.style);
        if (col.style) {
          return col.style;
        }
        if(col.height>0){
          //console.log('设置高度')
          return 'min-height:'+col.height+'px;'
        }
        return "";
      };
    },
    rowStyle() {
      return function(row, col) {
        //显示行风格
        //console.log('计算行风格...')
        if (row.style) {
          return row.style;
        }
        if(row.height>0){
          //console.log('设置高度')
          return 'min-height:'+row.height+'px;'
        }
        return "";
      };
    }
  },
  name: "nsneodraggable-col",
  directives: {},
  methods: {
    settingCol() {
      //this.$Message.info("设置列数据");
      
      bus.$emit('colsetting', this.col);
    },
    delCol() {
      this.$Message.info("删除列数据");

      this.row.cols = this.row.cols.filter(v => {
        return v !== this.col;
      });
    },
    addWidth() {
      this.col.width++;
      if (this.col.width > 12) {
        this.col.width = 12;
      }
    },
    subWidth() {
      this.col.width--;
      if (this.col.width < 1) {
        this.col.width = 1;
      }
    },
    addHeight(){
      console.log('增加高度');
    },
    subHeight(){
      console.log('减少高度');
    },
    mouseenter() {
      this.showSetting = true;
    },
    mouseleave() {
      this.showSetting = false;
    },
    mouseenterrow(c) {
      this.currentShowSettingRow = c;
    },
    mouseleaverow(c) {
      this.currentShowSettingRow = null;
    },
    settingRow(c) {
      //this.$Message.info("设置行数据");
      bus.$emit('rowsetting', this.row);
    },
    delRow(c) {
      this.$Message.info("删除行数据");
      this.col.contents = this.col.contents.filter(v => {
        return v !== c;
      });
    }
  }
};
</script>
<style>
</style>