<template>
  <div>
    <div ref="mapInfo" id="info" class="mapInfo"></div>
    <div id="textInfo" class="textInfo"></div>
<!--    <div class="searchBox">-->
<!--      <el-form :model="formInfo" ref="searchForm" label-width="80px">-->
<!--        <el-form-item label="姓名">-->
<!--          <el-input v-model="formInfo.name" placeholder="姓名"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="电话">-->
<!--          <el-input v-model="formInfo.phone" placeholder="电话"></el-input>-->
<!--        </el-form-item>-->

<!--        <el-form-item label="登录时间"-->
<!--        ><el-date-picker-->
<!--          v-model="formInfo.beginTime"-->
<!--          type="daterange"-->
<!--          range-separator="至"-->
<!--          start-placeholder="开始时间"-->
<!--          end-placeholder="截止时间"-->
<!--        >-->
<!--        </el-date-picker>-->
<!--        </el-form-item>-->

<!--        <el-button type="primary" @click="doSearch">搜索</el-button>-->
<!--        <el-button @click="doReset">重置</el-button>-->
<!--      </el-form>-->
<!--    </div>-->
  </div>
</template>

<script>
import { getCurrentInstance } from "vue";
export default {
  data() {
    return {
      map: null,
      MultiMarker: null,
      geometriesList: [],
      setInterval: null, // 定时器
      formInfo: {
        name: "",
        phone: "",
      },
    };
  },
  setup() {
    const { proxy } = getCurrentInstance();
    console.log("proxy", proxy);
    return { proxy };
  },
  mounted() {
    this.initMap();
    clearInterval(this.setInterval); //停止之前的定时器
    this.getList();
    // this.setInterval = setInterval(this.getList, 1000);
  },
  unmounted() {
    clearInterval(this.setInterval); //停止之前的定时器
    clearInterval();
    this.setInterval = null;
  },
  methods: {
    doSearch() {
      console.log(this.formInfo);
      this.getList();
    },
    doReset() {
      console.log("重置");
      this.formInfo = {
        name: "",
        phone: "",
        beginTime: "",
      };
    },
    initMap() {
      console.log("初始化地图");
      console.log(window);
      const that = this;
      let info = document.getElementById("info");
      // var info = this.$refs.mapInfo;
      let center = new window.TMap.LatLng(39.916527,116.397128); // 这里写自己的地图中心经纬度
      //初始化地图
      this.map = new window.TMap.Map(info, {
        zoom: 12, //设置地图缩放级别
        center: center, //设置地图中心点坐标
        baseMap: {
          type: "vector",
          // features: ["base", "building3d"], // 隐藏矢量文字
        },
      });
      this.makeMapInfo();
    },
    makeMapInfo() {
      let tencentmap = this.map;
      const that = this;
      let info = document.getElementById("info");
      let textInfo = document.getElementById("textInfo");
      //初始化散点图并添加至map图层
      this.MultiMarker = new window.TMap.MultiMarker({
        map: tencentmap, // 显示Marker图层的底图
        styles: {
          small: new window.TMap.MarkerStyle({
            // 点标注的相关样式
            width: 34, // 宽度
            height: 46, // 高度
            anchor: {
              x: 17,
              y: 23,
            }, // 标注点图片的锚点位置
            src: "https://mapapi.qq.com/web/lbs/visualizationApi/demo/img/small.png", // 标注点图片url或base64地址
            color: "#333", // 标注点文本颜色
            size: 16, // 标注点文本文字大小
            direction: "bottom", // 标注点文本文字相对于标注点图片的方位
            offset: {
              x: 0,
              y: 8,
            }, // 标注点文本文字基于direction方位的偏移属性
            strokeColor: "#fff", // 标注点文本描边颜色
            strokeWidth: 2, // 标注点文本描边宽度
          }),
          big: new window.TMap.MarkerStyle({
            width: 58,
            height: 76,
            anchor: {
              x: 36,
              y: 32,
            },
            src: "https://mapapi.qq.com/web/lbs/visualizationApi/demo/img/big.png",
            color: "#333",
            size: 24,
            direction: "bottom",
            strokeColor: "#f3f3f3",
            offset: {
              x: 0,
              y: 10,
            },
            strokeWidth: 2,
          }),
        },
        geometries: [],
      });
    },
    // 获取列表
    getList() {
      const that = this;
      let params = this.formInfo;
      this.MultiMarker.setMap(null); // 清空下之前的
      that.geometriesList = [];

    },
  },
};
</script>

<style lang="scss">
.mapInfo {
  width: 80%;
  height: 80%;
}
.textInfo{

  padding: 10px;
  z-index: 1000;
  position: absolute;
  left: 0;
  top: 0;
  text-align: left;
  background: #fff;
}
.searchBox {
  position: absolute;
  left: 50%;
  top: 0;
  background: #fff;
  padding: 10px;
  z-index: 1000;
  width: 500px;
}
</style>
