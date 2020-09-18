<template>
  <div class="wrapper">
    <!-- <div class="OuterFrame"> -->
    <div class="firstLine">
      <div class="lef">
        <div class="updown">
          <div class="titles">【服务业态】</div>
          <onlyfan
            :series="fwytdata"
            id="fan1"
            :stylelist="stylelist"
            style="width:3.875rem;height:2.775rem"
          ></onlyfan>
        </div>
        <div class="updown">
          <div class="titles">【服务面积】</div>
          <onlyfan id="fan2" :series="fwareadata" style="width:3.875rem;height:2.775rem"></onlyfan>
        </div>
      </div>
      <div class="right">
        <div class="titles">【全国服务数据】</div>
        <ServiceData />
      </div>
    </div>

    <div class="secondLine">
      <div class="centre">
        <div class="titles">【报事报修】</div>
        <!-- <leftcenter /> -->
        <div class="top">
          <p class="titlesmall words4" style="margin-top:0.25rem">报事概览</p>

          <div class="title2">
            <div>
              <span>
                <span>近四个月总数</span>
                <span>{{closeRate.total}}</span>
              </span>
            </div>
          </div>

          <p class="titlesmall words3" style="margin-top:0.25rem">关闭率</p>
        </div>
        <div class="charts">
          <!-- <jzt /> -->
          <jzt style="width:100%;height:2.225rem" :series="jzt" />
          <ComplexColumnar
            id="complexcolum4"
            :series="closeRate"
            style="width:100%;height:2.225rem"
          />
        </div>
      </div>
    </div>
    <div class="lastLine">
      <div class="centre">
        <div class="titles">【收费管理】</div>
        <div class="tips1">
          <div>
            集团综合收缴率
            <span class="c24D4FF numb DIN-Bold">{{pay.total}}%</span>
          </div>
          <div>数据截止{{pay.time|formatDate}}</div>
        </div>
        <onlyColumnar
          :series="pay"
          id="line1"
          style="width:7.825rem;height:1.85rem;padding-bottom:0.1875rem"
        ></onlyColumnar>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import onlyfan from "../newEcharts/onlyFan";
import onlyColumnar from "../newEcharts/onlyColumnar";
import ServiceData from "../newEcharts/ServiceData";
import jzt from "../newEcharts/jzt";
import ComplexColumnar from "../newEcharts/ComplexColumnar";
import mixin from "../../utils/mixin";
import { getfwyt, getfwarea, charge, defMonth, defCake } from "@/api/api.js";
export default {
  components: {
    onlyfan,
    onlyColumnar,
    ComplexColumnar,
    ServiceData,
    jzt,
  },
  props: {},
  mixins: [mixin],
  data() {
    return {
      closeRate: {
        total: 0,
        max: 0,
        inx: 0,
        inx2: 0,
        legend: [
          {
            data: ["报事总量", "已关闭", "关闭率"],
            top: "0",
            itemGap: this.fontSize(0.25),
            // x: "center",
            align: "left",
            itemHeight: this.fontSize(0.08),
            itemWidth: this.fontSize(0.2),
            // padding: [0, 0, -15, 0],
            textStyle: {
              color: "#fff",
              fontSize: this.fontSize(0.12),
              // padding: [0, 0, -15, 0],
            },
          },
        ],
        grid: {
          left: "3%",
          right: "4%",
          bottom: "5%",
          top: "30%",
          containLabel: true,
        },
        series: [
          {
            name: "报事总量",
            type: "bar",
            data: [25.6, 76.7, 35.6, 20],
            stack: "sum",
            barWidth: "30%",
            itemStyle: {
              normal: {
                color: "#FFDC5C",
              },
            },
          },
          {
            name: "已关闭",
            type: "bar",
            stack: "sum",
            data: [22.6, 51.9, 19.0, 35],
            barWidth: "30%",
            itemStyle: {
              normal: {
                color: "#24D4FF",
              },
            },
          },

          {
            name: "关闭率",
            type: "line",
            yAxisIndex: 1,
            symbolSize: 6,
            // stack: "sum",
            data: [13, 15, 22, 11],

            itemStyle: {
              normal: {
                color: "#F54D4D",
                barBorderRadius: 3,
              },
            },
          },
        ],
        xdata: ["1月", "2月", "3月", "4月"],
      },
      config1: {
        number: [100],
        content: "{nt}个",
      },
      config2: {
        number: [999],
        content: "{nt}个",
      },
      stylelist: {
        color: [
          "#FD9CB4",
          "#FB7294",
          "#FFB157",
          "#FF9F7F",
          "#FFDB5C",
          "#9FE6B8",
          "#3BD1C0",
          "#24D4FF",
          "#28B4F3",
        ],
      },
      fwytdata: {
        series: {
          name: "",
          type: "pie",
          radius: "70%",
          // center: ["50%", "50%"],
          // minAngle: 0 - 10,
          data: [],
          label: {
            formatter: "",
            textStyle: {
              fontSize: this.fontSize(0.12),
            },
          },
          labelLine: {
            length: 10,
            length2: 10,
          },
          animationType: "scale",
          animationEasing: "elasticOut",
          animationDelay: function (idx) {
            return Math.random() * 200;
          },
          roseType: "radius",
        },
        // graphic: {},
      },
      fwareadata: {
        series: {
          name: "",
          type: "pie",
          radius: "65%",
          // center: ["50%", "50%"],
          minAngle: 0 - 10,
          data: [],
          label: {
            normal: {
              padding: [0, -this.fontSize(0.39)],
              formatter: "{b|{b}}\n\n{d|{d}%}",
              textStyle: {
                fontSize: this.fontSize(0.12),
              },
              rich: {
                a: {
                  fontSize: this.fontSize(0.12),
                  // color: "#FFF",
                  align: "left",
                  padding: this.fontSize(0.04),
                },
                hr: {
                  // borderColor: (params) => {
                  //   console.log(params);
                  // },
                  width: "100%",
                  borderWidth: 0.5,
                  height: 0,
                },
                c: {
                  fontSize: this.fontSize(0.12),
                  align: "center",
                  padding: this.fontSize(0.04),
                  // color: "#00EDED",
                },
              },
            },
          },
          labelLine: {
            length: this.fontSize(0.1),
            length2: this.fontSize(0.4),
          },

          animationType: "scale",
          animationEasing: "elasticOut",
          animationDelay: function (idx) {
            return Math.random() * 200;
          },
        },
        // graphic: {},
      },
      pay: {
        total: 0,
        time: 0,
        max: 0,
        inx: 0,
        grid: {
          left: "3%",
          right: "4%",
          bottom: "0%",
          top: "10%",
          containLabel: true,
        },
        series: [
          {
            name: "外框",
            type: "bar",
            itemStyle: {
              normal: {
                barBorderRadius: 0,
                color: "rgba(37,49,84,0.5)", //rgba设置透明度0.14
              },
            },
            barGap: "-100%",
            z: 0,
            barWidth: "25%",
            data: [],
          },
          {
            name: "收费管理",
            type: "bar",
            barWidth: "25%",
            data: [],
            itemStyle: {
              normal: {
                barBorderRadius: 3,
                color: "#24D4FF",
              },
            },
          },
        ],
        xdata: [],
      },
      jzt: [],
    };
  },
  watch: {},
  computed: {},
  filters: {
    /* 格式化时间戳 */

    formatDate(val) {
      const date = new Date(val);

      const year = date.getFullYear();

      const month =
        date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;

      const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;

      return `${month}月${day}日`;

      console.log(val);
    },
  },
  methods: {
    draw() {
      getfwyt().then((res) => {
        for (let item of res.data) {
          this.fwytdata.series.data.push({
            value: item.residential * 100,
            name: item.operator,
          });
        }
        this.fwytdata.series.label.formatter = this.fwytdata.data;
      });
      getfwarea().then((res) => {
        for (let item of res.data) {
          this.fwareadata.series.data.push({
            value: item.lumpSum * 100,
            name: item.plot,
          });
        }
        this.fwareadata.series.label.formatter = this.fwareadata.data;
      });
      charge().then((res) => {
        let ary = [];

        for (let item of res.data) {
          if (item.areaName != "集团综合收缴率") {
            this.pay.xdata.push(item.areaName.substr(0, 2));
            this.pay.series[1].data.push(item.paymentRate.replace("%", ""));
          } else {
            this.pay.total = item.paymentRate * 100;
            this.pay.time = item.createDate;
          }

          ary = this.pay.series[1].data;
        }
        ary.sort(function (a, b) {
          return a - b;
        });
        ary.forEach(() => {
          this.pay.series[0].data.push(ary[ary.length - 1]);
        });
        this.maxData(this.pay.series, 2, "disMerges");
        this.pay.max = this.max;
        this.pay.inx = this.inx;
      });
      defMonth().then((res) => {
        this.closeRate.series[0].data = res.data.map((v) => {
          return v.id;
        });
        this.closeRate.series[1].data = res.data.map((v) => {
          return v.a;
        });
        this.closeRate.series[2].data = res.data.map((v) => {
          return v.c * 100;
        });
        this.closeRate.xdata = res.data.map((v) => {
          return v.b.substr(4, 2) + "月";
        });
        this.maxData(this.closeRate.series, 2, "Merges");
        this.closeRate.max = this.max;
        this.closeRate.inx = this.inx;
        this.closeRate.inx2 = 50;
      });
      defCake().then((res) => {
        for (let item of res.data) {
          if (item.c != "近4个月总数") {
            this.jzt.push({
              name: item.c.replace("类", ""),
              value: item.b * 100,
            });
          } else {
            this.closeRate.total = item.id;
          }
        }
      });
    },
  },
  created() {
    this.draw();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/componentsSty.css";
.wrapper {
  img {
    width: 100%;
  }
  width: 7.825rem;
  .firstLine {
    // width: 7.825rem;
    display: flex;
    align-items: center;
    .lef {
      margin-right: 0.075rem;
      // width: 3.825rem;
      // height: 3.25rem;
      .dv-border-box-12 {
        width: 3.875rem;
        height: 3.25rem;
        background: url(../../assets/smaleft.png) no-repeat center center;
        background-size: 100%;
        // margin: -0.1rem;
      }
      .dv-border-box-12:first-child {
        margin-bottom: 0.075rem;
      }
    }
    .right {
      width: 3.875rem;
      height: 6.575rem;
      background: url(../../assets/bigright.png) no-repeat center center;
      background-size: 100%;
    }
  }
  .secondLine {
    display: flex;
    margin: 0.075rem 0;
    .centre {
      width: 7.825rem;
      height: 3.75rem;
      position: relative;
      background: url(../../assets/bigrow.png) no-repeat center center;
      background-size: 100%;
      .top {
        display: flex;
        position: relative;
        width: 100%;
        height: 3.2625rem;
        // top: 0.375rem;
        // left: 0.375rem;
        p {
          position: absolute;
          margin: 0 !important;
          top: -0.175rem;
        }
        p:first-child {
          left: 0.375rem;
        }
        .title2 {
          top: 0.2rem;
          font-size: 0.225rem;
          padding: 0.1625rem 0.0875rem;
          width: 100%;
          text-align: center;
          // left: 2.375rem;
          div {
            padding: 0.1rem 0.1125rem;
            background: rgba(37, 49, 84, 0.4);
            border-radius: 4px;
            // width: 2.85rem;
            margin: 0 auto;
            display: inline-block;
          }
          span:first-child {
            color: #fff;

            display: flex;
            align-items: center;
            justify-content: center;
            width: auto;
            span:first-child {
              color: #fff;
              padding-right: 0.1625rem;
              white-space: nowrap;
              background: none;
              font-size: 0.225rem;
            }
            span:last-child {
              font-size: 0.4rem;
              background: none;
              color: #24d4ff;
              line-height: 0.4rem;
              font-weight: bold;
            }
          }
        }
        p:last-child {
          right: 0.375rem;
        }
      }
      .charts {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        top: 1.3625rem;
        left: 0.3rem;
        right: 0.3rem;
        padding-top: 0.1rem;
      }
    }
  }
  .lastLine {
    .centre {
      width: 7.825rem;
      height: 2.825rem;
      background: url(../../assets/smalrow.png) no-repeat center center;
      background-size: 100%;
    }
  }
}
</style>