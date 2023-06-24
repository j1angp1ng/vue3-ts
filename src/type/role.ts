export interface roleListInt{
    roleId:number,
    roleName:string,
    authority:number[]
}

export class initData{
    roleList:roleListInt[]=[] //接收角色列表
}