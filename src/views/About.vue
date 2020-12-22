<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-main style="height: 760px">
      <el-row >
        <el-col :span="12" :offset="6">
          <el-card shadow="hover" class="text">
            <div slot="header" class="clearfix">
              <span>文章标题</span>
            </div>
            <div
            v-for="item in count"
            :key='item'
            class="item"
            >
              {{ item }}
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>


<script>
  export default {
    data () {
      return {
        count: []
      }
    },
    methods: {

    },
    components: {
      Header: () => import('../components/Header'),
      Footer: () => import('../components/Footer')
    }
  }

</script>


<style>
  .text {
    font-size: 16px;
  }

  .item {
    margin-bottom: 18px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  
</style>