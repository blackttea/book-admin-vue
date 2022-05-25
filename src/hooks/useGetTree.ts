interface tree {
    parentId: number;
    children?: Array<object>;
    id: number,
    redirect: string;
    path: string;
}

const useGetTree  = (arr: Array<tree>) => {
    let data = arr.filter(item => {
        item.children = arr.filter(e => {
            return item.id === e.parentId
        })
        return !item.parentId
    })
    return data
}
export default useGetTree;