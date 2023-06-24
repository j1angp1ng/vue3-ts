<template>
    <el-tree
    ref="treeRef"
    :data="authorityList"
    show-checkbox
    node-key="roleId"
    check-strictly
    :default-checked-keys="authority"
    :props="{
        children: 'roleList',
        label: 'name',
    }"
  />
  <el-button type="primary" @click="changeAuthority">确认修改</el-button>

</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRoute  } from 'vue-router';
import {initData} from '../type/authority';
import {getAuthorityList} from '../request/api';

export default defineComponent({
    setup () {
        // 获取params参数
        const route:any=useRoute();
        // console.log(route.HistoryState);
        
        const {id,authority}=route.params;
        const quanxian=authority.split(',')
        // console.log(quanxian);
        
        // 将传递过来的参数赋值
        const data=reactive(new initData(id,quanxian));
        
        // 获取总权限列表
        onMounted(()=>{
            getAuthorityList().then((res)=>{
                // console.log(res.data);
                data.authorityList=res.data             
            },(err)=>{
                console.log(err);
                
            });
        });

        // 修改权限
        const changeAuthority=()=>{
            console.log(data.treeRef.getCheckedKeys().sort((a:number,b:number)=>a-b));
            
        }

        return {...toRefs(data),changeAuthority}
    }
})
</script>

<style scoped>

</style>