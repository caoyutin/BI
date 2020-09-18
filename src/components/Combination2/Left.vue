<template>
  <div class="wrapper">
    <!-- <div class="OuterFrame"> -->
    <div class="firstLine">
      <div class="lef">
        <div class="titles">【营业额数据】</div>
        <div class="item1" v-for="(item,index) in options" :key="index">
          <p class="titlesmall words4 postiontitle" style="margin-top:0.25rem">{{item.name}}</p>
          <onlyColumnar style="width:100%; height:2.7125rem;" :series="item.data" :id="item.id" />
        </div>
      </div>
      <div class="right">
        <div class="titles">【全国服务数据】</div>
        <ServiceData />
      </div>
    </div>

    <div class="secondLine">
      <div class="centre">
        <div class="titles">【客户投诉】</div>
        <div class="TwoCharts">
          <div class="top">
            <p class="titlesmall words4" style="margin-top:0.25rem">客诉概览</p>

            <div class="title2">
              <div>
                <span>
                  <span>近四个月总数</span>
                  <span>{{options1.total}}</span>
                </span>
              </div>
            </div>

            <p class="titlesmall words3" style="margin-top:0.25rem">闭单率</p>
          </div>
          <div class="chart">
            <onlyFan
              id="fan3"
              :series="options1"
              style="width:100%;height:2.225rem;margin-right:0.6875rem"
            />
            <ComplexColumnar
              id="complexcolum2"
              :series="options2"
              style="width:100%;height:2.225rem"
            />
          </div>
        </div>

        <!-- <jzt /> -->
        <!-- <leftcenter /> -->
      </div>
    </div>
    <div class="lastLine">
      <div class="centre">
        <div class="titles">【EBA设备告警】</div>
        <table cellpadding="0" cellspacing="0">
          <thead>
            <tr>
              <td>项目名称</td>
              <td>设备类型</td>
              <td>时间</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in ebaData.slice(0 ,3)" :key="item.id">
              <td>{{item.commodityName}}:{{item.alarmType}}</td>
              <td>{{item.navName}}:{{item.deviceName}}</td>
              <td>{{item.alarmTime|formatDate}}</td>
            </tr>
            <!-- <tr>
              <td>福州融信澜郡：水浸告警</td>
              <td>B区生活水泵房_水浸-水浸告警</td>
              <td>2019-4-9 18:26</td>
            </tr>
            <tr>
              <td>福州融信澜郡：水浸告警</td>
              <td>B区生活水泵房_水浸-水浸告警</td>
              <td>2019-4-9 18:26</td>
            </tr>-->
          </tbody>
        </table>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import onlyColumnar from "../newEcharts/onlyColumnar";
import ServiceData from "../newEcharts/ServiceData";
import onlyFan from "../newEcharts/onlyFan";
import ComplexColumnar from "../newEcharts/ComplexColumnar";
import mixin from "../../utils/mixin";
import {
  eba,
  complaint,
  TurnoverYear,
  TurnoverMonth,
  complaintMonth,
} from "@/api/api.js";

export default {
  components: {
    ServiceData,
    onlyColumnar,
    onlyFan,
    ComplexColumnar,
  },
  props: {},
  mixins: [mixin],
  data() {
    return {
      options: [
        {
          id: "id1",
          name: "每年营业额",
          data: {
            max: 0,
            inx: 0,
            color: ["#01FFF5", "#24D4FF"],
            legend: {
              data: ["营业额（万）", "订单量"],
              // top: "0",
              itemGap: this.fontSize(0.1),
              itemHeight: this.fontSize(0.08),
              itemWidth: this.fontSize(0.16),
              orient: "vertical",
              right: "8",
              selectorPosition: "end",
              textStyle: {
                color: "#fff",
                fontSize: this.fontSize(0.12),
              },
            },
            grid: {
              left: "6%",
              right: "6%",
              bottom: "0%",
              top: "30%",
              containLabel: true,
            },
            series: [
              {
                name: "营业额（万）",
                type: "bar",
                data: [],
                barWidth: "19%",
                itemStyle: {
                  normal: {
                    barBorderRadius: 3,
                  },
                },
              },
              {
                name: "订单量",
                type: "bar",
                data: [],
                barWidth: "19%",
                itemStyle: {
                  normal: {
                    barBorderRadius: 3,
                  },
                },
              },
            ],
            xdata: [],
          },
        },
        {
          id: "id2",
          name: "月度营业额",
          data: {
            max: 0,
            inx: 0,
            color: ["#01FFF5", "#24D4FF"],
            legend: {
              data: ["营业额（万）", "订单量"],
              // top: "0",
              itemGap: this.fontSize(0.1),
              itemHeight: this.fontSize(0.08),
              itemWidth: this.fontSize(0.16),
              orient: "vertical",
              right: "8",
              selectorPosition: "end",
              textStyle: {
                color: "#fff",
                fontSize: this.fontSize(0.12),
              },
            },
            grid: {
              left: "6%",
              right: "6%",
              bottom: "0%",
              top: "30%",
              containLabel: true,
            },
            series: [
              {
                name: "营业额（万）",
                type: "bar",
                data: [],
                data2: [],
                barWidth: "19%",
                itemStyle: {
                  normal: {
                    barBorderRadius: 3,
                  },
                },
              },
              {
                name: "订单量",
                type: "bar",
                data: [],
                data2: [],
                barWidth: "19%",
                itemStyle: {
                  normal: {
                    barBorderRadius: 3,
                  },
                },
              },
            ],
            xdata: [],
          },
        },
      ],
      ebaData: [],

      options1: {
        total: 0,
        color: [
          "#24D4FF",
          "#3BD1C0",
          "#FFDB5C",
          "#FFB157",
          "#FF9F7F",
          "#FB7294",
        ],
        grid: {
          left: "5%",
          right: "5%",
        },
        series: [
          {
            name: "客诉概览",
            type: "pie",
            radius: "70%",
            avoidLabelOverlap: false,
            minAngle: 5,
            startAngle: 30,
            label: {
              normal: {
                padding: [0, -this.fontSize(0.39)],
                // formatter: "{b|{b}}\n{hr|}\n{c|{c}%}",
                formatter: (v) => {
                  let ary = ["{a|" + v.name + "}", "{c|" + v.percent + "}"];
                  return ary.join("\n");
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
              length: this.fontSize(0.08),
              length2: this.fontSize(0.45),
            },

            data: [
              // { value: 235, name: "环境管理" },
              // { value: 110, name: "安全管理" },
              // { value: 250, name: "服务人员" },
              // { value: 135, name: "工程管理" },
              // { value: 250, name: "地产相关" },
              // { value: 250, name: "综合管理" },
              // { value: 250, name: "其他" },
              // { value: 124, name: "邻里纠纷" },
            ],
          },
        ],
      },
      options2: {
        color: ["#24D4FF", "#FFDC5C"],
        max: 0,
        inx: 0,
        inx2: 0,
        legend: [
          {
            data: ["客诉总量", "已关闭", "关闭率"],
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
          left: "0%",
          right: "0%",
          bottom: "0%",
          top: "30%",
          containLabel: true,
        },
        series: [
          {
            name: "客诉总量",
            type: "bar",
            data: [],
            stack: "sum",
            barWidth: "30%",
          },
          {
            name: "已关闭",
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
              },
            },
          },
        ],
        xdata: [],
      },
    };
  },
  filters: {
    /* 格式化时间戳 */

    formatDate(val) {
      const date = new Date(val);

      const year = date.getFullYear();

      const month =
        date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;

      const day =
        date.getDate() > 9 ? date.getDate() + 1 : `0${date.getDate() + 1}`;

      return `${year}-${month}-${day}`;

      console.log(val);
    },
  },
  watch: {},
  computed: {},
  methods: {
    draw() {
      TurnoverYear().then((res) => {
        this.options[0].data.series[0].data = res.data.map((v) => {
          return v.businessAmount;
        });
        this.options[0].data.xdata = res.data.map((v) => {
          return v.revenueDate;
        });
        this.options[0].data.series[1].data = res.data.map((v) => {
          return v.orderNumber;
        });
        this.maxData(this.options[0].data.series, 3, "disMerges");
        this.options[0].data.max = this.max;
        this.options[0].data.inx = this.inx;
      });
      TurnoverMonth().then((res) => {
        this.options[1].data.series[0].data = res.data.map((v) => {
          return v.businessAmount;
        });
        this.options[1].data.xdata = res.data.map((v) => {
          return v.revenueDate.substr(5, 2) + "月";
        });
        this.options[1].data.series[1].data = res.data.map((v) => {
          return v.orderNumber;
        });
        this.maxData(this.options[1].data.series, 3, "disMerges");
        this.options[1].data.max = this.max;
        this.options[1].data.inx = this.inx;
      });
      eba().then((res) => {
        this.ebaData = res.data;
      });
      complaint().then((res) => {
        for (let item of res.data) {
          if (item.a != "近4个月总数") {
            this.options1.series[0].data.push({
              name: item.a,
              value: item.c,
            });
          } else {
            this.options1.total = parseInt(item.c);
          }
        }
      });
      complaintMonth().then((res) => {
        for (var item of res.data) {
          this.options2.series[0].data.push(item.id);
          this.options2.series[1].data.push(item.c);
          this.options2.series[2].data.push(item.a * 100);
          this.options2.xdata.push(item.b.substr(4, 2) + "月");
        }
        this.maxData(this.options2.series, 2, "Merges");
        this.options2.max = this.max;
        this.options2.inx = this.inx;
        this.options2.inx2 = 50;
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
    width: 7.825rem;
    display: flex;
    align-items: center;
    .lef {
      margin-right: 0.075rem;
      width: 3.875rem;
      height: 6.575rem;
      background: url(../../assets/bigright.png) no-repeat center center;
      background-size: 100%;
      .item1 {
        position: relative;
        margin-top: 0.25rem;
        .postiontitle {
          position: absolute;
          margin-top: 0 !important;
          top: 0;
          left: 0.3625rem;
        }
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