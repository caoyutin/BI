<template>
  <div class="wrapper">
    <!-- <div class="OuterFrame"> -->
    <div class="firstLine">
      <div class="right">
        <div class="titles">【基础序列人均管理面积】</div>
        <div class="tips2">
          <span style>
            {{config.area}}
            <span class="nomalsma">万</span>
          </span>
          <span>在管总建筑面积（m2)</span>
        </div>
        <dv-scroll-ranking-board
          :config="config"
          style="height:5.1875rem;padding:0.375rem 0.2375rem;padding-bottom:0;"
          v-if="config.data.length"
        />
        <!-- <righttop style="width:100%" /> -->
      </div>
      <div class="right">
        <div class="updown">
          <div class="titles">【供应商数据】</div>
          <div class="title2">
            <div>
              <span>
                <span>总数</span>
                <span>{{event.total}}</span>
              </span>
            </div>
          </div>
          <onlyFan
            id="fan4"
            :series="event"
            style="width:100%;height:1.975rem;margin-right:0.6875rem"
          />
        </div>
        <div class="updown">
          <div class="titles">【热门商品】</div>
          <ul class="top5">
            <li v-for="item in HotCommodity.slice(0 ,5)" :key="item.id">
              <span>Top:{{item.rank}}</span>
              <span>{{item.commodity}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="secondLine">
      <div class="centre">
        <div class="titles">【基本业务外包情况】</div>
        <div class="tipslist">
          <div class="tips2">
            <span>项目总数</span>
            <span>{{Outsourcing.objtotal}}</span>
          </div>
          <div class="tips2">
            <span>总面积（m2）</span>
            <span>
              {{Outsourcing.Acreagetotal}}
              <span class="nomalsma">万</span>
            </span>
          </div>
          <div class="tips2">
            <span>总人数</span>
            <span>{{Outsourcing.peopletotal}}</span>
          </div>
        </div>
        <div class="chartsbottom">
          <div class="left">
            <onlyColumnar
              :series="appCoverage2"
              id="colu15"
              style="width:100%;height:2.35rem;padding-top:0.1875rem"
            />
            <onlyColumnar
              :series="appCoverage3"
              id="colu16"
              style="width:100%;height:2.35rem;padding-top:0.1875rem"
            />
          </div>
          <div class="right">
            <onlyFan
              id="fan12"
              :series="CircularData"
              style="width:100%;height:2.35rem;padding-top:0.1875rem"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="lastLine">
      <div class="centre">
        <div class="titles">【融e居APP活跃度】</div>
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
import onlyColumnar from "../newEcharts/onlyColumnar";
import ComplexColumnar from "../newEcharts/ComplexColumnar";
import onlyFan from "../newEcharts/onlyFan";
import mixin from "../../utils/mixin";
import {
  supplier,
  bestSellers,
  outsourcing,
  activity,
  businessLines,
} from "@/api/api.js";

export default {
  components: {
    onlyColumnar,
    onlyFan,
    ComplexColumnar,
  },

  props: {},
  data() {
    return {
      HotCommodity: [],

      Outsourcing: {
        objtotal: 0,
        Acreagetotal: 0,
        peopletotal: 0,
      },
      appCoverage: {
        color: ["#24D4FF", "#67E0E3", "#9FE6B8", "#FFDB5C", "#FF9F7F"],
        max: 0,
        inx: 0,
        inx2: 0,
        legend: {
          data: [],
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
        series: [],
        xdata: [],
      },
      config: {
        area: 0,
        rowNum: 6,
        waitTime: 1000,
        unit: "万",
        data: [],
        sort: true,
      },
      //扇形图
      event: {
        total: "234",
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
            radius: ["55%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: true,

              normal: {
                align: "center",
                lineHeight: 16,
                formatter: (v) => {
                  return v.name.length > 5
                    ? ` ${v.name.slice(0, 5)}\n${v.name.slice(
                        5,
                        v.name.length
                      )}`
                    : v.name;
                },
                fontSize: this.fontSize(0.12),
              },
            },
            labelLine: {
              // smooth: 0.2,
              length: 8,
              length2: 8,
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
      appCoverage2: {
        max: 0,
        inx: 0,
        inx2: 0,
        grid: {
          left: "3%",
          right: "4%",
          bottom: "5%",
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
            name: "项目数",
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
      appCoverage3: {
        max: 0,
        inx: 0,

        grid: {
          left: "3%",
          right: "4%",
          bottom: "5%",
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
            name: "项目数",
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
      CircularData: {
        Circular: [],
        series: [],
        title: [],
      },
    };
  },
  watch: {},
  computed: {},
  mixins: [mixin],
  methods: {
    draw() {
      supplier().then((res) => {
        this.event.total = parseInt(res.data[0].total);
        for (let item of res.data) {
          this.event.series[0].data.push({
            name: item.operator,
            value: item.branchOffice,
          });
        }
      });
      bestSellers().then((res) => {
        this.HotCommodity = res.data;
      });
      outsourcing().then((res) => {
        let projectMax = [],
          areaMax = [];

        for (let item of res.data) {
          if (item.operator == "project") {
            this.appCoverage2.series[1].data.push(item.externalProject);
            projectMax.push(item.externalProject);
            this.appCoverage2.xdata.push(item.outsourcing);
          }
          if (item.operator == "area") {
            this.appCoverage3.series[1].data.push(item.externalProject);
            areaMax.push(item.externalProject);
            this.appCoverage3.xdata.push(item.outsourcing);
          }
          if (item.operator == "personnel") {
            this.CircularData.Circular.push({
              name: item.outsourcing,
              value: item.externalProject,
            });
          }

          if (item.operator == "personnel_total") {
            this.Outsourcing.peopletotal = item.externalProject;
          }
          if (item.operator == "area_total") {
            this.Outsourcing.Acreagetotal = item.externalProject;
          }
          if (item.operator == "project_total") {
            this.Outsourcing.objtotal = item.externalProject;
          }
        }
        projectMax.sort(function (a, b) {
          return a - b;
        });
        areaMax.sort(function (a, b) {
          return a - b;
        });
        projectMax.forEach(() => {
          this.appCoverage2.series[0].data.push(
            projectMax[projectMax.length - 1]
          );
          this.appCoverage3.series[0].data.push(areaMax[areaMax.length - 1]);
        });
        this.maxData(this.appCoverage3.series, 4, "disMerges");
        this.appCoverage3.max = this.max;
        this.appCoverage3.inx = this.inx;

        this.maxData(this.appCoverage2.series, 4, "disMerges");
        this.appCoverage2.max = this.max;
        this.appCoverage2.inx = this.inx;
        this.SetCircular();
      });
      activity().then((res) => {
        let month = [];
        for (let item of res.data) {
          if (this.appCoverage.legend.data.indexOf(item.branchOffice) == -1) {
            this.appCoverage.legend.data.push(item.branchOffice);
            this.appCoverage.series.push({
              name: item.branchOffice,
              type: "bar",
              data: [item.activeUser],
              barWidth: "8%",
              itemStyle: {
                normal: {
                  barBorderRadius: 2,
                },
              },
            });
          } else {
            this.appCoverage.series
              .find((e) => e.name == item.branchOffice)
              .data.push(item.activeUser);
          }
          if (this.appCoverage.xdata.indexOf(item.month) == -1) {
            this.appCoverage.xdata.push(item.month);
          }
        }
        this.maxData(this.appCoverage.series, 4, "disMerges");
        this.appCoverage.max = this.max;
        this.appCoverage.inx = this.inx;
      });
      businessLines().then((res) => {
        this.config.area = res.data[0].total;
        this.config.data = res.data.map((v) => {
          return {
            name: v.operator,
            value: parseInt(v.cs),
          };
        });
      });
    },
    SetCircular() {
      let sCenter = {},
        TitleXy = {};
      // series = this.CircularData.series,
      // title = this.CircularData.title;
      let datas = this.CircularData.Circular;
      this.CircularData.Circular.forEach((item, index) => {
        if (index < 2) {
          sCenter = [index * 35 + 33 + "%", "18%"];
          TitleXy = {
            left: index * 35 + 30 + "%",
            top: "35%",
          };
        } else {
          sCenter = [(index - 2) * 35 + 33 + "%", "67%"];
          TitleXy = {
            left: (index - 2) * 35 + 30 + "%",
            top: "85%",
          };
        }
        this.CircularData.title.push({
          text: item.name,
          left: TitleXy.left,
          top: TitleXy.top,
          textAlign: "center",
          textStyle: {
            fontWeight: "bold",
            fontSize: this.fontSize(0.12),
            color: "#fff",
            textAlign: "center",
          },
        });
        this.CircularData.series.push({
          name: item.name,
          type: "pie",
          clockWise: false,
          radius: [this.fontSize(0.25), this.fontSize(0.3)],
          itemStyle: {
            normal: {
              color: {
                colorStops: [
                  {
                    offset: 0,
                    color: "#FFDB5C", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#24D4FF", // 100% 处的颜色
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
          hoverAnimation: false,
          center: sCenter,
          data: [
            {
              value: item.value,
              label: {
                normal: {
                  formatter: function (params) {
                    return params.value + "%";
                  },
                  position: "center",
                  show: true,
                  textStyle: {
                    fontSize: this.fontSize(0.18),
                    fontWeight: "bold",
                    color: "#24D4FF",
                  },
                },
              },
            },
            {
              value: 100 - item.value,
              name: "invisible",
              itemStyle: {
                normal: {
                  color: "#253154",
                },
                emphasis: {
                  color: "#253154",
                },
              },
            },
          ],
        });
      });
    },
  },
  created() {
    this.draw();
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
  width: 7.825rem;
  .firstLine {
    // width: 7.825rem;
    display: flex;
    align-items: center;
    .title2 {
      display: flex;
      // width: 1.7875rem !important;
      padding-bottom: 0;
      // margin: 0 1.0375rem;

      span:last-child {
        font-family: "DIN-Bold";
      }
    }
    .top5 {
      padding: 0 0.2rem;
      padding-top: 0.1875rem;
      li {
        border: 1px solid rgba(36, 212, 255, 1);
        display: flex;
        align-items: center;
        line-height: 0.362rem;
        border-radius: 6px;
        padding-left: 0.0875rem;
        font-size: 0.175rem;
        color: #24d4ff;
        margin-bottom: 0.125rem;
        span {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        span:first-child {
          padding-right: 0.25rem;
          color: #fff;
        }
      }
    }
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
    .right:first-child {
      margin-right: 0.075rem;
    }
    .right:last-child {
      background: none;
    }
  }
  .secondLine {
    display: flex;
    margin: 0.075rem 0;
    .tipslist {
      display: flex;
      align-items: center;
      justify-content: space-around;
      .tips2 {
        margin: 0;
        padding-top: 0.0375rem;
        padding-bottom: 0.0575rem;
        margin-top: 0.2rem;

        span:first-child {
          color: #fff;
          font-size: 0.225rem;
          width: 1.875rem;
          text-align: center;
          line-height: 0.225rem;
        }
        span:last-child {
          color: #24d4ff;
          font-size: 0.4rem;
          line-height: 0.3625rem;
          padding-top: 0.1rem;
          font-family: "DIN-Bold";
          .nomalsma {
            font-size: 0.25rem;
            font-family: "Normal" !important;
          }
        }
      }
    }
    .chartsbottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 2.1rem;
      padding-left: 0.1rem;
      .left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 2.1rem;
        flex: 2.1;
      }
      .right {
        flex: 1;
        .flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
    .centre {
      width: 7.825rem;
      height: 3.75rem;
      background: url(../../assets/bigrow.png) no-repeat center center;
      background-size: 100%;
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