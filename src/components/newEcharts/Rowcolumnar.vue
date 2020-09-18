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
    series: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      chart: undefined,
    };
  },
  watch: {
    series: {
      handler(val, oldVal) {
        this.series = val;
        this.$nextTick(() => {
          this.setOption();
        });
      },
      deep: true,
    },
  },
  computed: {},
  methods: {
    draw() {
      this.chart = echarts.init(document.getElementById(this.id), "");
      this.setOption();
    },
    setOption() {
      if (!this.chart) return;
      let option = {
        // backgroundColor: "#009efc",
        color: [
          "#24D4FF",
          "#37A2DA",
          "#67E0E3",
          "#9FE6B8",
          "#FFDB5C",
          "#FFB157",
          "#FF9F7F",
        ],
        grid: {
          left: "0%",
          right: "0%",
          bottom: "-1%",
          top: "-10%",
          containLabel: true,
        },
        xAxis: {
          show: false,
          type: "value",
          position: "top",
          splitNumber: 2,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            formatter: function (value) {
              return value.toLocaleString() + "%";
            },
            textStyle: {
              color: "#fff",
              fontSize: this.fontSize(0.12),
            },
          },
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLabel: {
              show: true,
              margin: 10,
              textStyle: {
                color: "#fff",
                fontSize: this.fontSize(0.12),
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            data: this.series.cityName,
          },
          {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: this.fontSize(0.12),
              },
              formatter: function (value) {
                return value.toLocaleString() + "%";
              },
            },
            data: this.series.dataList,
          },
        ],
        series: [
          {
            name: "金额",
            type: "bar",
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 6,
                color: function (params) {
                  //   let num = this.mycolor.length;
                  let mycolor = [
                    "#24D4FF",
                    "#37A2DA",
                    "#67E0E3",
                    "#9FE6B8",
                    "#FFDB5C",
                    "#FFB157",
                    "#FF9F7F",
                  ];
                  return mycolor[params.dataIndex];
                },
              },
            },
            barGap: "-100%",
            barWidth: "20%",
            data: this.series.dataList,
          },
          {
            name: "背景",
            type: "bar",
            barGap: "-107%",
            barWidth: "22%",
            data: this.series.maxDataList,
            itemStyle: {
              normal: {
                color: "rgba(24,31,68,0)",
                borderWidth: 1,
                borderColor: "#253154",
                barBorderRadius: 6,
              },
            },
          },
        ],
      };
      this.chart.setOption(option);
    },
  },
  created() {},
  mounted() {
    this.draw();
  },
  beforeDestroy() {
    if (!this.chart) return;
    this.chart.dispose();
    this.chart = null;
  },
};
</script>
<style lang="scss" scoped>
</style>