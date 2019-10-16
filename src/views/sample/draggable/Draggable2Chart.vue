<template>
  <div
    class="nsneo-draggable-chart"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
    :style="chartStyle(chart,col)"
  >
    <div class="nsneo-draggable-chart-icon">
      <div class="nsneo-draggable-chart-icon-chart">
        <img :src="chart.ref.img" />
        <div>{{chart.name}}</div>
      </div>
    </div>
    <div class="nsneodraggable-setting" v-show="showSetting">
      <Icon class="nsneo-setting-icon" type="ios-construct-outline" @click="settingRow" />
      <Icon class="nsneo-setting-icon" type="ios-trash" @click="delRow" />
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  props: ["chart", "col"],
  components: {
    draggable
  },
  data() {
    return {
      showSetting: false
    };
  },
  directives: {},
  computed: {
    chartStyle() {
      return function(chart, col) {
        //console.log('计算chart 风格')
        if (chart.style) {
          return chart.style;
        }

        if (chart.height > 0) {
          return "min-height:" + chart.height + "px;";
        }

        return "";
      };
    }
  },
  methods: {
    settingRow() {
      this.$Message.info("设置图表数据");
    },
    delRow() {
      this.$Message.info("删除图表数据");
      this.col.contents = this.col.contents.filter(v => {
        return v !== this.chart;
      });
    },
    mouseenter() {
      this.showSetting = true;
    },
    mouseleave() {
      this.showSetting = false;
    }
  },
  name: "nsneodraggable-chart"
};
</script>
<style>
.nsneo-draggable-chart {
  min-height: 70px;
  margin: 5px;
}
.nsneo-draggable-chart-icon {
  display: inline-block;
}
.nsneo-draggable-chart-icon-chart > img {
  height: 40px;
  width: 40px;
}
.nsneo-draggable-chart-icon-chart > div {
  text-align: center;
}
</style>