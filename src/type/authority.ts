
interface roleListInt {
    name: string,
    roleId: number
}
interface authorityInt {
    name: string,
    roleId: number,
    viewRole?: string,
    roleList?: roleListInt
}

export class initData {
    id: number
    authority: number[]
    constructor(id: number, authority: number[]) {
        this.id = id,
            this.authority = authority
    }

    authorityList: authorityInt[] = [] //接收权限列表
    treeRef:any
}