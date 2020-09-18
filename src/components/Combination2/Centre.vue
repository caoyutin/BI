<template>
  <div class="wrapper">
    <div class="title">
      <h3>融信服务智控管理平台</h3>
      <p>
        <span class="colorYello">2020</span>年
        <span class="colorYello">07</span>月
        <span class="colorYello">01</span>日 星日三
        <span class="colorYello">08:00:23</span> 大雨23℃～30℃
      </p>
    </div>
    <div class="earth">
      <center :options="datasourse" :id="id" v-if="datasourse.series[0].data.length" />
    </div>
    <div class="centebottom">
      <div class="titles">【员工管理】</div>
      <div class="TwoCharts">
        <div class="top">
          <p class="titlesmall words4" style="margin-top:0.25rem">招聘数据</p>

          <p class="titlesmall words3" style="margin-top:0.25rem">员工司龄分布</p>
        </div>
        <div class="chart">
          <onlyLine
            id="onlyLine1"
            style="width:3.375rem;height:2.3625rem;margin-right:0.6875rem"
            :series="option"
            v-if="option.series[2].data.length"
          />
          <Radar
            id="Radar2"
            :series="raderdata"
            style="width:3.375rem;height:2.5625rem"
            v-if="raderdata.indicator.length"
          />
        </div>
      </div>
      <!-- <bottom /> -->
    </div>
  </div>
</template>

<script>
import center from "../newEcharts/earthcenter";
import onlyLine from "../newEcharts/onlyLine";
import Radar from "../newEcharts/Radar";
import { recruitment, hrinfo } from "@/api/api.js";
export default {
  components: {
    center,
    onlyLine,
    Radar,
  },
  props: {},
  data() {
    return {
      id: "earth1",
      datasourse: {
        tipsinfo: ["储备地块分布", "储备地块数：577"],
        series: [
          {
            name: "区域",
            type: "scatter",
            symbol: "circle",

            coordinateSystem: "geo",
            data: [
              // {
              //   name: "江西",
              //   value: [115.85794, 28.68202, 6],
              //   visualMap: false,
              // },
              // {
              //   name: "云南",
              //   value: [102.83322, 24.87966, 3],
              //   visualMap: false,
              // },
              // {
              //   name: "江苏",
              //   value: [120.16164, 33.34951, 10],
              //   visualMap: false,
              // },
              // {
              //   name: "安徽",
              //   value: [116.83359, 32.63142, 60],
              //   visualMap: false,
              // },
              // {
              //   name: "广州区域公司",
              //   value: [113.26436, 23.12908, 56],
              //   visualMap: false,
              // },
              // {
              //   name: "重庆",
              //   value: [106.55073, 29.56471, 58],
              //   visualMap: false,
              // },
              // {
              //   name: "山西",
              //   value: [112.55067, 37.87059, 66],
              //   visualMap: false,
              // },
              // {
              //   name: "山东",
              //   value: [118.0548, 36.8131, 65],
              //   visualMap: false,
              // },
              // {
              //   name: "河北",
              //   value: [115.46459, 38.87396, 64],
              //   visualMap: false,
              // },
              // {
              //   name: "广西",
              //   value: [108.3669, 22.81673, 61],
              //   visualMap: false,
              // },
              // {
              //   name: "浙江",
              //   value: [120.15515, 30.27415, 64],
              //   visualMap: false,
              // },
              // {
              //   name: "福州区域公司",
              //   value: [119.313766, 26.063459, 69],
              //   visualMap: false,
              // },
              // {
              //   name: "闽南区域公司",
              //   value: [118.065901, 24.502554, 67],
              //   visualMap: false,
              // },
              // {
              //   name: "杭州区域公司",
              //   value: [120.216125, 30.246086, 71],
              //   visualMap: false,
              // },
              // {
              //   name: "郑州区域公司",
              //   value: [113.691978, 34.805481, 68],
              //   visualMap: false,
              // },
              // {
              //   name: "成都区域公司",
              //   value: [104.10194, 30.65984, 71],
              //   visualMap: false,
              // },
              // {
              //   name: "天津区域公司",
              //   value: ["118.890182", 39.71755, 75],
              //   visualMap: false,
              // },
              // {
              //   name: "湖南",
              //   value: [112.93886, 28.22778, 71],
              //   visualMap: false,
              // },
            ],
            itemStyle: {
              normal: {
                color: ["#fff"],
                visualMap: false,
              },
            },
            symbolSize: 10,
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
          },
        ],
      },
      option: {
        series: [
          {
            name: "在岗率",
            type: "line",
            stack: "总量",
            symbolSize: this.fontSize(0.06),
            data: [],
          },
          {
            name: "离职率",
            type: "line",
            stack: "总量",
            symbolSize: this.fontSize(0.06),
            data: [],
          },
          {
            name: "招聘完成率",
            type: "line",
            stack: "总量",
            symbolSize: this.fontSize(0.06),
            data: [],
          },
        ],
        xdata: [],
        legend: {
          data: ["在岗率", "离职率", "招聘完成率"],
        },
      },
      raderdata: {
        shape: "circle",
        indicator: [],
        series: {
          data: [],
        },
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    draw() {
      recruitment().then((res) => {
        for (let item of res.data) {
          this.option.xdata.push(item.month.substr(5, 2));
          this.option.series[0].data.push(item.onDutyRate);
          this.option.series[1].data.push(item.turnoverRate);
          this.option.series[2].data.push(item.rCRate);
        }
      });
      this.$store.dispatch("commitEmp").then(() => {
        let empl = this.$store.state.EmployeesInfo;
        let ary = [];
        for (let key of empl) {
          if (key.id == 102) {
            ary.push(key.headquarters);
          }
        }
        this.raderdata.series.data = ary;
        ary.sort(function (a, b) {
          return a - b;
        });
        this.raderdata.indicator = [
          { text: "1年以下", max: ary[ary.length - 1] },
          { text: "1-3年（含）", max: ary[ary.length - 1] },
          { text: "3-5年（含）", max: ary[ary.length - 1] },
          { text: "5-10年（含）", max: ary[ary.length - 1] },
          { text: "10年以上", max: ary[ary.length - 1] },
        ];
      });
      this.$store.dispatch("commitMap").then(() => {
        let map = this.$store.state.mapData;
        let maps = [];
        for (let i in map) {
          if (map[i].type == 3) {
            this.datasourse.series[0].data.push({
              name: map[i].name,
              value: [map[i].longitude, map[i].latitude],
              visualMap: false,
            });
          }
        }
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
.wrapper {
  .title {
    width: 8rem;
    text-align: center;
    margin-top: 0.0625rem;
    h3 {
      font-size: 0.55rem;
      line-height: 0.55rem;
      background: linear-gradient(to top, #24d4ff, #01fff5);
      -webkit-background-clip: text;
      color: transparent;
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
    }
    p {
      margin-top: 0.1125rem;
      text-align: center;
      font-size: 0.2rem;
      line-height: 0.2rem;
      margin-bottom: 0.325rem;
    }
  }

  .earth {
    width: 8rem;
    height: 8.55rem;
    margin: 0 0.075rem;
  }
  .centebottom {
    width: 8rem;
    margin: 0 0.075rem;
    height: 3.5rem;
    background: url(../../assets/centerrow.png) no-repeat center center;
    background-size: 100%;
    .TwoCharts {
      .top {
        height: 3.025rem !important;
      }
      .chart {
        top: 0.2875rem !important;
      }
    }
  }
}
</style>