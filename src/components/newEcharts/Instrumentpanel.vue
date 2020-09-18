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
    // id: {
    //   type: String,
    //   required: true
    // },
    // title: {
    //   type: Object,
    //   default() {
    //     return {};
    //   }
    // },
    // tooltip: {
    //   type: Object,
    //   default() {
    //     return {};
    //   }
    // },
    // series: {
    //   type: Object,
    //   default() {
    //     return {};
    //   }
    // }
  },
  data() {
    return {
      id: "onlyfan",
    };
  },
  watch: {},
  computed: {},
  methods: {
    draw() {
      this.chart = echarts.init(document.getElementById("onlyfan"));
      let option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%",
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {},
          },
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            detail: { formatter: "{value}%" },
            data: [{ value: 50, name: "完成率" }],
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
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/componentsSty.css";
</style>