<template>
  <div class="box">
    <van-button plain type="primary">朴素按钮</van-button>
    <van-button plain type="info">朴素按钮</van-button>
    <h1>一句话</h1>
  </div>
</template>

<script>

export default {
  created () {
    console.log(this.$request) // 实例会按照原型链向上找，找到在原型对象中加的属性
    // 测试请求
    this.$request.get('/v1_0/channels').then(res => {
      console.log(res)
    })
  }
}
</script>

<style lang="scss">
$baseColor: red;
.box {
  width: 300px;
  height: 300px;
  h1{
    font-size: 50px;
    color: $baseColor;
  }
}
</style>
