<template>
  <div class="wrapper">
    <!-- <div class="OuterFrame"> -->
    <div class="firstLine">
      <div class="right">
        <div class="titles">【近三年业主满意度】</div>
        <div class="circletotl">
          <Circles
            style
            :id="'r'+index"
            :cirValue="item.value"
            :cirName="item.name"
            v-for="(item,index) in cirValue.val"
            :key="item.id"
          />
        </div>
        <p class="titlesmall words10" style="margin-top:0.25rem">{{Satisfied.tit}}</p>
        <Rowcolumnar
          style="width:100%;height:3.6975rem;padding:0.2875rem 0.1625rem 0.3125rem 0.3rem"
          id="ooo"
          :series="Satisfied"
        />
      </div>
      <div class="right">
        <div class="titles">【项目签约信息】</div>
        <WaterPolo
          style="width:3.875rem;height:1.625rem;margin-top:0.3125rem"
          id="waterP"
          :renewalrate="signing.data"
        />
        <div>
          <div class="bottom">
            <div class="item">外扩项目</div>
            <ul>
              <li>
                <p class="colorBlue">{{signing.num}}</p>
                <p>数量(个)</p>
              </li>
              <li>
                <p class="colorOrg">{{signing.contract}}</p>
                <p>合同额(万)</p>
              </li>
              <li>
                <p class="colorGrass">{{signing.area}}</p>
                <p>面积(万m2)</p>
              </li>
            </ul>
          </div>
          <div class="bottom">
            <div class="item">自建项目</div>
            <ul>
              <li>
                <p class="colorBlue">{{signing.numown}}</p>
                <p>数量(个)</p>
              </li>
              <li>
                <p class="colorOrg">{{signing.contractown}}</p>
                <p>合同额(万)</p>
              </li>
              <li>
                <p class="colorGrass">{{signing.areaown}}</p>
                <p>面积(万m2)</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="secondLine">
      <div class="centre">
        <div class="titles">【突发事件管控】</div>
        <div class="top">
          <p class="titlesmall words4" style="margin-top:0.25rem">事件概览</p>

          <div class="title2">
            <div>
              <span>
                <span>近四个月总数</span>
                <span>{{event.total}}</span>
              </span>
            </div>
          </div>

          <p class="titlesmall words3" style="margin-top:0.25rem">关闭率</p>
        </div>
        <div class="charts">
          <onlyFan
            id="fan3"
            :series="event"
            style="width:3.7rem;height:2.3225rem;margin-right:0.6875rem"
          />
          <ComplexColumnar
            id="complexcolum"
            :series="closeRate"
            style="width:3.275rem;height:2.1125rem"
          />
        </div>
      </div>
    </div>
    <div class="lastLine">
      <div class="centre">
        <div class="titles">【APP覆盖率】</div>
        <ComplexColumnar
          :series="appCoverage"
          id="colu2"
          style="width:100%;height:2.35rem;padding-bottom:0.1875rem;padding-top:0.1875rem"
        ></ComplexColumnar>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import Circles from "../newEcharts/Circle";
import WaterPolo from "../newEcharts/WaterPolo";
import Rowcolumnar from "../newEcharts/Rowcolumnar";
import onlyFan from "../newEcharts/onlyFan";
import ComplexColumnar from "../newEcharts/ComplexColumnar";
import mixin from "../../utils/mixin";
const echarts = require("echarts");
import "echarts-liquidfill";
import {
  projectSigning,
  emergencies,
  coverage,
  year,
  yearDetails,
  emergenciesMonth,
} from "@/api/api.js";
export default {
  components: {
    Rowcolumnar,
    Circles,
    WaterPolo,
    ComplexColumnar,
    onlyFan,
  },
  props: {},
  data() {
    return {
      signing: {
        num: 0,
        area: 0,
        contract: 0,
        numown: 0,
        areaown: 0,
        contractown: 0,
        renewalrate: 0,
        data: {
          scroe: 0,
        },
      },
      cirValue: {
        val: [],
        name: [],
      },
      appCoverage: {
        max: 0,
        inx: 0,
        max2: 0,
        inx2: 0,
        legend: {
          data: ["交付户数", "安装量", "覆盖率"],
          // top: "0",
          itemGap: this.fontSize(0.23),
          itemHeight: this.fontSize(0.08),
          itemWidth: this.fontSize(0.16),
          textStyle: {
            color: "#fff",
            fontSize: this.fontSize(0.12),
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "0%",
          top: "25%",
          containLabel: true,
        },
        series: [
          {
            name: "交付户数",
            type: "bar",
            data: [],
            barWidth: "20%",
            itemStyle: {
              normal: {
                barBorderRadius: 3,
              },
            },
          },
          {
            name: "安装量",
            type: "bar",
            data: [],
            barWidth: "20%",
            itemStyle: {
              normal: {
                barBorderRadius: 3,
              },
            },
          },
          {
            name: "覆盖率",
            type: "line",
            yAxisIndex: 1,
            symbolSize: 6,
            data: [],

            itemStyle: {
              normal: {
                color: "#F54D4D",
                barBorderRadius: 3,
              },
            },
          },
        ],
        xdata: [],
      },
      event: {
        total: 0,
        color: [
          "#24D4FF",
          "#3BD1C0",
          "#FFDB5C",
          "#FFB157",
          "#FF9F7F",
          "#FB7294",
        ],

        series: [
          {
            name: "事件概览",
            type: "pie",
            radius: ["50%", "65%"],
            avoidLabelOverlap: false,
            startAngle: 60,
            minShowLabelAngle: 10,

            label: {
              show: true,
              bleedMargin: 6,
              // alignTo: "edge",
              // alignTo: "labelLine",
              // margin: 60,
              // formatter: "{b}\n\n{d}%",
              formatter: ["{one|{b}}", "{two|{d}%}"].join("\n"),
              textStyle: {
                fontSize: this.fontSize(0.12),
              },
              rich: {
                one: {
                  align: "left",
                  padding: [0, 0, 8, 0],
                  fontSize: this.fontSize(0.12),
                },
                two: {
                  align: "left",
                  padding: [7, 0, 7, 0],
                  fontSize: this.fontSize(0.12),
                },
              },
              padding: [0, -this.fontSize(0.6)],
            },
            labelLine: {
              length: this.fontSize(0.1),
              length2: this.fontSize(0.65),
            },

            data: [],
          },
        ],
        graphic: {
          elements: [
            {
              type: "image",
              style: {
                image:
                  "data:image/png;base64,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",
                width: this.fontSize(0.75),
                height: this.fontSize(0.75),
              },
              rotation: Math.PI / 4,
              origin: [10, 20],
              left: "center",
              top: "center",
            },
          ],
        },
      },
      closeRate: {
        max: 0,
        inx: 0,
        max2: 0,
        inx2: 0,
        legend: [
          {
            data: ["30min报送", "事件总量"],
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
          {
            data: ["24小时跟进", "关闭率"],
            top: this.fontSize(0.19),
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
          left: "0%",
          right: "0%",
          bottom: "5%",
          top: "30%",
          containLabel: true,
        },
        series: [
          {
            name: "24小时跟进",
            type: "bar",
            data: [],
            stack: "sum",
            barWidth: "30%",
          },
          {
            name: "事件总量",
            type: "bar",
            stack: "sum",
            data: [],
            barWidth: "30%",
          },
          {
            name: "30min报送",
            type: "bar",
            stack: "sum",
            data: [],
            barWidth: "30%",
          },
          {
            name: "关闭率",
            type: "line",
            yAxisIndex: 1,
            symbolSize: 6,
            // stack: "sum",
            data: [],

            itemStyle: {
              normal: {
                color: "#F54D4D",
                barBorderRadius: 3,
                fontSize: this.fontSize(0.12),
              },
            },
          },
        ],
        xdata: [],
      },
      Satisfied: {
        dataList: [],
        maxDataList: [],
        cityName: [],
        tit: "2019业主满意度",
        mycolor: [
          "#24D4FF",
          "#37A2DA",
          "#67E0E3",
          "#9FE6B8",
          "#FFDB5C",
          "#FFB157",
          "#FF9F7F",
        ],
      },
    };
  },
  watch: {},
  computed: {},
  mixins: [mixin],
  created() {
    this.draw();
  },
  methods: {
    draw() {
      projectSigning().then((res) => {
        this.signing.num = res.data.wtQuantity;
        this.signing.area = res.data.wtArea;
        this.signing.contract = res.data.wtContractValue;
        this.signing.numown = res.data.zjQuantity;
        this.signing.areaown = res.data.zjArea;
        this.signing.contractown = res.data.zjContractValue;
        this.signing.data.scroe = res.data.renewalRate;
      });
      emergencies().then((res) => {
        this.event.series[0].data = res.data.map((v) => {
          if (v.operator != "近4个月总数") {
            return { value: v.branchOffice * 100, name: v.operator };
          } else {
            this.event.total = parseInt(v.branchOffice);
          }
        });
      });
      emergenciesMonth().then((res) => {
        let x_data = [],
          first_data = [],
          second_data = [],
          third_data = [],
          four_data = [];
        for (let index = 0; index < res.data.length; index++) {
          const element = res.data[index];
          let x_value = element.eventDate.substr(5, 2) + "月";
          let first = element.roundTheClock;
          let second = element.branchOffice;
          let thirt = element.thirtyMarks;
          let four = element.closeRate * 100;
          x_data.push(x_value);
          first_data.push(first);
          second_data.push(second);
          third_data.push(thirt);
          four_data.push(four);
        }
        let cloneObject = this.cloneObject(this.closeRate);
        cloneObject.xdata = x_data;
        cloneObject.series[0].data = first_data;
        cloneObject.series[1].data = second_data;
        cloneObject.series[2].data = third_data;
        cloneObject.series[3].data = four_data;
        this.maxData(cloneObject.series, 2, "Merges");
        cloneObject.max = this.max;
        cloneObject.inx = this.inx;
        cloneObject.inx2 = 50;
        this.closeRate = cloneObject;
      });
      coverage().then((res) => {
        for (let item of res.data) {
          if (item.housePaid > 0) {
            this.appCoverage.xdata.push(item.branchOffice.replace("区域", ""));
            this.appCoverage.series[0].data.push(item.housePaid);
            this.appCoverage.series[1].data.push(item.installedCapacity);
            this.appCoverage.series[2].data.push(item.coverage * 100);
          }
        }
        this.maxData(this.appCoverage.series, 4, "disMerges");
        this.appCoverage.max = this.max;
        this.appCoverage.inx = this.inx;
        this.appCoverage.inx2 = 25;
      });
      year().then((res) => {
        this.cirValue.val = res.data.map((res) => {
          return {
            value: res.annualScore,
            name: res.rxYear,
          };
        });
      });
      yearDetails().then((res) => {
        for (let itme of res.data) {
          if (itme.id != 1) {
            this.Satisfied.cityName.push(itme.operator);
            this.Satisfied.dataList.push(itme.rxYear);
          } else {
            this.Satisfied.tit = itme.operator;
          }
        }

        this.Satisfied.maxDataList = this.Satisfied.dataList.map((v) => {
          return Math.max.apply(null, this.Satisfied.dataList);
        });
      });
    },
    cloneObject(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
  },
  mounted() {
    // this.draw();
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/componentsSty.css";
.wrapper {
  img {
    width: 100%;
  }

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
      .circletotl {
        display: flex;
        align-items: center;
        justify-content: space-around;
        // margin: 0.1rem;
      }
    }
    .right:first-child {
      margin-right: 0.075rem;
    }
  }
  .secondLine {
    display: flex;
    position: relative;
    margin: 0.075rem 0;
    .centre {
      width: 7.825rem;
      height: 3.75rem;
      background: url(../../assets/bigrow.png) no-repeat center center;
      background-size: 100%;
    }
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
          width: 2.85rem;
          margin: 0 auto;
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
      padding-bottom: 0.1375rem;
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