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
      chart: undefined,
      // id: "onlyfan",
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
      this.chart = echarts.init(document.getElementById(this.id));
      this.setOption();
    },
    setOption() {
      if (!this.chart) return;
      let option = {
        tooltip: {
          trigger: "axis",
        },
        grid: {
          position: "center",
        },
        radar: {
          shape: this.series.shape,
          indicator: this.series.indicator,
          name: {
            color: "#fff",
            textStyle: {
              fontSize: this.fontSize(0.12),
            },
          },
          nameGap: 8,

          radius: this.fontSize(0.7),
          center: ["55%", "55%"],
          axisLine: {
            //
            lineStyle: {
              color: "#656B4F",
            },
          },
          splitLine: {
            lineStyle: {
              width: 1,
              color: "#656B4F",
            },
          },
          splitArea: {
            show: false,
          },
        },

        series: [
          {
            type: "radar",
            symbol: "none",
            tooltip: {
              trigger: "item",
            },
            areaStyle: {
              normal: {
                color: "#24D4FF",
              },
            },
            lineStyle: {
              normal: {
                color: "#24D4FF",
                width: 2,
              },
            },
            data: [
              {
                value: this.series.series.data,
                name: "年龄分布",
              },
            ],
          },
        ],
      };

      this.chart.setOption(option);
    },
  },
  beforeDestroy() {
    if (!this.chart) return;
    this.chart.dispose();
    this.chart = null;
  },
  created() {},
  mounted() {
    this.draw();
  },
};
</script>
<style lang="scss" scoped>
</style>