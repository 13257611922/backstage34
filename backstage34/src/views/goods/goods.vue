<template>
  <div class="goods">
    <!-- 面包屑(传入参数) -->
    <mybread nav1="商品管理" nav2="商品列表"></mybread>
    <!-- roods内容 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "goods",

};
</script>

<style lang="less" scoped>
.goods {

}
</style>
