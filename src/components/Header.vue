<template>
  <el-header>
    <el-row>
      <el-col :span=2 :push=2>
        <el-avatar class="down" :src= 'url'></el-avatar>
      </el-col>
      <el-col :span=2 :push=1>
        <router-link @click= submit() :to= info>唐尼的博客</router-link>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
export default {
  data () {
    return {
      //  引入图片
      url: require("../assets/img.jpg"),
      info: ''
    }
  },
  methods: {
    submit () {
      this.$prompt('请输入指令', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.info = "/" + value
        }).catch(() => {
               
        });
    }
  }
}
</script>

<style>

 .down {
   margin-top: 10px;
 }
  a {
  color: #000;
  text-decoration:none;
}
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
</style>