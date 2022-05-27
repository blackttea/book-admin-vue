interface menu {
    icon: string;
    keepAlive: boolean;
    name: string;
    router: string;
    viewPath: string;
    id: number;
    parentId: number;
}

const loadView = (component: string | any) => {
    return () => require.ensure([], (require) => require(`@/views/${component}`))
}

const generateRoutes = (routes: Array<menu>) => {
    const formatRoutesArr: Array<any> = []
    routes.forEach(route => {
        const { viewPath, keepAlive, icon, name, router, parentId, id } = route;
        const routers = {
            meta: {icon, noCache: !keepAlive},
            name,
            component: loadView(viewPath),
            path: router,
            parentId,
            id,
            redirect: null
        }
        formatRoutesArr.push(routers)
    })
    // 将404页面添加到最后面
    return formatRoutesArr
}

export default generateRoutes;
