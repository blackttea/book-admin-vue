<script lang="ts">
import {h, ref, renderSlot, reactive, watch} from 'vue'
import test1 from './tesst1.vue';

interface listData {
  id:number,
  text:string
}
interface dom {
  id: string,
  parent: string,
  component: any,
  attributes: object,
  text?: any,
  children?: Array<any>,
}
export default {
  components:{test1},
  setup(context: any){
    const dataCenter = reactive({
      module: {},
      dataSource: [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },{
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },{
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
      ],
      columns:[
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '住址',
          dataIndex: 'address',
          key: 'address',
        }],
      ren: [],
      r: [],
      inputValue: ref('666'),
      options: [
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'disabled',
          label: 'Disabled',
        },
        {
          value: 'yiminghe',
          label: 'Yiminghe',
        },
      ],
      optionsValue: 'jack'
    });

    const addInput = () => {

    }
    let renders: Array<dom> = [
      // {
      //   id: '7',
      //   parent: '',
      //   component: 'div',
      //   attributes: {},
      //   text: inputValue
      // },
      // {
      //   id: '8',
      //   parent: '7',
      //   component: 'Button',
      //   attributes: {type: 'primary', onClick: addInput, on: {click: addInput}},
      //   text: inputValue
      // },
      {
        id: '9',
        parent: '',
        component: 'input',
        attributes: {type: 'primary',
          value: 'inputValue',
          onInput: ($event: any) => {dataCenter.inputValue = $event.target.value}
        },
        text: 'inputValue'
      },
      {
        id: '9',
        parent: '',
        component: 'Select',
        attributes: {
          style: {width: '500px'},
          value: 'optionsValue',
          options: dataCenter['options'],
          onChange: (value: any) => {dataCenter['optionsValue'] = value}
        },
        text: 'inputValue'
      },
      {
        id: '10',
        parent: '',
        component: 'button',
        attributes: {type: 'primary', onClick: addInput},
        text: '筛选'
      },

      // {
      //   id: '11',
      //   parent: '',
      //   component: test1,
      //   attributes: {style: {}},
      //   text: inputValue.value
      // },
      {
        id: '12',
        parent: '',
        component: 'Table',
        attributes: {style: {width: '500px'}, dataSource:dataCenter.dataSource, columns: dataCenter.columns, bordered: true},
        text: '我是小幺7!'
      },
    ]

    const result = import('ant-design-vue')
    watch(() => dataCenter.inputValue, (nVal, oVal) => {
      console.log(oVal)
    })
    result.then((res) => {
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
      dataCenter.module = res
    })
    const renderList = (tree: dom): any => {
      if (tree) {
        if (tree?.children && tree.children.length > 0) {
          const children = []
          for (let _dom of tree.children)
            children.push(renderList(_dom))
          // @ts-ignore
          return h(dataCenter.module[tree.component] || tree.component, {...tree.attributes,...{value: tree.attributes.value ? dataCenter[tree.attributes.value] : ''}}, [dataCenter[tree.text] || tree.text, ...children])
        } else {
          // @ts-ignore
          return h(dataCenter.module[tree.component] || tree.component, {...tree.attributes,...{value: tree.attributes.value ? dataCenter[tree.attributes.value] : ''}}, dataCenter[tree.text] || tree.text)

        }
      }
    }
    return () => [h("div",{},{default: () => dataCenter.r.map((item: any) => {//循环渲染
      return renderList(item)
    })})]
  }
}
</script>
