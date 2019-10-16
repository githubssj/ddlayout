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
          <Table :columns="tablecolumns" :data="tabledatas" :row-class-name="rowClassName"></Table>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: "nsneoDesktop",
  components: {},

  data: function() {
    return {
      tablecolumns: [],
      tabledatas: []
    };
  },
  methods: {
    rowClassName(row, index) {
      return "";
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
    this.$nsneohttp.get(GLobal_Api_Urls.Desktop_Chart_Z1).then(httpdata => {
      z1.setOption(httpdata.datas, true);
    });

    //此处为延时访问
    setTimeout(() => {
      z2.resize();
      this.$nsneohttp.get(GLobal_Api_Urls.Desktop_Chart_Z2).then(httpdata => {
        z2.setOption(httpdata.datas, true);
      });
    }, 200);
    setTimeout(() => {
      z3.resize();
      this.$nsneohttp.get(GLobal_Api_Urls.Desktop_Chart_Z3).then(httpdata => {
        z3.setOption(httpdata.datas, true);
      });
    }, 200);
    setTimeout(() => {
      z4.resize();
      this.$nsneohttp.get(GLobal_Api_Urls.Desktop_Chart_Z4).then(httpdata => {
        z4.setOption(httpdata.datas, true);
      });
    }, 200);
    setTimeout(() => {
      z5.resize();
      this.$nsneohttp.get(GLobal_Api_Urls.Desktop_Chart_Z5).then(httpdata => {
        z5.setOption(httpdata.datas, true);
      });
    }, 200);

    //页尾的表格数据
    this.$nsneohttp.get(GLobal_Api_Urls.Desktop_Chart_Z6).then(httpdata => {
      this.tablecolumns = httpdata.datas.columns;
      this.tabledatas = httpdata.datas.datas;
    });

    console.log(JSON.stringify({}));
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
