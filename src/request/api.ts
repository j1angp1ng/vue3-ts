import server from './serve'
interface loginData{
    username:string,
    password:string
}
// 登录接口
export function login(data:loginData){
    return server({
        url:'/login',
        method:'post',
        data
    })
}

// 商品接口
export function getGoodsList(){
    return server({
        method:'get',
        url:'/getGoodsList'
    });
}

// 用户接口
export function getUserList(){
    return server({
        method:'get',
        url:'/getUserList'
    });
}

// 角色接口
export function getRoleList(){
    return server({
        method:'get',
        url:'/getRoleList'
    });
}

// 权限列表接口
export function getAuthorityList(){
    return server({
        method:'get',
        url:'/getAuthorityList'
    });
}