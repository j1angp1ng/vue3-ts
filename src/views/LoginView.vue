<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <h3 class="loginTitle">后台管理系统</h3>
    <el-form-item label="账号：" prop="username">
      <el-input v-model="ruleForm.username" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码：" prop="password">
      <el-input
        v-model="ruleForm.password"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" 
      @click="submitForm(ruleFormRef)" 
      class="loginBtn"
        >Submit</el-button
      >
      <el-button @click="resetForm(ruleFormRef)"
      class="loginBtn"
      >Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs ,ref} from "vue";
import type { FormInstance, FormRules } from 'element-plus'
import {login} from '../request/api';
import {useRouter} from 'vue-router';
export default defineComponent({
  // name:'Login',
  setup() {
    const data = reactive({
      ruleForm: {
        username: "",
        password: "",
      },
    });
    const rules = reactive({
      username: [
        {
          required: true,
          message: "请输入账号",
          trigger: "blur",
        },
        {
          required: true,
          min:3,
          max:10,
          message: "账号的长度为3-10",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
        {
          required: true,
          min:3,
          max:10,
          message: "密码的长度为3-10",
          trigger: "blur",
        },
      ],
    });
    const ruleFormRef = ref<FormInstance>();
    const router=useRouter();

    // 登录
    function submitForm(ruleFormRef:FormInstance | undefined){
        // console.log(ruleFormRef);
        if(!ruleFormRef) return
        ruleFormRef.validate((valid)=>{
            if(valid){              
                // console.log('success');
                login(data.ruleForm).then((res)=>{
                    // console.log(res); 
                    // 保存token
                    localStorage.setItem('token',res.data.token);
                    // 跳转到首页
                    router.push('/');
                },(err)=>{
                    console.log(err);
                });
            }else{
                console.log('error');
                return false;
            }
        });
    }
    // 重置
    function resetForm(ruleFormRef:FormInstance | undefined){}

    return { ...toRefs(data),rules,submitForm,resetForm,ruleFormRef };
  },
});
</script>

<style scoped lang="scss">
.demo-ruleForm{
    width: 400px;
    height: 200px;
    margin:100px auto;
    .loginBtn{
        margin:0px auto;
    }
    .loginTitle{
        margin-left:180px;
        margin-bottom:10px;
    }
}
</style>