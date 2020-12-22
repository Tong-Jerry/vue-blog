<template>
    <el-row>
      <div class="demo-image">
        <el-image
        style="width: 600px; height: 600px"
        :src= 'url'
        >
        </el-image>
      </div>
    <h1>{{ msg }}</h1>
    <p>
      一个出生于山西运城的boy
    </p>
    <p>
      这里记录了唐尼的工作心得以及生活记录
    </p>
      <h2><router-link to="/about">进入博客</router-link></h2>
    <h3>留下您宝贵的座右铭</h3>
    <br>
    <Mottolist msg= 'Home'></Mottolist>
  </el-row>
</template>

<script>
export default {

  data () {
    return {
      msg: '欢迎来到唐尼的博客',
      // 导入图片
      url: require("../assets/logo.png")
    }
  },
  components: {
    Mottolist: () => import('../components/assembly/mottoList')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
