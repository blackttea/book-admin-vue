<template>
<div>
  <h1>{{fTitle}}</h1>
  <button @click="editTitle">add</button>
</div>
</template>

<script>
import {ref} from "vue";
import {useFormatDate} from "@/hooks/useFormatDate";

export default {
  name: "404.vue",
  props: ['title'],
  emits: ['edit-t'],
  setup(props, context) {
    const fTitle = ref(props.title);
    const editTitle = () => {
      fTitle.value += '5555';
      context.emit('edit-t', fTitle.value)
    }
    const data = []
    for (let i = 0; i < 50; i++) {
      const tem = []
      const time=new Date();
      tem.push(formatTimeMills(new Date(time.getFullYear(), time.getMonth(), time.getDate() - 10, time.getHours() + i, time.getMinutes() + Math.floor(Math.random()* 10), time.getSeconds() + Math.floor(Math.random()* 20))))
      tem.push(Math.floor(Math.random()* 5)+1)
      tem.push(Math.floor(Math.random()* 3)+1)
      tem.push(Math.floor(Math.random()* 5)+1)
      tem.push(Math.floor(Math.random()* 3)+1)
      tem.push(Math.floor(Math.random()* 6)+1)
      tem.push((Math.random()* 10 +90 ).toFixed(2) + '%')
      tem.push((Math.random()* 200 +200).toFixed(2) + 'ms')
      tem.push(Math.floor(Math.random()* 2))
      tem.push((Math.random()* 5).toFixed(2) + '%')
      tem.push(Math.floor(Math.random()* 5)+1)
      tem.push((Math.random()* 3 +97).toFixed(2) + '%')
      tem.push((Math.random()* 100 +300).toFixed(2) + 'ms')
      tem.push((Math.random()* 300+100).toFixed(2) + 'ms')
      tem.push((Math.random()* 200+100).toFixed(2) + 'ms')
      data.push(tem)
    }
    console.log(data)
    function formatTimeMills(timeMills){
      var date = new Date(timeMills);
      var timeStr = date.getFullYear() + "-";
      if (date.getMonth() < 9)
      { // 月份从0开始的
        timeStr += '0';
      }
      timeStr += date.getMonth() + 1 + "-";
      timeStr += date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
      timeStr += ' ';
      timeStr += date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours();
      timeStr += ':';
      timeStr += date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes();
      timeStr += ':';
      timeStr += date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds();
      return timeStr;
    }
    return {
      fTitle,
      editTitle
    }
  }
}
</script>

<style scoped>

</style>