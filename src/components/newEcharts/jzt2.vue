<template>
  <div class="highcharts-container" :id="id"></div>
</template>

<script>
import Highcharts from "highcharts/highstock";
import Highcharts3D from "highcharts/highcharts-3d";
import exporting from "highcharts/modules/exporting";
import cylinder from "../../libs/cylinder";
import funnel3d from "../../libs/funnel3d";
import pyramid3d from "../../libs/pyramid3d";
import funnel from "highcharts/modules/funnel";
Highcharts3D(Highcharts);
exporting(Highcharts);
cylinder(Highcharts);
funnel(Highcharts);
import echartMixins from "@/utils/resizeMixins";
const echarts = require("echarts");
export default {
  props: ["options", "styles"],
  name: "highcharts",
  mixins: [echartMixins],
  data() {
    return {
      chart: null,
      id: "jzt",
    };
  },
  updated() {},
  mounted() {
    this.initChart();
  },
  methods: {
    initChart3d() {
      var options = {
        chart: {
          backgroundColor: "none",
          type: "pyramid3d",

          options3d: {
            enabled: true,
            alpha: 10,
            depth: 50,
            viewDistance: 50,
          },
        },
        exporting: {
          enabled: false,
        },
        colors: [
          "#FF9F7F",
          "#FFB157",
          "#FFDC5C",
          "#3BD1C0",
          "#28B4F3",
          "#FB7294",
        ],
        title: {
          text: "",
        },
        tooltip: {
          backgroundColor: "rgba(37, 49, 84, 0.5)", // 背景颜色
          borderColor: "", // 边框颜色
          borderRadius: 10, // 边框圆角
          borderWidth: 0, // 边框宽度
          shadow: false, // 是否显示阴影
          animation: true, // 是否启用动画效果
          style: {
            // 文字内容相关样式
            color: "#fff",
            fontSize: "12px",
            // fontWeight: "blod",
            fontFamily: "Courir new",
          },
        },
        credits: {
          enabled: false,
        },
        subtitle: { text: "" },
        dashStyle: "Solid",
        plotOptions: {
          series: {
            dashStyle: "Solid",
            shadow: "false",
            dataLabels: {
              enabled: true,
              connectorColor: "blue",
              borderColor: "rgba(255,255,255,0)",
              shadow: false,
              format:
                "<b style='color:{point.color} '>{point.name}({point.y:,.0f})</b> ",

              connectorWidth: 2,
              // color:
              //   (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
              //   Highcharts.theme.contrastTextColor,
              allowOverlap: true,
              x: 10,
              y: -5,
              style: {
                textOutline: "none",
              },
            },
            width: "70%",
            height: "100%",
            center: ["35%", "45%"],
          },
        },
        // plotOptions: {
        //   pie: {
        //     allowPointSelect: true,
        //     cursor: "pointer",
        //     depth: 35,
        //     dataLabels: {
        //       enabled: true,
        //       format: "{point.name}",
        //     },
        //   },
        // },
        series: [
          {
            name: "Unique users",
            data: [
              ["保洁", 654],
              ["客服", 464],
              ["其他", 987],
              ["环境", 976],
              ["工程", 846],
              ["安全", 664],
            ],
          },
        ],
      };
      // 图表初始化函数

      var chart = Highcharts.chart(this.id, options);
    },
    initChart() {
      let options = {
        chart: {
          backgroundColor: "none",
          type: "pyramid",
          marginRight: 100,
        },
        exporting: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
        colors: [
          "#FF9F7F",
          "#FFB157",
          "#FFDC5C",
          "#3BD1C0",
          "#28B4F3",
          "#FB7294",
        ],
        title: {
          text: "",
          x: -50,
        },
        plotOptions: {
          series: {
            borderColor: "rgba(255,255,255,0)",

            dataLabels: {
              enabled: true,
              crop: false,
              format:
                "<b style='color:{point.color} '>{point.name}({point.y:,.0f})</b>",
              softConnector: true,
              style: {
                textOutline: "none",
              },
              padding: 0,
            },
          },
          width: "70%",
          height: "110%",
        },
        legend: {
          enabled: false,
        },
        series: [
          {
            name: "用户",
            data: [
              ["保洁", 654],
              ["客服", 464],
              ["其他", 987],
              ["环境", 976],
              ["工程", 846],
              ["安全", 664],
            ],
          },
        ],
      };
      var chart = Highcharts.chart(this.id, options);
    },
    draw() {
      this.chart = echarts.init(document.getElementById(this.id), "BI");
      let option = {
        // backgroundColor: "#ffffff",
        color: ["#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C"],
        tooltip: {
          show: false,
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}%",
        },
        legend: {
          show: false,
          data: [
            "20M以下",
            "20M-40M",
            "50M-99M",
            "100M-499M",
            "500M-999M",
            "1000M以上",
          ],
        },
        series: [
          {
            top: 60,
            type: "funnel",
            left: "-10",
            right: 170,
            bottom: 50,
            //gap:'auto',
            z: 1,
            minSize: 100,
            width: "100%",
            maxSize: 100,
            sort: "ascending",
            label: {
              normal: {
                color: "#fff",
                position: "right",
                padding: [0, 0],
                width: 100,
                formatter: "{c}%",
                //   formatter:function(d){
                //         var ins='{bb|}'+d.percent+'{aa|}';
                //         // ins+='{boximg| }';
                //         return ins

                //     },
                // rich:{
                //     aa:{
                //         backgroundColor:{image:url},
                //         align: 'center',

                //     },
                //     bb:{
                //         align: 'center',
                //     }

                // }
              },
            },
            //右侧的百分比显示的地方
            labelLine: {
              show: true,
              normal: {
                length: 15,
                position: "center",
                lineStyle: {
                  width: 1,
                  color: "#e8e9f1",
                  type: "solid",
                },
              },
            },
            //主体是透明的
            itemStyle: {
              normal: {
                color: "transparent",
                borderWidth: 0,
                opacity: 1,
              },
            },
            data: [
              { value: 60, name: "20M以下" },
              { value: 40, name: "20M-40M" },
              { value: 20, name: "50M-99M" },
              { value: 80, name: "100M-499M" },
              { value: 100, name: "500M-999M" },
              { value: 120, name: "1000M以上" },
            ],
          },
          {
            name: "预期",
            type: "funnel",
            left: "100",
            right: 200,
            sort: "ascending",
            z: 2,
            label: {
              normal: {
                position: "left",
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                opacity: 1,
              },
            },
            data: [
              { value: 60, name: "20M以下" },
              { value: 40, name: "20M-40M" },
              { value: 20, name: "50M-99M" },
              { value: 80, name: "100M-499M" },
              { value: 100, name: "500M-999M" },
              { value: 120, name: "1000M以上" },
            ],
          },
          {
            name: "实际",
            type: "funnel",
            left: "100",
            right: 200,
            maxSize: "100%",
            sort: "ascending",
            z: 3,
            label: {
              show: false,
              normal: {
                show: false,

                position: "inside",
                formatter: "{c}%",
                textStyle: {
                  color: "#777",
                },
              },
              emphasis: {
                show: false,
                position: "inside",
                formatter: "",
              },
            },
            itemStyle: {
              normal: {
                opacity: 0.4,
                borderColor: "#fff",
                borderWidth: 2,
              },
            },
            data: [
              { value: 0, name: "20M以下" },
              { value: 0, name: "20M-40M" },
              { value: 0, name: "50M-99M" },
              { value: 0, name: "100M-499M" },
              { value: 0, name: "500M-999M" },
              { value: 120, name: "1000M以上" },
            ],
          },
        ],
      };
      this.chart.setOption(option);
    },
  },
};
funnel3d(Highcharts);
pyramid3d(Highcharts);
</script>

<style lang="scss">
.highcharts-container {
  width: 100%;
  height: 2.225rem;
}
</style>
