<template>
  <el-container>
    <el-header>
      <Header></Header>  
    </el-header>
    <el-main>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="座右铭管理" name="first" >
          <Mottolist msg= "Info"></Mottolist>      
        </el-tab-pane>
        <el-tab-pane label="零钱管理" name="second">
         <Money />
        </el-tab-pane>
        <el-tab-pane label="日常工作笔记" name="third">日常工作笔记</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>



<script>
export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  components: {
    Mottolist: () => import('../components/assembly/mottoList'),
    Money: () => import('../components/assembly/money'),
    Header: () => import('../components/Header')
  }
}
</script>

