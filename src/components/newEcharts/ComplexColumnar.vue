<template>
  <div class="wrapper" :id="id"></div>
</template>

<script>
import echartMixins from "@/utils/resizeMixins";
const echarts = require("echarts");
export default {
  components: {},
  mixins: [echartMixins],
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: Object,
      default() {
        return {};
      },
    },
    tooltip: {
      type: Object,
      default() {
        return {};
      },
    },
    series: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      // id: "onlyfan"
      chart: undefined,
    };
  },
  watch: {
    series: {
      handler(val, oldVal) {
        this.$nextTick(() => {
          this.setOption();
        });
      },
      deep: true,
    },
  },
  computed: {},
  beforeDestroy() {
    if (!this.chart) return;
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    draw() {
      this.chart = echarts.init(document.getElementById(this.id), "BI");
      this.setOption();
    },

    setOption() {
      if (!this.chart) return;
      this.chart.setOption({
        color: this.series.color,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
          textStyle: {
            fontSize: this.fontSize(0.12),
          },
        },
        // toolbox: {
        //   // feature: {
        //   //   // dataView: { show: true, readOnly: false },
        //   //   // magicType: { show: true, type: ["line", "bar"] },
        //   //   // restore: { show: true },
        //   //   saveAsImage: { show: true }
        //   // }
        // },
        legend: this.series.legend,
        grid: this.series.grid,
        xAxis: [
          {
            type: "category",
            splitLine: { show: false },

            data: this.series.xdata,
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisPointer: {
              type: "shadow",
            },
            axisLabel: {
              textStyle: {
                fontSize: this.fontSize(0.12),
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            // boundaryGap: ["0", "100%"],
            // splitNumber: 4,
            // minInterval: 1,
            // maxInterval: 400,
            // interval: 50,
            splitLine: {
              show: true,
              interval: 4,
              lineStyle: {
                color: "rgba(46,96,153,0.5)",
                type: "dashed",
              },
            },

            axisLine: {
              show: false,
              lineStyle: {
                type: "dashed",
                color: "rgba(46,96,153,0.5)", //左边线的颜色
                width: "2",
              },
            },
            // name: "水量",
            min: 0,
            max: this.series.max,
            interval: this.series.inx,
            axisLabel: {
              // formatter: "{value} ml",
              // formatter: "{value}",
              formatter: (val, index) => {
                return val;
              },
              textStyle: {
                fontSize: this.fontSize(0.12),
              },
            },
          },
          {
            type: "value",
            // boundaryGap: ["0", "0%"],
            // splitNumber: 4,
            splitLine: {
              show: false,
              interval: 4,
              lineStyle: {
                color: "rgba(46,96,153,0.5)",
                type: "dashed",
              },
            },
            axisLine: {
              show: false,
              lineStyle: {
                type: "dashed",
                color: "rgba(46,96,153,0.5)", //左边线的颜色
                width: "2",
              },
            },
            // name: "温度",
            min: 0,
            max: 100,
            interval: this.series.inx2,
            axisLabel: {
              formatter: "{value}%",
              textStyle: {
                fontSize: this.fontSize(0.12),
              },
            },
          },
        ],
        series: this.series.series,
      });
    },
    maxData() {},
  },
  created() {},
  mounted() {
    this.draw();
  },
};
</script>
<style scoped>
@import "../../assets/css/componentsSty.css";
/* @import "../../assets/scss/index.scss"; */
/* @import "../../assets/css/index.css"; */
</style>