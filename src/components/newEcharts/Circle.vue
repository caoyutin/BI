<template>
  <div class="wrapper" :id="id" style="width:1.125rem;height:1.6625rem;"></div>
</template>

<script>
import echartMixins from "@/utils/resizeMixins";
const echarts = require("echarts");
export default {
  components: {},
  props: {
    id: {
      type: String,
      required: true,
    },
    cirValue: {
      type: String,
      defaults: "",
    },
    cirName: {
      type: String,
      defaults: " ",
    },
  },
  data() {
    return {
      chart: undefined,
      // id: "ooo1",
      // value: 83,
    };
  },
  watch: {
    cirValue: {
      handler(val, oldVal) {
        this.cirValue = val;
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
        title: {
          text: `${this.cirValue}分`,
          subtext: `${this.cirName}年`,
          left: "center",
          top: "center", //top待调整
          textStyle: {
            color: "#24D4FF",
            fontSize: this.fontSize(0.2),
            fontWeight: 400,
            fontFamily: "DINAlternate-Bold",
          },
          subtextStyle: {
            color: "#fff",
            fontSize: this.fontSize(0.14),
            fontFamily: "PingFangSC-Regular",
            top: "center",
          },
          itemGap: this.fontSize(0.4), //主副标题间距
        },
        xAxis: {
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          // data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        },
        yAxis: {
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        series: [
          // 内圆
          {
            type: "pie",
            radius: ["0", "50%"],
            center: ["50%", "50%"],
            z: 0,
            itemStyle: {
              normal: {
                color: "rgba(0,0,0,0)",
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },
            label: {
              normal: {
                position: "center",
              },
            },
            data: [100],
          },
          // 进度圈
          {
            type: "pie",
            clockWise: true,
            radius: ["60%", "70%"],
            data: [
              {
                value: this.cirValue,
                label: { show: false },
                labelLine: {
                  show: false,
                },
                itemStyle: {
                  normal: {
                    borderWidth: 10,
                    // borderColor:
                    //   // 'rgba(0,0,0,0)',
                    //   {
                    //     colorStops: [
                    //       {
                    //         offset: 0,
                    //         color: "#FF9F7F" || "#FF9F7F", // 0% 处的颜色
                    //       },
                    //       {
                    //         offset: 1,
                    //         color: "#FFB157" || "#FFB157", // 100% 处的颜色
                    //       },
                    //     ],
                    //   },
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: "#FF9F7F" || "#FF9F7F", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#FFB157" || "#FFB157", // 100% 处的颜色
                        },
                      ],
                    },
                    label: {
                      show: false,
                    },
                    labelLine: {
                      show: false,
                    },
                  },
                },
              },
              {
                name: "gap",
                value: 100 - this.cirValue,
                label: { show: false },
                labelLine: {
                  show: false,
                },
                itemStyle: {
                  normal: {
                    label: {
                      show: false,
                    },
                    labelLine: {
                      show: false,
                    },
                    color: "rgba(37,49,84,0.5)",
                    borderColor: "rgba(0, 0, 0, 0)",
                    borderWidth: 0,
                  },
                },
              },
            ],
          },
          //刻度尺
          {
            // name: "白色圈刻度",
            type: "gauge",
            radius: "90%",
            startAngle: 225, //刻度起始
            endAngle: -134.8, //刻度结束
            splitNumber: 5,
            z: 4,
            axisTick: {
              show: true,
              length: 4,
              lineStyle: {
                width: 1,
                color: "rgba(36,212,255,0.9)",
              },
            },
            splitLine: {
              show: false,
              length: 1, //刻度节点线长度
              lineStyle: {
                width: 2,
                color: "rgba(36,212,255,0.9)",
              }, //刻度节点线
            },
            axisLabel: {
              color: "rgba(255,255,255,0)",
              fontSize: this.fontSize(0.12),
            }, //刻度节点文字颜色
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                opacity: 0,
                width: 100,
              },
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: 0,
                name: "",
              },
            ],
          },
          // 刻度圈
          {
            type: "pie",
            radius: ["0%", "73%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center",
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontWeight: "bold",
                },
              },
            },
            itemStyle: {
              normal: {
                color: "rgba(0,0,0,0)",
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: 3235,
              },
            ],
          },
          //最外层圈
          {
            type: "pie",
            radius: ["0%", "85%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
                position: "center",
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontWeight: "bold",
                },
              },
            },
            itemStyle: {
              normal: {
                color: "rgba(0,0,0,0)",
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: 3235,
              },
            ],
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