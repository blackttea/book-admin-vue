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
    return (resolve: any) => require([`@/views/${component}`], resolve)
}

const generateRoutes = (routes: Array<menu>) => {
    // @ts-ignore
    const formatRoutesArr = []
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
    // @ts-ignore
    return formatRoutesArr
}

export default generateRoutes;
