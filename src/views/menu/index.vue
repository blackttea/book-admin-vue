<template>
  <div class="container">
    <div class="headers">
      <div class="portrait"><breadcrumb :breadcrumb-list="breadcrumb"></breadcrumb></div>
    </div>
    <div class="left-menu" :style="{ width: menuWidth, height: '100%' }">
      <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        :style="{ width: menuWidth, height: '100%' }"
        :mode="mode"
        :theme="theme"
        @select="selectedMenu"
      >
        <template v-for="menu in menuTree" :key="menu.id">
          <sub-menu
            :menu="menu"
            :theme="theme"
          />
        </template>
      </a-menu>
    </div>
    <div class="main" :style="{ height: '100%', width: `calc(100% - ${menuWidth})`}">
      <div class="active-menu">
        <div class="active-item" v-for="item in activeList"
             :style="{backgroundColor: activeMenu === item ? '#409eff' : '#fff',
             color: activeMenu === item ? '#fff' : '#000'}"
             :key="item" @click="clickMenu(item)">
          {{ item.name }} <close-outlined class="tab-close" @click="removeMenu(item)"/>
        </div>
        <div style="margin-left: auto">
          <a-popover placement="bottomRight">
            <template #content>
              <div class="close">关闭所有</div>
              <div class="close">关闭左侧</div>
              <div class="close">关闭右侧</div>
              <div class="close">关闭其它</div>
            </template>
            <setting-outlined style="font-size: 16px" />
          </a-popover>
        </div>
      </div>
      <pad>
        <div style="height: calc(100% - 85px)">
          <bk-md-editor />
        </div>
      </pad>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue';
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  CloseOutlined,
} from '@ant-design/icons-vue';
import type { MenuMode, MenuTheme } from 'ant-design-vue';
import pad from '../../components/pad/index.vue';
import subMenu from './subMenu.vue';
import breadcrumb from './breadcrumb.vue';
import { menu, md } from "@/views/menu/menu";
import bkMdEditor from "@/components/bkMdEditor.vue";

export default defineComponent({
  components: {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
    pad,
    CloseOutlined,
    subMenu,
    breadcrumb,
    bkMdEditor
  },
  setup() {
    const color: Array<string> = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#8B00FF'];
    const state = reactive<md>({
      mode: 'inline' as MenuMode,
      theme: 'dark' as MenuTheme,
      selectedKeys: ['1'],
      openKeys: ['sub1'],
      activeMenu: {name: 'init', id: 0}
    });
    const changeMode = (checked: boolean) => {
      state.mode = checked ? 'vertical' : 'horizontal';
    };
    const changeTheme = (checked: boolean) => {
      state.theme = checked ? 'dark' : 'light';
    };
    const code = ref('');
    const menuList: Array<menu> = [
      {
        id: 1,
        name: '菜单1',
      },
      {
        id: 2,
        name: '菜单1-1',
      },
      {
        id: 3,
        name: '菜单1-2',
        path: 'test'
      },
      {
        id: 4,
        name: '菜单1-3',
        path: 'test',
      },
      {
        id: 9,
        name: '菜单1-1-2',
      },
      {
        id: 10,
        name: '菜单1-1-1-1',
        path: 'test'
      },
      {
        id: 6,
        name: '菜单2-1',
        path: 'test'
      },
      {
        id: 7,
        name: '菜单2-2',
        path: 'test'
      },
      {
        id: 8,
        name: '菜单2-3',
        path: 'test'
      },
    ];
    const menuTree = reactive([{
      id: 1,
      name: '菜单1',
      children: [
        {
          id: 2,
          name: '菜单1-1',
          children:[{
            id: 9,
            name: '菜单1-1-2',
            children:[{
                id: 10,
                name: '菜单1-1-1-1',
                path: 'test'
            }],
          }]
        },
        {
          id: 3,
          name: '菜单1-2',
          path: 'test'
        },
        {
          id: 4,
          name: '菜单1-3',
          path: 'test',
        },
      ]
    },
    {
      id: 5,
      name: '菜单2',
      children: [
        {
          id: 6,
          name: '菜单2-1',
          path: 'test'
        },
        {
          id: 7,
          name: '菜单2-2',
          path: 'test'
        },
        {
          id: 8,
          name: '菜单2-3',
          path: 'test'
        },
      ]
    }])

    const breadcrumb = reactive<menu[]>([]);
    const menuWidth = ref('206px');
    const activeList = reactive<menu[]>([]);
    const clickMenu = (item: menu) => {
      const index = activeList.indexOf(item);
      if (index > -1)
        state.activeMenu = item;
    }

    const getKey = (tree: Array<menu>, id: number) => {
      for (let item of tree) {
        if (item.children && item.children.length > 0) getKey(item.children, id);
        else {
          if (item.id === id) {
            if (activeList.indexOf(item) < 0 && activeList.length <= 12) {
              activeList.push(item);
              state.activeMenu = item;
            } else if (activeList.indexOf(item) >= -1 ) {
              state.activeMenu = item;
            }
          }
        }
      }
    }
    const selectedMenu = (data: any) => {
      let key = data?.keyPath[data?.keyPath.length - 1];
      getKey(menuTree, parseInt(key));
      breadcrumb.length = 0;
      let tem = '';
      for (let item of data?.keyPath || []) {
        const loc = menuList.findIndex((m) => { return item == m.id })
        breadcrumb.push(menuList[loc])
      }
    }

    const removeMenu = (item: menu) => {
      const index = activeList.indexOf(item);
      if (index >= 0 && activeList.length > 1) {
        activeList.splice(index, 1);
        if (item == state.activeMenu) state.activeMenu = activeList[index - 1]
      }
    }
    return {
      menuWidth,
      activeList,
      breadcrumb,
      menuTree,
      code,
      ...toRefs(state),
      removeMenu,
      changeMode,
      changeTheme,
      clickMenu,
      selectedMenu
    };
  },
});
</script>

<style lang="less">
.container{
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .headers{
    width: 100%;
    height: 50px;
    background-color: #f2f2f2;
    border: 1px solid #eee;
  }
  .main{
    background-color: #f2f2f2;
    .active-menu{
      width: 100%;
      height: 35px;
      padding-right: 12px;
      background-color: #fff;
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
      .active-item{
        height: ~"calc(100% - 4px)";
        padding-right: 10px;
        padding-left: 10px;
        margin-left: 8px;
        font-size: 14px;
        cursor: pointer;
        border: 1px solid #d9d9d9;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          .tab-close{
            margin-left: 5px;
            color: inherit;
          }
        }
        .tab-close{
          margin-left: 5px;
          color: rgba(1, 1, 1, 0);
        }
      }
    }
  }

  .left-menu{
    background-color: #001529;
    height: 100%;
  }
}
.close{
  padding: 3px 10px 3px 10px;
  &:hover {
    background-color: #ecf5ff;
    color: #409eff;
  }
}
</style>