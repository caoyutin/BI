<template>
  <div class="wrapper">
    <ul class="item2">
      <li>
        服务省份
        <span>{{Provinces}}</span>
        <!-- <dv-digital-flop :config="config1" style="width:200px;height:50px;">37</dv-digital-flop> -->
      </li>
      <li>
        服务城市
        <span>{{city}}</span>
      </li>
      <li>
        服务项目
        <span>{{Projects}}</span>
      </li>
      <li>
        自建项目
        <span>{{selfProjects}}</span>
      </li>
    </ul>
    <ul class="item3">
      <li>
        服务面积（m2）
        <span>
          {{Acreage}}
          <span class="nomalsma">万</span>
        </span>
      </li>
      <li>
        服务总户数
        <span>{{sum}}</span>
      </li>
      <li>
        待交付项目数
        <span>{{Delivered}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { Servicedata } from "@/api/api.js";
export default {
  components: {},
  props: {},
  data() {
    return {
      Provinces: "",
      city: "",
      Projects: "",
      selfProjects: "",
      Acreage: "",
      sum: "",
      Delivered: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    getData() {
      Servicedata().then((res) => {
        this.Provinces = res.data.province;
        this.city = res.data.city;
        this.Projects = res.data.project;
        this.selfProjects = res.data.self_built;
        this.Acreage = res.data.serviceArea;
        this.sum = res.data.totalHouses;
        this.Delivered = res.data.toBeDelivered;
      });
    },
  },
  created() {},
  mounted() {
    this.getData();
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/componentsSty.css";
.wrapper {
  width: 3.875rem !important;
  .nomalsma {
    display: inline-block;
    // font-size: 0.25rem;
    // font-family: "Normal" !important;
  }
}
</style>