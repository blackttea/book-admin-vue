<template>
  <div class="login-container">
    <canvas id='myCanvas' ref="canvas"></canvas>
    <div class="wrapper" :style="{marginTop: -winH + 'px'}">
      <div class="text-y" data-text="2020"></div>
      <div class="text-m" data-text="5-20"></div>
    </div>
    <div id="form_box" :style="{marginTop: -winH + 200  + 'px'}">
      <a-form ref="form" :model="form" class="login-form" :label-col="{style: {width: '60px'}}">
        <h2 class="login-title">登录</h2>
        <a-form-item label="用户名">
          <a-input v-model="form.username"></a-input>
        </a-form-item>
        <a-form-item label="密&#12288码">
          <a-input type="password" v-model="form.password"></a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="onSubmit" class="login-button">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div :style="{marginTop: -winH + 100 + 'px', width: '100%', height:'900px', overflow: 'auto'}">
      <test :level="1"></test>
    </div>
  </div>
</template>
<script lang="ts">
import {onMounted, Ref, ref} from "vue";
import test from '../test.vue';
import register from "../login/register.vue";
// @ts-ignore
import snow1 from '@/assets/images/snow1.png';
// @ts-ignore
import snow2 from '@/assets/images/snow2.png';
// @ts-ignore
import snow3 from '@/assets/images/snow3.png';
// @ts-ignore
import snow4 from '@/assets/images/snow4.png';
import bkEditor from "@/components/bkEditor.vue";
let canvas;
let context: any;
let winW;
let winH;
let last_snow_created_time: Date;
let snows: Array<any> = [];
let tree1;

export default {
  components: {
    register,
    test,
    bkEditor
  },
  data() {
    return{
      form:{
        username:"",
        password:""
      }
    }
  },
  setup() {
    // @ts-ignore
    const canvas: Ref<HTMLCanvasElement> = ref(null);
    const winH = window.innerHeight;
    const winW = window.innerWidth;
    onMounted(() => {
      last_snow_created_time = new Date();
      initCanvas()
      window.onresize = () => {
        initCanvas()
      }
    })
    const initCanvas = () => {
      context = canvas.value.getContext("2d");
      canvas.value.width = winW;
      canvas.value.height = winH;

      setInterval(() => {
        drawFrame();
      }, 100);
    }
    const drawFrame = () =>  {
      setInterval(() => {
        const index = Math.floor(4 * Math.random());
        const img = new Image();
        const snow = [snow1, snow2, snow3, snow4];
        img.src = snow[index];
        img.onload = () => {
          createSnow(img)
        }
      }, 500);
      context.clearRect(0,0, winW, winH);
      //  context.drawImage(tree1,0,winH-200,200,200)
      snows.forEach(function(snow, index) {
        snow.y += snow.radius / 3;
        if (snow.y > winH) {
          snows.splice(index,1)
        } else {
          snow.draw(snow)
        }
      })
    }
    const createSnow = (img: any) => {
      let now = new Date()
      // @ts-ignore
      if (now - last_snow_created_time > snows.length - now.getMinutes() && snows.length < 1500) {
        const radius = Math.random() * 5 + 2;
        let snow = {x: 0, y: 0, radius: radius, color: "",draw: draw,img: img}
        snow.x =  Math.random() * winW + 1;
        snow.color = '#ffffff';
        snows.push(snow);
        last_snow_created_time = now;
      }
    }
    const draw = (snow: any) => {
      context.save();
      context.translate(snow.x, snow.y);
      context.lineWidth = snow.lineWidth;
      context.fillStyle = '#fff'
      context.beginPath();
      context.drawImage(snow.img,0,0,13,13)
      context.stroke();
      context.closePath();
      context.fill();
      context.restore(); // 这个是动态
    }
    const editorValue  = ref('')
    const onSubmit = () => {
      console.log(editorValue.value)
    }
    return {
      initCanvas,
      onSubmit,
      winH,
      editorValue,
      canvas
    }
  },
}
</script>
<style lang="less" scoped>

.login-container {
  background: url("../../assets/images/snow.png") no-repeat center;
  background-size: cover;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  #form_box {
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: flex-end;
    margin: 50px 60px 0 0;
    .login-form{
      width: 500px;
      background-color: rgba(255, 255, 255, 0.1);
      padding: 30px;
      border-radius: 20px;
      .login-title {
        color: #303133;
        text-align: center;
      }
      .login-button {
        float: right;
        margin-left: 10px;
      }
      .login-register {
        background-color: gray;
      }
    }
  }
  .wrapper{
    background: radial-gradient(#e8001c,#f22e45);
    background: transparent;
    border-radius: 5px;
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    .text{
      font-size: 12rem;
      font-weight: 800;
      color: #00000000;
      font-family: 'Lato', sans-serif;
      background: url("../../assets/images/source.gif");
      -webkit-background-clip: text;
      &:after{
        content: attr(data-text);
        -webkit-text-stroke: 1.5px #d4d7ff;
        background: url("../../assets/images/source.gif");
        -webkit-background-clip: text;
        background-size: 33%;
      }
    }
    .text-y{
      .text();
    }
    .text-m{
      .text();
      font-size: 5rem;
      margin: 80px 0 0 30px;
    }
  }
}
</style>>
