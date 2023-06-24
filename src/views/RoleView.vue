<template>
  <!-- 头部搜索 -->
  <el-button type="primary" @click="addRole">添加角色</el-button>
  <!-- 列表展示 -->
  <el-table :data="roleList" border stripe style="width: 100%">
    <el-table-column prop="roleId" label="ID" width="180" />
    <el-table-column prop="roleName" label="角色名称" width="180" />
    <el-table-column prop="authority" label="操作">
      <template #default="scope">
        <el-button
          size="small"
          type="primary"
          link
          @click="chageRole(scope.row)"
        >
          编辑权限
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { initData, roleListInt } from "../type/role";
import { getRoleList } from "@/request/api";
import { ElMessage, ElMessageBox } from "element-plus";
import "element-plus/theme-chalk/index.css";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const data = reactive(new initData());
    const router = useRouter();
    // 获取数据
    onMounted(() => {
      getRoleList().then((res) => {
        data.roleList = res.data;
      });
    });

    // 添加角色
    const addRole = () => {
      ElMessageBox.prompt("请输入角色名称", "添加角色", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          //value就是输入的值
          if (value) {
            data.roleList.push({
              roleId: data.roleList.length + 1,
              roleName: value,
              authority: [],
            });
          }
          ElMessage({
            type: "success",
            message: `${value}添加成功`,
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "操作取消",
          });
        });
    };

    // 修改权限
    function chageRole(row: roleListInt) {
      /* const params = {
        id: row.roleId,
        authority: row.authority,
      }; */
      router.push({
        name: "authority",
        params:{
          id:row.roleId,
          authority:row.authority.join(',')
        }
        // state:{params}
      });
    }
    return { addRole, ...toRefs(data), chageRole };
  },
});
</script>

<style scoped>
</style>