<template>
  <div ref="nsneodesktop" class="nsneo-desktop">
    <div style="margin:30px;">
      <Row>
        <Col span="24">
          <div ref="z1" class="chart-z1"></div>
        </Col>

        <Col span="12">
          <div ref="z2" class="chart-z2"></div>
        </Col>
        <Col span="12">
          <div ref="z3" class="chart-z3"></div>
        </Col>

        <Col span="12">
          <div ref="z4" class="chart-z4"></div>
        </Col>
        <Col span="12">
          <div ref="z5" class="chart-z5"></div>
        </Col>

        <Col span="24">
          <baidu-map class="map" :center="center" :zoom="zoom" style="height:400px;margin-top:5px;margin-bottom:5px;" @ready="handler"></baidu-map>
        </Col>

        <Col span="24">
          <Table :columns="tablecolumns" :data="tabledatas" :row-class-name="rowClassName"></Table>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
const MP = function(ak) {
  return new Promise(function(resolve, reject) {
    window.init = function() {
      resolve(BMap);
    };
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "http://api.map.baidu.com/api?v=2.0&ak=" + ak + "&callback=init";
    script.onerror = reject;
    document.head.appendChild(script);
  });
};


export default {
  name: "nsneoDesktop",
  components: {
  },

  data: function() {
    return {
      tablecolumns: [],
      tabledatas: [],
      center: { lng: 0, lat: 0 }, //经纬度
      zoom: 3 //地图展示级别
    };
  },
  methods: {
    rowClassName(row, index) {
      return "";
    },
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 15;
    }
  },
  mounted() {
    let z1 = this.$echarts.init(this.$refs.z1);
    let z2 = this.$echarts.init(this.$refs.z2);
    let z3 = this.$echarts.init(this.$refs.z3);
    let z4 = this.$echarts.init(this.$refs.z4);
    let z5 = this.$echarts.init(this.$refs.z5);

    //可以直接访问,也可以延时访问
    //此处为直接访问
    this.$nsneohttp.get("/localmock/logdataview/z1.json").then(httpdata => {
      z1.setOption(httpdata.datas, true);
    });

    //此处为延时访问
    setTimeout(() => {
      z2.resize();
      this.$nsneohttp.get("/localmock/logdataview/z2.json").then(httpdata => {
        z2.setOption(httpdata.datas, true);
      });
    }, 200);
    setTimeout(() => {
      z3.resize();
      this.$nsneohttp.get("/localmock/logdataview/z3.json").then(httpdata => {
        z3.setOption(httpdata.datas, true);
      });
    }, 200);
    setTimeout(() => {
      z4.resize();
      this.$nsneohttp.get("/localmock/logdataview/z4.json").then(httpdata => {
        z4.setOption(httpdata.datas, true);
      });
    }, 200);
    setTimeout(() => {
      z5.resize();
      this.$nsneohttp.get("/localmock/logdataview/z5.json").then(httpdata => {
        z5.setOption(httpdata.datas, true);
      });
    }, 200);

    //页尾的表格数据
    this.$nsneohttp.get("/localmock/logdataview/z6.json").then(httpdata => {
      this.tablecolumns = httpdata.datas.columns;
      this.tabledatas = httpdata.datas.datas;
    });

    console.log(JSON.stringify({}));

    //显示地图
  },
  activated() {}
};
</script>

<style scoped>
.nsneo-desktop {
  background: #ffffff;
  overflow-y: auto;
  width: 100%;
  height: 100%;
}

.chart-z1 {
  height: 400px;
  width: 100%;
}

.chart-z2 {
  width: 100%;
  height: 400px;
}

.chart-z3 {
  width: 100%;
  height: 400px;
}
.chart-z4 {
  width: 100%;
  height: 400px;
}
.chart-z5 {
  width: 100%;
  height: 400px;
}
.chart-z6 {
  width: 100%;
  height: 400px;
}

.ivu-table .demo-table-info-cell-name {
  background-color: #2db7f5;
  color: #fff;
}
.ivu-table .demo-table-info-cell-age {
  background-color: #ff6600;
  color: #fff;
}
.ivu-table .demo-table-info-cell-address {
  background-color: #187;
  color: #fff;
}
</style>
