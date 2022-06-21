<script lang="ts">
import {h, ref, renderSlot, reactive, watch} from 'vue'
import test1 from '../components/bkEditor.vue';
import ErrorPage from './404.vue';

interface dom {
  id: string,
  parent: string,
  component: any,
  attributes: any,
  text?: any,
  hidden?: String,
  children?: Array<any>,
  dataList: Array<data>
}

interface data {
  name: string,
  value: any
}

export default {
  components:{test1},
  setup(context: any){
    const dataCenter = reactive<any>({
      ren: [],
      r: [],
    });
    const dataCenter1 = reactive({
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

    // 初始化数据中心
    const initDataCenter = () => {
      for (const item of renders) {
        for (const _item of item.dataList) {
          !dataCenter.hasOwnProperty(_item.name) ? dataCenter[_item.name as keyof typeof dataCenter] = _item.value : ''
        }
      }
    }

    const getAttributes = (attr: any): object =>{
      const _attr = {};
      Object.assign(_attr, attr)
      for(let key in attr) {
        if (dataCenter.hasOwnProperty(attr[key])) {
          Object.assign(_attr, {[key]: dataCenter[attr[key]]})
        }
      }
      return _attr
    }

    const twBind = () => {

    }
    // 重新刷组件属性数据
    const addInput = () => {
      dataCenter['_inputValue'] += '0';
      dataCenter['_dataSource'].pop();
      dataCenter['_tableShow'] = !dataCenter['_tableShow']
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
        attributes: {
          value: '_inputValue',
          onInput: ($event: any) => {dataCenter['_inputValue'] = $event.target.value}
        },
        text: '_inputValue',
        dataList: [{name: '_inputValue', value: dataCenter1.inputValue}]
      },
      {
        id: '9',
        parent: '',
        component: 'Select',
        attributes: {
          style: {width: '500px'},
          value: '_optionsValue',
          options: '_options',
          onChange: (value: any) => {dataCenter['_optionsValue'] = value}
        },
        dataList: [{name: '_options', value: dataCenter1.options}, {name: '_optionsValue', value: dataCenter1.optionsValue}]
      },
      {
        id: '10',
        parent: '',
        component: 'Button',
        attributes: {type: 'primary', onClick: addInput},
        text: '_inputValue',
        dataList: [{name: '_inputValue', value: dataCenter1.inputValue}]
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
        hidden: '_tableShow',
        attributes: {style: {width: '500px'}, dataSource: '_dataSource', columns: '_columns', bordered: true},
        text: '我是小幺7!',
        dataList: [{name: '_dataSource', value: dataCenter1.dataSource},
          {name: '_columns', value: dataCenter1.columns},
          {name: '_tableShow', value: true},
        ]
      },
      {
        id: '13',
        parent: '',
        component: ErrorPage,
        attributes: {style: {width: '500px'},
          dataSource: '_dataSource', columns: '_columns', bordered: true, onEditT: (val: any) => {dataCenter['title'] = val},
          title: 'test'
        },
        text: '我是小幺7!',
        dataList: [{name: '_dataSource', value: dataCenter1.dataSource},
          {name: '_columns', value: dataCenter1.columns},
          {name: '_tableShow', value: true},
        ]
      },
    ]

    initDataCenter()

    const result = import('ant-design-vue')
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
          return !dataCenter[tree.hidden as keyof typeof dataCenter] && h(dataCenter.module[tree.component] || tree.component, getAttributes(tree.attributes),
            [dataCenter.hasOwnProperty(tree.text) ? dataCenter[tree.text] : tree.text, ...children])
        } else {
          return !dataCenter[tree.hidden as keyof typeof dataCenter] && h(dataCenter.module[tree.component] || tree.component, getAttributes(tree.attributes),
            dataCenter.hasOwnProperty(tree.text) ? dataCenter[tree.text] : tree.text)
        }
      }
    }
    return () => [h("div",{},{default: () => dataCenter.r.map((item: any) => {//循环渲染
      return renderList(item)
    })})]
  }
}
</script>
