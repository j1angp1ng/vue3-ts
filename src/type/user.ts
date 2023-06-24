export interface userListInt {
    id:number
    nickName:string
    role:roleInt[]
    userName:string
}
interface roleInt{
    role:number,
    roleName:string
}
interface selectDataInt{
    nickName:string,
    role:number
}
interface roleListInt{
    authority:number[],
    roleId:number,
    roleName:string
}
interface activeInt{
    id:number
    nickName:string
    role:number[]
    userName:string
}
export class initData{
    selectData:selectDataInt={
        nickName:'',
        role:0
    }
    userList:userListInt[]=[] //接收用户列表
    roleList:roleListInt[]=[] //接收角色列表
    isShow=false
    active:activeInt={
        id:0,
        nickName:'',
        role:[],
        userName:''
    } //接收编辑对象
}