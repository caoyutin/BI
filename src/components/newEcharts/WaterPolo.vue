<template>
  <div class="wrapper">
    <div class="top1" :id="id" style="height:1.625rem;width:100%"></div>
  </div>
</template>

<script>
import echartMixins from "@/utils/resizeMixins";
const echarts = require("echarts");
import "echarts-liquidfill";
export default {
  components: {},
  mixins: [echartMixins],
  props: {
    renewalrate: {
      type: Object,
      defaults: () => {
        return {};
      },
    },
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      max: 500, //满刻度大小
      chart: undefined,
      // scroe: 70 / 100,
      // id: "wearter",
    };
  },
  watch: {
    renewalrate: {
      handler(val, oldVal) {
        this.renewalrate = val;
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
      this.chart = echarts.init(document.getElementById(this.id), "BI");
      this.setOption();
    },
    setOption() {
      if (!this.chart) return;
      let data = this.max * (this.renewalrate.scroe / 100);
      let option = {
        // backgroundColor: "#",
        title: {
          top: "25%",
          subtext: "项目续约率",
          left: "center",
          text: ((this.renewalrate.scroe / 100) * 10000) / 100 + "%",
          textStyle: {
            color: "#24D4FF",
            fontStyle: "normal",
            fontWeight: "Bold",
            fontSize: this.fontSize(0.35),
          },
          subtextStyle: {
            color: "#24D4FF",
            fontSize: this.fontSize(0.14),
            fontFamily: "PingFangSC-Regular",
            top: "center",
          },
          itemGap: 10,
        },
        series: [
          {
            type: "liquidFill",
            itemStyle: {
              opacity: 0.8, //波浪的透明度
              // shadowBlur: 10, //波浪的阴影范围
              // shadowColor: "#FFB931", //阴影颜色
            },
            radius: "95%",
            //水波
            color: [
              new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(36,212,255,0.3)",
                },
                {
                  offset: 1,
                  color: "rgba(36,212,255,0.3)",
                },
              ]),
            ],
            data: [
              {
                value: this.renewalrate.scroe / 100,
              },
            ],
            // background: '#000',
            center: ["50%", "50%"],
            backgroundStyle: {
              color: "rgba(255,255,255,0)",
            },
            label: {
              normal: {
                formatter: "",
                textStyle: {
                  fontSize: this.fontSize(0.12),
                },
              },
            },
            outline: {
              itemStyle: {
                borderColor: "transparent",
                borderWidth: 5,
              },
              borderDistance: 0,
            },
          },
          //外环线
          {
            color: ["#24D4FF", "transparent"],
            type: "pie",
            center: ["50%", "50%"],
            radius: ["95%", "98.5%"],
            hoverAnimation: false,
            data: [
              {
                name: "",
                value: 500,
                label: {
                  show: false,
                  position: "center",
                  color: "#fff",
                  fontSize: this.fontSize(0.38),
                  fontWeight: "bold",
                  formatter: function (o) {
                    return 500;
                  },
                },
              },
              {
                //画剩余的刻度圆环
                name: "",
                value: 0,
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
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
// @import "../../assets/css/componentsSty.css";
.wrapper {
  width: 100% !important;
  .bottom {
    background: url(../../assets/wkxm.png) no-repeat center top;
    background-size: 100%;
    // width: 3.5rem;
    margin-left: 0.175rem;
    // padding: 0 0.2125rem;
    position: relative;
    margin-right: 0.175rem;
    margin-top: 0.2rem;
    .item {
      font-size: 0.225rem;
      color: #24d4ff;
      text-align: center;
      position: absolute;
      top: -9px;
      width: 100%;
      left: 0;
    }
    ul {
      display: flex;
      align-items: center;
      justify-content: space-between;
      // height: 0.75rem;
      padding: 0.5125rem 0 0.3625rem 0;

      li {
        font-size: 0.175rem;
        color: #fff;

        text-align: center;
        // padding: 0 0.2125rem;
        white-space: nowrap;
        flex: 1;
      }
      li p {
        line-height: 0.3rem;
      }
      li p:first-child {
        font-size: 0.325rem;
        margin-bottom: 0.15rem;
        display: block;
        text-align: center;

        // height: 0.325rem;
      }
      li p:last-child {
        line-height: 0.175rem;
      }
      li:nth-child(2) {
        padding: 0.1125rem 0 0.075rem 0;
        border-right: 1px solid rgba(46, 96, 153, 0.4);
        border-left: 1px solid rgba(46, 96, 153, 0.4);
      }
    }
  }
}
</style>