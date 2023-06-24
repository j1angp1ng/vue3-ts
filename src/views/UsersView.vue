<template>
  <div>
    <!-- 头部搜索 -->
    <el-form :inline="true" :model="selectData" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="selectData.nickName" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="selectData.role" class="m-2" placeholder="全部">
          <el-option label="全部" :value="0" />
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表展示 -->
    <el-table :data="userList" border stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="nickName" label="姓名" width="180" />
      <el-table-column prop="role" label="角色">
        <template #default="scope">
          <el-button
            v-for="item in scope.row.role"
            :key="item.roleId"
            size="small"
            link
          >
            {{ item.roleName }}

          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="编辑">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click.prevent="editUser(scope.row)"
          >
          编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 编辑对话框 -->
  <el-dialog v-model="isShow" title="编辑">
    <el-form :model="active">
      <el-form-item label="姓名" label-width="50px">
        <el-input v-model="active.nickName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色" label-width="50px">
        <el-select v-model="active.role"  multiple>
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer >
      <span class="dialog-footer">
        <el-button @click="updateUser">更新</el-button>
        <el-button type="primary" @click="isShow = false">
          取消
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
import { getUserList, getRoleList } from "../request/api";
import { initData ,userListInt} from "../type/user";

export default defineComponent({
  setup() {
    const data = reactive(new initData());

    onMounted(()=>{
        getUser();
    });
    
    async function getUser() {
      /* getUserList().then((res) => {
        data.userList = res.data;
      }); */
      const res=await getUserList();
      data.userList=res.data;
      // console.log(res);
      getRoleList().then((res) => {
        data.roleList = res.data;
      });
    }

    // 查询
    function onSubmit() {
      const { role, nickName } = data.selectData;
      let arr = data.userList;
    //   console.log(role);
      
      if (role!==0 || nickName) {
        
        if (role!==0) {
          arr = data.userList.filter((v) =>
            v.role.find((i)=>{
              return i.role===role;
            })
          );
                                    
        }
        if (nickName) {
          arr = data.userList.filter(
            (v) => v.nickName.indexOf(nickName) !== -1
          );
        }
      } else {
        arr = data.userList;
      }
      data.userList = arr;
    }

    // 监视输入关键字变化
    watch([() => data.selectData.role, () => data.selectData.nickName], () => {
      const { role, nickName } = data.selectData;
      if (role === 0 || nickName === "") {
        getUser();
      }
    });

    // 编辑
    function editUser(row:userListInt){
      console.log(row);
      data.isShow=true;
      data.active={
        nickName:row.nickName,
        userName:row.userName,
        id:row.id,
        role:row.role.map((i:any)=>i.role || i.roleId)
      }
    }

    // 更新
    function updateUser() {
      const {nickName,role}=data.active;
      let obj:any=data.userList.find((v)=>v.id===data.active.id);
      obj.nickName=nickName;
      obj.role=data.roleList.filter((i)=>role.indexOf(i.roleId)!==-1);
      console.log(obj);
      // 重新赋值
      // data.userList.forEach((item,i)=>{
      //   if(item.id===obj.id){
      //     data.userList[i]=obj;
      //   }
      // })
      data.isShow=false;
    }

    return { ...toRefs(data), onSubmit, updateUser,editUser };
  },
});
</script>

<style scoped>
</style>