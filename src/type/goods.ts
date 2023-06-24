export interface listInt{
    userId:number,
    id:number,
    title:string,
    introduce:string
}
interface selectData{
    title:string,
    introduce:string,
    page:number,//页数
    count:number,//总条数
    pagesize:number//每页个数
}

export class initData{
    selectData:selectData={
        title:'',
        introduce:'',
        page:1,
        count:0,
        pagesize:5
    }
     list:listInt[]=[]
}