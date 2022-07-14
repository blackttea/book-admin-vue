<template>
  <div class="event-list">
    <a-form layout="vertical">
      <a-form-item v-for="item in attrList" :label="item.name">
        <a-input v-model:value="curComponent.attributes[item.name]"  placeholder="名称"
          :readonly="item.name.indexOf('on') >= 0 ? true : false" @click="item.name.indexOf('on') >= 0 ? editEvent(item.name, item.value) : ''"/>
      </a-form-item>
    </a-form>
    <a-button type="primary" @click="attrShow = true">添加属性</a-button>
  </div>
  <a-modal v-model:visible="attrShow" title="元素属性" @ok="addAttr" width="800px" ok-text="确认" cancel-text="取消">
    <div class="attr-label">属性名:</div>
    <a-input v-model:value="addLabel" placeholder="名称" />
    <div class="attr-label">代码:</div>
    <a-textarea v-model:value="code" placeholder="输入代码" :rows="4" />
  </a-modal>
</template>

<script>
import {mapState, useStore} from 'vuex';
import Modal from '@/components/Editor/Modal.vue';
// @ts-ignore
import {eventList} from '../../utils/events';
import {reactive, ref, watch} from 'vue';
import bkEditor from "@/components/bkEditor.vue";
import {useRouter} from "vue-router";

export default {
  components: { Modal, bkEditor },
  data() {
    return {
      isShowEvent: false,
      eventURL: '',
      eventActiveName: 'redirect',
      eventList,
    }
  },
  setup() {
    const attrShow = ref(false);
    const store = useStore();
    const addLabel = ref('onClick');
    const addValue =ref('');
    const code = ref("(router) => { router.push('/404') }");
    console.log(store.state.curComponent);
    const router = useRouter()
    const eventList = [ 'onClick', 'onChange', 'onInput', 'onFocus', 'onMousedown'];
    const attrList = reactive([])
    const useEval = ( fn ) => {
      const Fn = Function;
      return new Fn('return ' + fn)();
    }

    const attr = () => {
      const  sa = store.state.curComponent?.attributes || [];
      attrList.length = 0;
      for (let item in sa ) attrList.push({ name:item, value:sa[item] })
    }
    attr()
    watch(() => store.state.curComponent, () =>{
      attr()
    }, { deep: true })
    const addAttr = () => {
      store.state.curComponent.attributes[addLabel.value] = code.value;
      attrShow.value = false;
    }
    // const addEvent = (event: any, param: any) => {
    //   this.isShowEvent = false
    //   console.log(this.curComponent)
    //   this.$store.commit('addEvent', {curComponent(): any {
    //     }, param})
    // }
    // const removeEvent = (event: any) => {
    //   this.$store.commit('removeEvent', event)
    // }
    const editEvent = (name, value) => {
      attrShow.value = true;
      addLabel.value = name;
      code.value = value;
    }
    const addEvent = (event) => {
      store.state.curComponent.attributes[event] = () => {
        alert('h')
      }
    }
    return {
      eventList,
      attrShow,
      code,
      addLabel,
      attrList,
      addEvent,
      addAttr,
      editEvent
    }
  },
  computed: mapState([
    'curComponent',
  ])
}
</script>

<style lang="scss" scoped>
.event-list {
  width: 100%;
  height: 100%;
  .event-item {
    width: 100%;
    background-color: #ffffff;
    box-shadow: 0px 8px 16px rgba(143, 149, 178, 0.15)
  }
}

.attr-label{
  padding: 20px 20px 20px 0;
}
</style>
