<template>
  <div class="wrap">
    <div class="top">
      <ul>
        <li>
          品牌价值：
          <span>
            <span class="DIN-Bold">¥{{brandValue}}</span>
            <span class="nomalsma">万</span>
          </span>
        </li>
        <li>
          信用评级：
          <span>{{rating}}</span>
        </li>
        <li>
          捐赠总额：
          <span>
            <span class="DIN-Bold">¥{{donatetotal}}</span>
            <span class="nomalsma">万</span>
          </span>
        </li>
      </ul>
      <ul>
        <li>
          全国百强排名：
          <span class="DIN-Bold">{{toprank}}强</span>
        </li>
        <li>
          注册商标数：
          <span class="DIN-Bold">{{trademark}}</span>
        </li>
        <li>
          知识产权数：
          <span class="DIN-Bold">{{propertyright}}</span>
        </li>
      </ul>
    </div>
    <!-- <earth id="earth1" :options="datasourse" v-if="datasourse.series[0].data.length"></earth>
    -->
    <div :id="id" style="width:98%; height:6rem;margin:0 auto"></div>
    <div class="bottoms">
      <p>{{options.tipsinfo[0]}}</p>
      <p>{{options.tipsinfo[1]}}</p>
    </div>
  </div>
</template>

<script>
// import earth from "../newEcharts/earth";
// import { getEarth } from "@/api/api.js";
import echartMixins from "@/utils/resizeMixins";
import { getBrandinfo } from "@/api/api.js";
// important
const echarts = require("echarts");
import china from "echarts/map/json/china.json";
echarts.registerMap("china", china);
export default {
  data() {
    return {
      chart: undefined,
      brandValue: "1442422",
      trademark: "77",
      propertyright: "14",
      rating: "AAA",
      donatetotal: "24",
      brandreputation: "8",
      toprank: "7",
      mapData: [
        {
          name: "北京",
          value: 121,
        },
        {
          name: "天津",
          value: 20.22222,
        },
        {
          name: "上海",
          value: "99",
        },
        {
          name: "重庆",
          value: this.randomData(),
        },
        {
          name: "河北",
          value: this.randomData(),
        },
        {
          name: "河南",
          value: this.randomData(),
        },
        {
          name: "云南",
          value: this.randomData(),
        },
        {
          name: "辽宁",
          value: this.randomData(),
        },
        {
          name: "黑龙江",
          value: this.randomData(),
        },
        {
          name: "湖南",
          value: this.randomData(),
        },
        {
          name: "安徽",
          value: this.randomData(),
        },
        {
          name: "山东",
          value: this.randomData(),
        },
        {
          name: "新疆",
          value: this.randomData(),
        },
        {
          name: "江苏",
          value: this.randomData(),
        },
        {
          name: "浙江",
          value: this.randomData(),
        },
        {
          name: "江西",
          value: this.randomData(),
        },
        {
          name: "湖北",
          value: this.randomData(),
        },
        {
          name: "广西",
          value: this.randomData(),
        },
        {
          name: "甘肃",
          value: this.randomData(),
        },
        {
          name: "山西",
          value: this.randomData(),
        },
        {
          name: "内蒙古",
          value: this.randomData(),
        },
        {
          name: "陕西",
          value: this.randomData(),
        },
        {
          name: "吉林",
          value: this.randomData(),
        },
        {
          name: "福建",
          value: this.randomData(),
        },
        {
          name: "贵州",
          value: this.randomData(),
        },
        {
          name: "广东",
          value: this.randomData(),
        },
        {
          name: "青海",
          value: this.randomData(),
        },
        {
          name: "西藏",
          value: this.randomData(),
        },
        {
          name: "四川",
          value: this.randomData(),
        },
        {
          name: "宁夏",
          value: this.randomData(),
        },
        {
          name: "海南",
          value: this.randomData(),
        },
        {
          name: "台湾",
          value: this.randomData(),
        },
        {
          name: "香港",
          value: this.randomData(),
        },
        {
          name: "澳门",
          value: this.randomData(),
        },
        {
          name: "南海诸岛",
          value: "666",
        },
      ],
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
  components: {
    // earth,
  },
  watch: {
    options: {
      handler(val, oldVal) {
        this.options = val;
        this.$nextTick(() => {
          this.setOption();
        });
      },
      deep: true,
    },
  },
  mounted() {
    this.draw();

    // this.$nextTick(() => {});
  },
  beforeDestroy() {
    if (!this.chart) return;
    this.chart.dispose();
    this.chart = null;
  },
  created() {
    // this.draw();
  },
  methods: {
    getData() {
      getBrandinfo().then((res) => {
        this.brandValue = res.data.brandValue;
        this.trademark = res.data.trademark;
        this.propertyright = res.data.propertyright;
        this.rating = res.data.rating;
        this.donatetotal = res.data.donatetotal;
        this.brandreputation = res.data.brandreputation;
        this.toprank = res.data.toprank;
      });
    },
    draw() {
      this.chart = echarts.init(document.getElementById(this.id), "BI");
      this.setOption();
    },
    setOption() {
      if (!this.chart) return;
      // let series = "";
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
          formatter: function (e) {},
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

        series: [
          {
            type: "map",
            mapType: "china",
            geoIndex: 1,
            // aspectScale: 0.75,
            layoutCenter: ["51%", "50%"],
            layoutSize: "95%",
            zoom: 1.3,
            itemStyle: {
              normal: {
                borderColor: "#24D4FF",
                borderWidth: 1,
              },
              emphasis: {
                areaColor: "#FFDC5C",
                label: {
                  show: true,
                },
              },
            },
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                color: "#fff",
              },
            },
            data: this.mapData,
          },
          this.options.series[0],
          this.options.series[1],
          this.options.series[2],
        ],
        // this.options.series,
      };
      this.chart.setOption(option, true);
    },
    randomData() {
      return Math.round(Math.random() * 100);
    },
  },
};
</script>

<style lang="scss">
.wrap {
  // width: 100%;
  .top {
    padding: 0.325rem 0.35rem;
    padding-top: 0;
    display: flex;
    justify-content: space-between;
    ul {
      color: #fff;
      text-align: left;
      li {
        line-height: 0.225rem;
        font-size: 0.225rem;
        padding-bottom: 0.1375rem;
        span {
          color: #fdbc68;
        }
      }
      li:last-child {
        padding: 0;
      }
    }
    ul:first-child {
      padding-right: 1.975rem;
    }
  }
  .bottoms {
    background: rgba(37, 49, 84, 0.5);
    box-shadow: 0px 2px 4px 0px rgba(16, 21, 50, 1);
    border-radius: 0.075rem;
    padding: 0.15rem 0;
    width: 2.25rem;
    margin-left: 0.25rem;
    p {
      font-size: 0.225rem;
      text-align: center;
      color: #fff;
    }
  }
}
</style>