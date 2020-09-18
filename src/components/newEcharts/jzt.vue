<template>
  <div class="canvas-warpper">
    <canvas id="canvas1" class="canvas"></canvas>
  </div>
</template>

<script>
import echartMixins from "@/utils/resizeMixins";
const echarts = require("echarts");
export default {
  name: "pyramid",
  data() {
    return {
      // propsData: [
      //   { value: 9.6, name: "其他" },
      //   { value: 11.8, name: "环境" },
      //   { value: 12.9, name: "工程" },
      //   { value: 15.3, name: "客服" },
      //   { value: 23.2, name: "安全" },
      //   { value: 29.5, name: "保洁" },
      // ],
      colors: [
        "#fb7294",
        "#ff9f7f",
        "#ffb157",
        "#ffdc5c",
        "#3bd1c0",
        "#28b4f3",
      ],
    };
  },
  props: {
    series: {
      type: Array,
      defaults() {
        return [];
      },
    },
  },
  mounted() {
    this.getEchart();
  },
  watch: {
    series: {
      handler(val, oldVal) {
        this.series = val;
        this.$nextTick(() => {
          this.getEchart();
        });
      },
      deep: true,
    },
  },
  methods: {
    getEchart() {
      console.log(this.series);
      let canvas1 = document.getElementById("canvas1");
      let context = canvas1.getContext("2d");

      let length = this.series.length; //数组长度
      let width = 300;
      let height = 200;
      let viewWidth = width * 0.7;
      let viewHeight = height * 0.9;

      let radian = ((2 * Math.PI) / 360) * 35; //对应角度的弧度为：角度 * (PI * 2 / 360)
      let arcH = viewWidth / 2 / Math.tan(radian); //获取角度的弧长
      canvas1.width = width;
      canvas1.height = height;
      let x = (width - viewWidth) / 2;
      let y = (height - viewHeight) / 2;
      let center_x = viewWidth / 2 + x;
      let center_y = arcH + y;
      let line_width = 10; //提示的直线的长度

      //		3D金字塔底部背景
      context.beginPath();

      context.moveTo(x, center_y);
      context.lineTo(center_x, viewHeight + y);
      context.lineTo(viewWidth + x, center_y);
      context.lineTo(center_x, y);
      context.lineTo(x, center_y);
      context.moveTo(center_x, viewHeight + y);
      context.lineTo(center_x, y);
      context.fillStyle = "#0289F2";
      context.fill();
      context.closePath();

      // 100份中每份斜边长（勾股定理求的）
      let itemHypotenuseH =
        Math.sqrt((viewWidth / 2) * (viewWidth / 2) + arcH * arcH) / length;
      // 100份中每份主轴长
      let itemAxisH = viewHeight / length;
      // 100份中每份直角边竖边长
      let itemH = arcH / length;
      // 100份中每份直角边横边长
      let itemW = Math.sqrt(itemHypotenuseH * itemHypotenuseH - itemH * itemH);

      for (let i = 0; i < this.series.length; i++) {
        let left_bottom_x = center_x - itemW * (i + 1);
        let left_top_x = center_x - itemW * i;
        let right_bottom_x = center_x + itemW * (i + 1);
        let right_top_x = center_x + itemW * i;
        let top_y = itemH * i + y;
        let bottom_y = itemH * (i + 1) + y;

        let right_x = center_x + itemW * (i + 1);
        let top_z = itemAxisH * i + y;
        let bottom_z = itemAxisH * (i + 1) + y;
        let color = this.colors[i % 6];

        context.beginPath();

        context.moveTo(left_bottom_x, bottom_y); //左侧底部第一个点
        if (i > 0) {
          context.lineTo(left_top_x, top_y);
        }
        context.lineTo(center_x, top_z);
        if (i > 0) {
          context.lineTo(right_top_x, top_y);
        }
        context.lineTo(right_bottom_x, bottom_y);
        context.lineTo(center_x, bottom_z);
        if (color) {
          context.fillStyle = color;
        } else {
          context.fillStyle = i % 2 == 0 ? "red" : "blue";
        }
        context.fill();
        context.closePath();

        let line_y = bottom_y - (bottom_y - top_y) / 2;
        let c = itemHypotenuseH / 2;
        let b = (bottom_y - top_y) / 2;
        let a = Math.sqrt(c * c - b * b);
        let line_x = itemW * (i + 1) - a;

        //画描述线 80以上
        context.beginPath();
        if (i % 2 == 1) {
          if (i == this.series.length - 1) {
            context.moveTo(center_x + line_x - 40, line_y + 30);
            context.lineTo(center_x + line_x + line_width - 30, line_y + 30);
          } else {
            context.moveTo(center_x + line_x, line_y);
            context.lineTo(center_x + line_x + line_width, line_y);
          }
        } else {
          if (i == this.series.length - 1) {
            context.moveTo(center_x - line_x + 40, line_y + 30);
            context.lineTo(center_x - line_x - line_width + 30, line_y + 30);
          } else {
            context.moveTo(center_x - line_x, line_y);
            context.lineTo(center_x - line_x - line_width, line_y);
          }
        }

        context.lineWidth = 1;
        if (color) {
          context.strokeStyle = color;
        } else {
          context.strokeStyle = "back";
        }
        context.stroke();
        context.closePath();

        let str = this.series[i].name + this.series[i].value + "%";
        context.beginPath();
        context.lineWidth = 1;
        context.font = "12px bold 黑体";

        if (i % 2 == 1) {
          if (i == this.series.length - 1) {
            context.fillText(
              str,
              center_x + line_x + line_width - 30,
              line_y + 35
            );
          } else {
            context.fillText(str, center_x + line_x + line_width, line_y + 5);
          }
        } else {
          if (i == this.series.length - 1) {
            context.fillText(
              str,
              center_x -
                line_x -
                line_width -
                context.measureText(str).width +
                30,
              line_y + 35
            );
            // context.font = "20px bold 黑体";
            // // 设置颜色
            // context.fillStyle = "#fff";
            // // 设置水平对齐方式
            // context.textAlign = "center";
            // // 设置垂直对齐方式
            // context.textBaseline = "middle";
            // // 绘制文字（参数：要写的字，x坐标，y坐标）
            // context.fillText("保洁", 30, 100);
          } else {
            context.fillText(
              str,
              center_x - line_x - line_width - context.measureText(str).width,
              line_y + 5
            );
          }
        }

        context.closePath();
      }

      //中线
      context.beginPath();
      context.moveTo(center_x, y);
      context.lineTo(center_x, viewHeight + y);
      context.lineWidth = 1;
      context.strokeStyle = "rgba(255,255,255,0.3)";
      context.stroke();
      context.closePath();
    },
  },
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.canvas-warpper {
  position: relative;
  // width: 800px;
  // height: 800px;
  .canvas {
    position: absolute;
    width: 3.6125rem;
    // height: 2.525rem;
    // width: 400px;
    // height: 300px;
    left: -0.15rem;
    top: -15px;
    /*border: 1px solid black;*/
  }
}
</style>
