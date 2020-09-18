<template>
  <div class="wrapper">
    <div class="title">
      <h3>融信服务智控管理平台</h3>
      <p>
        <span class="colorYello">{{time.year}}</span>年
        <span class="colorYello">{{time.mon}}</span>月
        <span class="colorYello">{{time.day}}</span>
        日 {{time.week}}
        <span class="colorYello">{{time.h}}</span> 大雨23℃～30℃
      </p>
    </div>
    <div class="earth">
      <center :options="datasourse" :id="id" ref="earth" v-if="datasourse.series[0].data.length" />
    </div>
    <div class="centebottom">
      <div class="titles">【员工管理】</div>
      <div class="top">
        <p class="titlesmall words4" style="margin-top:0.25rem">员工数据</p>

        <div class="title2">
          <div>
            <span>
              <span>总人数</span>
              <span>{{event.totalPerson}}</span>
            </span>
          </div>
        </div>

        <p class="titlesmall words10" style="margin-top:0.25rem">员工年龄分布</p>
      </div>
      <div class="charts">
        <onlyFan
          id="fan5"
          :series="event"
          style="width:100%;height:2.2875rem;padding-right: 0.2375rem;"
          v-if="raderdata.indicator.length"
        />
        <rader
          id="rader"
          :series="raderdata"
          style="width:100%;height:2.287rem"
          v-if="raderdata.indicator.length"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import bottom from "./centerbottom";
import center from "../newEcharts/earthcenter";
import onlyFan from "../newEcharts/onlyFan";
import rader from "../newEcharts/Radar";
// import weather from "../../utils/weather";
import { hrinfo, cityMap, communityDoor } from "@/api/api.js";
// import center from "./earthcenter";
export default {
  components: {
    // bottom,
    center,
    onlyFan,
    rader,
  },
  props: {},
  data() {
    return {
      id: "earth12",
      Coord: {
        北京: [116.397128, 39.916527],
        上海: [121.87667806640625, 31.82627782140638],
        重庆: [106.54041, 29.40268],
        杭州: [120.21201, 30.2084],
        合肥: [117.30794, 31.79322],
        福州: [119.27345, 26.04769],
        厦门: [118.03394, 24.48405],
        天津: [117.30983, 39.71755],
        徐州: [117.184811, 34.261792],
        南京: [118.767413, 32.041544],
        苏州: [120.619585, 31.299379],
        郑州: [113.6401, 34.72468],
        沈阳: [123.46187734374999, 41.66572762675715],
      },
      time: {
        year: "2020",
        mon: "08",
        day: "15",
        h: "12:05:10",
        week: "星期天",
      },
      datasourse: {
        doorData: [],
        tipsinfo: ["在管项目分布", "在管项目数：311"],
        series: [
          // 上海

          {
            name: "区域",
            type: "scatter",
            symbol: "circle",

            coordinateSystem: "geo",
            data: [],
            itemStyle: {
              normal: {
                color: ["#4ab2e5", "#4ab2e5"],
                visualMap: false,
                // shadowBlur: 10,
                // shadowColor: "#333",
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
          {
            type: "lines",
            zlevel: 1,
            // z: 1,
            effect: {
              show: true,
              period: 4, //箭头指向速度，值越小速度越快
              trailLength: 0.4, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: "none", //箭头图标
              symbolSize: 7, //图标大小
            },
            lineStyle: {
              normal: {
                color: "#1DE9B6",
                type: "dashed",
                width: 1, //线条宽度
                opacity: 0.1, //尾迹线条透明度
                curveness: 0.3, //尾迹线条曲直度
              },
            },
            data: [
              // {
              //   coords: [
              //     [115.85794, 28.68202],
              //     [121.271268, 31.188753, 33],
              //   ],
              //   lineStyle: {
              //     color: "#4ab2e5",
              //   },
              //   visualMap: false,
              // },
              // {
              //   coords: [
              //     [102.83322, 24.87966],
              //     [121.271268, 31.188753, 33],
              //   ],
              //   lineStyle: {
              //     color: "#4fb6d2",
              //   },
              //   visualMap: false,
              // },
              // {
              //   coords: [
              //     [120.16164, 33.34951],
              //     [121.271268, 31.188753, 33],
              //   ],
              //   lineStyle: {
              //     color: "#52b9c7",
              //   },
              //   visualMap: false,
              // },
              // {
              //   coords: [
              //     [121.271268, 31.188753],
              //     [121.271268, 31.188753, 33],
              //   ],
              //   lineStyle: {
              //     color: "#5abead",
              //   },
              //   visualMap: false,
              // },
              // {
              //   coords: [
              //     [116.83359, 32.63142],
              //     [121.271268, 31.188753, 33],
              //   ],
              //   lineStyle: {
              //     color: "#f34e2b",
              //   },
              //   visualMap: false,
              // },
              // {
              //   coords: [
              //     [113.26436, 23.12908],
              //     [121.271268, 31.188753, 33],
              //   ],
              //   lineStyle: {
              //     color: "#f56321",
              //   },
              //   visualMap: false,
              // },
              // {
              //   coords: [
              //     [106.55073, 29.56471],
              //     [121.271268, 31.188753, 33],
              //   ],
              //   lineStyle: {
              //     color: "#f56f1c",
              //   },
              //   visualMap: false,
              // },
              // {
              //   coords: [
              //     [112.55067, 37.87059],
              //     [121.271268, 31.188753, 33],
              //   ],
              //   lineStyle: {
              //     color: "#f58414",
              //   },
              //   visualMap: false,
              // },
              // {
              //   coords: [
              //     [118.0548, 36.8131],
              //     [121.271268, 31.188753, 33],
              //   ],
              //   lineStyle: {
              //     color: "#f58f0e",
              //   },
              //   visualMap: false,
              // },
              // {
              //   coords: [
              //     [115.46459, 38.87396],
              //     [121.271268, 31.188753, 33],
              //   ],
              //   lineStyle: {
              //     color: "#f5a305",
              //   },
              //   visualMap: false,
              // },
              // {
              //   coords: [
              //     [108.3669, 22.81673],
              //     [121.271268, 31.188753, 33],
              //   ],
              //   lineStyle: {
              //     color: "#e7ab0b",
              //   },
              //   visualMap: false,
              // },
              // {
              //   coords: [
              //     [120.15515, 30.27415],
              //     [121.271268, 31.188753, 33],
              //   ],
              //   lineStyle: {
              //     color: "#dfae10",
              //   },
              //   visualMap: false,
              // },
              // {
              //   coords: [
              //     [119.313766, 26.063459],
              //     [121.271268, 31.188753, 33],
              //   ],
              //   lineStyle: {
              //     color: "#d5b314",
              //   },
              //   visualMap: false,
              // },
              // {
              //   coords: [
              //     [121.271268, 31.188753],
              //     [121.271268, 31.188753, 33],
              //   ],
              //   lineStyle: {
              //     color: "#c1bb1f",
              //   },
              //   visualMap: false,
              // },
              // {
              //   coords: [
              //     [120.216125, 30.246086],
              //     [121.271268, 31.188753, 33],
              //   ],
              //   lineStyle: {
              //     color: "#b9be23",
              //   },
              //   visualMap: false,
              // },
              // {
              //   coords: [
              //     [118.065901, 24.502554],
              //     [121.271268, 31.188753, 33],
              //   ],
              //   lineStyle: {
              //     color: "#a6c62c",
              //   },
              //   visualMap: false,
              // },
              // {
              //   coords: [
              //     [104.10194, 30.65984],
              //     [121.271268, 31.188753, 33],
              //   ],
              //   lineStyle: {
              //     color: "#96cc34",
              //   },
              //   visualMap: false,
              // },
              // {
              //   coords: [
              //     [118.890182, 39.71755],
              //     [121.271268, 31.188753, 33],
              //   ],
              //   lineStyle: {
              //     color: "#96cc34",
              //   },
              //   visualMap: false,
              // },
              // {
              //   coords: [
              //     [112.93886, 28.22778, 71],
              //     [121.271268, 31.188753, 33],
              //   ],
              //   lineStyle: {
              //     color: "#96cc34",
              //   },
              //   visualMap: false,
              // },
              // {
              //   coords: [
              //     [113.691978, 34.805481],
              //     [121.271268, 31.188753, 33],
              //   ],
              //   lineStyle: {
              //     color: "#96cc34",
              //   },
              //   visualMap: false,
              // },
            ],
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            // zlevel: 2,
            rippleEffect: {
              // period: 1,
              // brushType: "stroke",
              scale: 4,
            },
            label: {
              normal: {
                show: true,
                formatter: function (params) {
                  return (
                    "{fline|项目： " +
                    params.data.communityName +
                    "}\n{fline|类型：" +
                    params.data.eventType +
                    "}\n{fline|客户：" +
                    params.data.userName +
                    "}\n{fline|时间：" +
                    params.data.happenTime +
                    "}"
                  );
                },
                position: "top",
                backgroundColor: "rgba(83,99,137,0.8)",
                padding: [0, 0],
                borderRadius: 3,
                lineHeight: 32,
                rich: {
                  fline: {
                    padding: [0, 10, 0, 10],
                    color: "#ffffff",
                  },
                  tline: {
                    padding: [10, 10, 0, 10],
                    color: "#ffffff",
                  },
                },
              },
              emphasis: {
                show: false,
              },
            },
            symbol: "circle",
            symbolSize: 12,
            // symbolSize: function (val) {
            //   return 2 + val[2] * 2; //圆环大小
            // },
            itemStyle: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: "上海总部",
                value: [121.271268, 31.188753, 33],
                visualMap: false,
                itemStyle: {
                  color: "#FF0016",
                },
                label: { show: false },
              },
            ],
          },
        ],
      },
      event: {
        totalPerson: 0,
        color: [
          "#24D4FF",
          "#3BD1C0",
          "#FFDB5C",
          "#FFB157",
          "#FF9F7F",
          "#FB7294",
          "#8478EA",
          "#F4CBFF",
          "#B2AAFF",
        ],
        title: [
          {
            // text: "女：45%\n男：50%",
            text: "",
            top: "center",
            left: "center",
            textStyle: {
              color: "#24D4FF",
              fontSize: this.fontSize(0.18),
              lineHeight: this.fontSize(0.26),
              // fontWeight: 400,
            },
          },
        ],
        series: [
          {
            name: "男女比例",
            type: "pie",
            radius: ["60%", "75%"],
            avoidLabelOverlap: false,
            startAngle: 30,
            label: {
              show: true,
              formatter: function (a) {
                return a.name + a.percent.toFixed(1) + "%";
              },
              textStyle: {
                fontSize: this.fontSize(0.12),
              },
            },
            labelLine: {
              length: 6,
              length2: 8,
            },
            data: [],
          },
        ],
      },
      raderdata: {
        shape: "polygon",
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
      this.$store.dispatch("commitEmp").then(() => {
        let empl = this.$store.state.EmployeesInfo;
        let ary = [];
        this.event.totalPerson = parseInt(empl[0].totalPeople);
        for (let item of empl) {
          if (item.id == 8) {
            ary.push(item.headquarters);
          } else if (item.id == 100) {
            if (item.operator == "男") {
              // 女：45%\n男：50%
              this.event.title[0].text +=
                "男：" + parseInt(item.percentage) + "%\n";
            } else if (item.operator == "女") {
              this.event.title[0].text +=
                "女：" + parseInt(item.percentage) + "%";
            } else {
              this.event.series[0].data.push({
                value: item.headquarters,
                name: item.operator,
              });
            }
          }
        }
        this.raderdata.series.data = ary;
        ary.sort(function (a, b) {
          return a - b;
        });
        this.raderdata.indicator = [
          { text: "20以下", max: ary[ary.length - 1] },
          { text: "50岁以上", max: ary[ary.length - 1] },
          { text: "40-50岁", max: ary[ary.length - 1] },
          { text: "30-40岁", max: ary[ary.length - 1] },
          { text: "20-30岁", max: ary[ary.length - 1] },
        ];
      });
      this.$store.dispatch("commitMap").then(() => {
        let colors = ["#DCFF00", "#FFAE00", "#18E945"];
        let map = this.$store.state.mapData;
        for (let i in map) {
          if (map[i].type == 1) {
            this.datasourse.series[0].data.push({
              name: map[i].name,
              value: [map[i].longitude, map[i].latitude, map[i].id],
              visualMap: false,
              itemStyle: {
                color: colors[i % 3],
              },
            });
            this.datasourse.series[1].data.push({
              coords: [
                [map[i].longitude, map[i].latitude],
                [121.271268, 31.188753, 33],
              ],
              lineStyle: {
                color: colors[i % 3],
              },
              visualMap: false,
            });
          }
        }
      });
    },
    // 门禁
    door(i) {
      communityDoor().then((res) => {
        // let data = res.data;
        this.datasourse.doorData = res.data;
        this.analysis(i);
      });
    },
    analysis(i) {
      let data = this.datasourse.doorData;
      // 加上判断，新数据判断
      if (i < data.length) {
        this.datasourse.series[2].data.push({
          name: "蛋糕糕",
          communityName: data[i].communityName,
          eventType: "门禁",
          userName: data[i].operatorUser,
          happenTime: data[i].openTime,
          value: this.coordse(),
          visualMap: false,
          itemStyle: {
            color: "#FFDC5C",
          },
        });
        setTimeout(() => {
          this.datasourse.series[2].data.splice(1, 1);
          i++;
          this.analysis(i);
        }, 2000);
      } else {
        this.door(0);
        return;
      }
    },
    coordse() {
      let cityIndex = Math.floor(Math.random() * 13);
      let runidx = Math.floor(Math.random() * 3);
      let coordCity = Object.keys(this.Coord)[cityIndex];
      let coord = this.Coord[coordCity];
      return coord;
    },
    setTime() {
      let day = "";
      let month = "";
      let ampm = "";
      let ampmhour = "";
      let myweekday = "";
      let year = "";
      let myHours = "";
      let myMinutes = "";
      let mySeconds = "";
      let weekday = "";
      let mydate = new Date();
      myweekday = mydate.getDay();
      let mymonth =
        parseInt(mydate.getMonth() + 1) < 10
          ? "0" + (mydate.getMonth() + 1)
          : mydate.getMonth() + 1;
      let myday =
        parseInt(mydate.getDate()) < 10
          ? "0" + mydate.getDate()
          : mydate.getDate();
      let myyear = mydate.getYear();
      myHours = mydate.getHours();
      myMinutes = mydate.getMinutes();
      mySeconds =
        parseInt(mydate.getSeconds()) < 10
          ? "0" + mydate.getSeconds()
          : mydate.getSeconds();
      year = myyear > 200 ? myyear : 1900 + myyear;
      if (myweekday == 0) weekday = " 星期日 ";
      else if (myweekday == 1) weekday = " 星期一 ";
      else if (myweekday == 2) weekday = " 星期二 ";
      else if (myweekday == 3) weekday = " 星期三 ";
      else if (myweekday == 4) weekday = " 星期四 ";
      else if (myweekday == 5) weekday = " 星期五 ";
      else if (myweekday == 6) weekday = " 星期六 ";
      this.time.year = year;
      this.time.mon = mymonth;
      this.time.day = myday;
      this.time.week = weekday;
      this.time.h = myHours + ":" + myMinutes + ":" + mySeconds;
    },
  },
  created() {
    this.draw();
    this.door(0);
    setInterval(() => {
      this.setTime();
    }, 1000);
  },
  mounted() {
    // setInterval(() => {
    //   this.door();
    // }, 5000);
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
    position: relative;
    width: 8rem;
    margin: 0 0.075rem;
    height: 3.5rem;
    background: url(../../assets/centerrow.png) no-repeat center center;
    background-size: 100%;
    .top {
      display: flex;
      position: relative;
      width: 100%;
      height: 3rem;
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
        margin: 0 auto;
        // width: 100%;
        text-align: center;
        // left: 2.375rem;
        div {
          padding: 0.1rem 0.1125rem;
          background: rgba(37, 49, 84, 0.4);
          border-radius: 4px;
          // width: 2.85rem;
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
      top: 1.08rem;
      // top: 0;
      left: 0.2rem;
      right: 0.2rem;
      padding-top: 0.1rem;

      // padding: 0.1rem 0 0.125rem 0;
    }
  }
}
</style>