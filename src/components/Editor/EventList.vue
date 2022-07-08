<template>
  <div class="event-list">
    <a-button @click="addEvent">添加</a-button>
  </div>
</template>

<script lang="ts">
import {mapState, useStore} from 'vuex';
import Modal from '@/components/Editor/Modal.vue';
// @ts-ignore
import {eventList} from '../../utils/events';

export default {
  components: {Modal},
  data() {
    return {
      isShowEvent: false,
      eventURL: '',
      eventActiveName: 'redirect',
      eventList,
    }
  },
  setup() {
    const store = useStore();
    console.log(store.state.curComponent);
    // const addEvent = (event: any, param: any) => {
    //   this.isShowEvent = false
    //   console.log(this.curComponent)
    //   this.$store.commit('addEvent', {curComponent(): any {
    //     }, param})
    // }
    // const removeEvent = (event: any) => {
    //   this.$store.commit('removeEvent', event)
    // }
  },
  computed: mapState([
    'curComponent',
  ])
}
</script>

<style lang="scss" scoped>
.event-list {
  .div-events {
    text-align: center;
    padding: 0 20px;

    .el-button {
      display: inline-block;
      margin-bottom: 10px;
    }

    .el-tag {
      display: block;
      width: 50%;
      margin: auto;
      margin-bottom: 10px;
    }
  }
}
</style>
