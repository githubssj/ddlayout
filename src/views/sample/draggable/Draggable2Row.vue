<template>
  <div class="nsneodraggable-row-outter" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <draggable
      class="nsneodraggable-row row"
      :list="row.cols"
      :group="{ name: 'col' }"
      :style="rowStyle(row)"
    >
      <nsneodraggable-col v-for="(el,index) in row.cols" :key="index" :col="el" :row="row" />
    </draggable>
    <div class="nsneodraggable-setting" v-show="showSetting">
      <Icon class="nsneo-setting-icon" type="ios-construct-outline" @click="settingRow" />
      <Icon class="nsneo-setting-icon" type="ios-trash" @click="delRow" />
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import nsneodraggableCol from "./Draggable2Col.vue";
export default {
  props: ["row", "page"],
  components: {
    draggable,
    nsneodraggableCol
  },
  data() {
    return {
      showSetting: false
    };
  },
  computed: {
    rowStyle() {
      //是否显示列设置
      return function(row) {
        //显示行风格
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
  methods: {
    settingRow() {
      this.$Message.info("设置行数据");
    },
    delRow() {
      this.$Message.info("删除行数据");
      this.page.layouts = this.page.layouts.filter(v => {
        return v !== this.row;
      });
    },
    mouseenter() {
      this.showSetting = true;
    },
    mouseleave() {
      this.showSetting = false;
    }
  },
  name: "nsneodraggable-row"
};
</script>
<style>


</style>