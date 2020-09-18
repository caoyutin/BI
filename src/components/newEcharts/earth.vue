<template>
  <div>
    <div :id="id" style="width:98%; height:6rem;margin:0 auto"></div>
  </div>
</template>

<script>
import echartMixins from "@/utils/resizeMixins";
const echarts = require("echarts");
import china from "echarts/map/json/china.json";
echarts.registerMap("china", china);

export default {
  data() {
    return {
      // id: "earth",
    };
  },
  mixins: [echartMixins],
  props: {
    id: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  // watch: {
  //   list1(newVlue) {
  //     this.drawPie();
  //   }
  // },
  mounted() {
    this.draw();
    //   console.log()
  },
  methods: {
    draw() {
      this.chart = echarts.init(document.getElementById(this.id), "BI");
      let option = {
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            dataView: {
              readOnly: false,
            },
            magicType: {
              type: ["line", "bar"],
            },
            restore: {},
            saveAsImage: {},
          },
        },

        tooltip: {
          trigger: "item",
          formatter: function (e) {
            var name = e.name ? e.name : "获取中";
            var value = e.value ? e.value : "暂无数据";
            return `${name}:<br>幸福指数:${value} `;
          },
        },

        visualMap: {
          show: false,
          // seriesIndex: 1,
          min: 0,
          max: 100,
          left: "left",
          top: "bottom",
          text: ["高", "低"],
          calculable: true,
          inRange: {
            color: ["#0635B5", "#1F73EA", "#104CCA"],
          },
        },
        toolbox: { show: false },
        geo: {
          map: "china",
          // aspectScale: 0.75, //长宽比
          layoutCenter: ["51%", "50%"],
          layoutSize: "95%",
          zoom: 1.3,
          roam: false,
          itemStyle: {
            normal: {
              areaColor: "#1054b1",
              borderColor: "#00f8ff",
              borderWidth: 3,
              shadowColor: "#045ad7",
              shadowOffsetX: 0,
              shadowOffsetY: 4,
              shadowBlur: 20,
            },
            emphasis: {
              areaColor: "#000",
              borderWidth: 0,
              color: "green",
              label: {
                show: false,
              },
            },
          },
          regions: [
            {
              name: "南海诸岛",
              itemStyle: {
                areaColor: "rgba(0, 3, 52, 1)",

                borderColor: "rgba(0, 10, 52, 1)",
                normal: {
                  opacity: 0,
                  label: {
                    show: false,
                    color: "#009cc9",
                  },
                },
              },
            },
          ],
        },

        series: this.options.series,
      };

      this.chart.setOption(option);
    },
    // randomData() {
    //   return Math.round(Math.random() * 100);
    // },
  },
};
</script>

<style>
</style>