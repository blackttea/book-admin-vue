<script lang="ts">
import {h, ref, renderSlot, reactive, markRaw} from 'vue'
import test1 from '../components/bkEditor.vue';
import ErrorPage from './404.vue';
import bkInput from '@/custom-component/bkInput.vue';
import {useRouter} from "vue-router";
import useEval from '@/hooks/useEval';
import Shape from '@/components/Editor/Shape.vue';
import {useStore} from "vuex";
//@ts-ignore
import {$, deepCopy} from '@/utils/utils.js';
//@ts-ignore
import generateID from "@/utils/generateID";
//@ts-ignore
import componentList from "@/custom-component/component-list";

interface dom {
  id: string,
  parent: string,
  component: any,
  attributes: any,
  style?: any,
  text?: any,
  hidden?: String,
  children?: Array<any>,
  dataList: Array<data>,
  isLock?: boolean
}

interface data {
  name: string,
  value: any
}

export default {
  components:{test1, bkInput, Shape},
  props: {
    cureComponent: {
      type: Object
    }
  },
  setup(props:any, context: any ){
    const router = useRouter();
    const dataCenter = reactive({
      ren: [],
      r: [],
    });
    // 初始化数据中心
    const initDataCenter = () => {
      for (const item of renders) {
        for (const _item of item.dataList) {
          !dataCenter.hasOwnProperty(_item.name) ? dataCenter[_item.name as keyof typeof dataCenter] = _item.value : ''
        }
      }
    }
    // 属性
    const getAttributes = (tree: any): object =>{
      const _attr = tree?.style ? { style: {...tree.style}, dataCenter } : { dataCenter };
      for (let item in _attr.style || {})
        if (item.indexOf('margin') > -1 || item.indexOf('padding') > -1){
          delete  _attr[item as keyof typeof _attr]
        }

      // store.state.curComponent.attributes[addLabel.value] = useEval(code.value).bind(null, router)
      const attr = tree?.attributes ? tree.attributes: {};
      Object.assign(_attr, attr)
      for(let key in attr) {
        if (dataCenter.hasOwnProperty(attr[key])) {
          Object.assign(_attr, {[key]: dataCenter[attr[key] as keyof typeof dataCenter] })
        } else if (key.indexOf('on') >= 0) {
          Object.assign(_attr, {[key]:  useEval(attr[key]).bind(null, dataCenter) })
        }
      }
      return _attr
    }
    // 判断数据类型。
    const isObject = (obj:any) => {
      return typeof obj === 'object' && obj != null;
    }
    const  deepClone = (source: any, hash = new WeakMap()) => {
      if (!isObject(source)) return source; // 判断是否为基础类型，是的话直接返回
      if (hash.has(source)) return hash.get(source); // 查哈希表，解决循环引用和引用丢失的问题。
      let target: any = Array.isArray(source) ? [] : {};
      hash.set(source, target); // 哈希表设值（缓存数据）
      // Reflect.ownKeys 获取对象自身属性名（包含symbol类型）数组
      Reflect.ownKeys(source).forEach(key => {
        if (isObject(source[key])) {
          target[key] = deepClone(source[key], hash);
        } else {
          target[key] = source[key];
        }
      });
      return target;
    }

    // 重新刷组件属性数据
    // const addInput = () => {
    //   dataCenter['_inputValue' as keyof typeof dataCenter] += '0';
    //   dataCenter['_dataSource' as keyof typeof dataCenter].pop();
    //   dataCenter['_tableShow' as keyof typeof dataCenter] = !dataCenter['_tableShow' as keyof typeof dataCenter]
    // }
    let renders: Array<dom> = (Array.isArray(props.cureComponent) ? deepClone(props.cureComponent) : [deepClone(props.cureComponent)])
    const store = useStore();
    initDataCenter()
    const renderTree = (arr: Array<dom>) => {
      let data = arr.filter(item => {
        item.children = arr.filter(e => {
          return item.id === e.parent
        })
        return !item.parent
      })
      return data
    }
    for(let item of renderTree(renders))
    {
      // @ts-ignore
      dataCenter.r.push(item)
    }
    const handleDrop = (e: any, com: any) => {
      const index = store.state.dragIndex
      if (index && com.component === 'div') {
        const component = deepCopy(componentList[index])
        component.style.top = e.layerY
        component.style.left = e.layerX
        component.id = generateID()
        store.commit('addInto', {com, component})
      }
    }
    const renderList = (tree: dom): any => {
      if (tree) {
        if (tree?.children && tree.children.length > 0) {
          const children: any= []
          for (let _dom of tree.children)
            children.push(renderList(_dom))
          return !dataCenter[tree.hidden as keyof typeof dataCenter] &&
            [h(Shape, {style: tree.style, defaultStyle: tree.style, class: { lock: tree.isLock },
              element: tree, active: tree.id === (store.state.curComponent || {}).id, onDrop: handleDrop.bind(null, event, tree)},
            {default: () => h(tree.component, getAttributes(tree),
            [dataCenter.hasOwnProperty(tree.text) ? dataCenter[tree.text as keyof typeof dataCenter] : tree.text, ...children])})]
        } else {
          return !dataCenter[tree.hidden as keyof typeof dataCenter] && [h(Shape,
            {style: tree.style, defaultStyle: tree.style, class: { lock: tree.isLock }, element: tree
              , active: tree.id === (store.state.curComponent || {}).id, onDrop: handleDrop.bind(null, event, tree)},
            {default: () => h(tree.component, getAttributes(tree),
            dataCenter.hasOwnProperty(tree.text) ? dataCenter[tree.text as keyof typeof dataCenter] : tree.text)})]
        }
      }
    }
    return () => [h("div",{style:{width: '100%', height: '100%', display: 'flex',flexWrap: 'wrap'}},{default: () => dataCenter.r.map((item: any) => {//循环渲染
        return renderList(item)
      })})]
  }
}
</script>
