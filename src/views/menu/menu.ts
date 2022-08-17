import {MenuMode, MenuTheme} from "ant-design-vue";

interface menu {
  name: string,
  id: number,
  path?: string,
  children?: Array<menu>
}

interface md {
  mode: MenuMode,
  theme: MenuTheme,
  selectedKeys: Array<string>,
  openKeys: Array<string>,
  activeMenu: menu
}

export {
  menu,
  md
}