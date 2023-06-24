<template>
  <!-- 头部 -->
  <div class="goodsHeader">
    <el-form :inline="true" :model="selectData" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="selectData.title" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item label="详情">
        <el-input v-model="selectData.introduce" placeholder="请输入详细信息" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- 主体 -->
  <div class="goodsBody">
    <el-table :data="changeList" border stripe style="width: 100%">
      <el-table-column prop="id" label="编号" width="180" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="introduce" label="详情" />
    </el-table>
  </div>
  <!-- 分页 -->
  <el-pagination
    layout="prev, pager, next"
    :total="list.length * 2"
    background
    @size-change="sizeChange"
    @current-change="currentChange"
  />
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  watch,
} from "vue";
import { getGoodsList } from "../request/api";
import { initData } from "../type/goods";
export default defineComponent({
  setup() {
    const goodsList = reactive(new initData());

    // 根据不同页码展示不同数据
    const changeList = computed(() => {
      const sle = goodsList.selectData;
      return goodsList.list.slice(
        (sle.page - 1) * sle.pagesize,
        sle.page * sle.pagesize
      );
    });
    // 获取数据
    onMounted(() => {
        getGoods();
    });
    function getGoods() {
      getGoodsList().then((res) => {
        goodsList.list = res.data;
        goodsList.selectData.count = res.data.length;
      });
    }

    // 页面大小变化时调用
    const sizeChange = (pagesize: number) => {
      goodsList.selectData.page = pagesize;
    };
    // 当前页数发生变化时调用
    const currentChange = (page: number) => {
      goodsList.selectData.page = page;
    };

    // 查询
    function onSubmit() {
      const { title, introduce } = goodsList.selectData;
      let arr = goodsList.list;
      // console.log(title,introduce);
      if (title || introduce) {
        if (title) {
          arr = goodsList.list.filter((v) => v.title.indexOf(title) !== -1);
        }
        if (introduce) {
          arr = goodsList.list.filter(
            (v) => v.introduce.indexOf(introduce) !== -1
          );
        }
      } else {
        arr = goodsList.list;
      }
      // 改变原来数据，重新渲染页面
      goodsList.list = arr;
      goodsList.selectData.count = arr.length;
    }

    // 监视搜索框数据
    watch(
      [() => goodsList.selectData.title, () => goodsList.selectData.introduce],
      () => {
        if (
          goodsList.selectData.title === "" &&
          goodsList.selectData.introduce === ""
        ) {
          getGoods();
        }
      }
    );

    return {
      ...toRefs(goodsList),
      onSubmit,
      sizeChange,
      currentChange,
      changeList,
    };
  },
});
</script>

<style scoped>
</style>