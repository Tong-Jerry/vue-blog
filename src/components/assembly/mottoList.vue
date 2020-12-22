<template>
  <el-main>
      <!-- 座右铭 -->
      <el-col :span= col3 :offset= offset1>
        <el-input 
          placeholder="你在发光"
          v-model="textarea"
          maxlength="30"
          clearable>
        >
        </el-input>
      </el-col>
      <!-- 昵称 -->
      <el-col :span= col1 :offset= offset2>
        <el-input
        placeholder="唐尼"
        v-model="text"
        maxlength="10"
        clearable>
        >
        </el-input>
      </el-col>
      <!-- 上传按钮 -->
      <el-col :span= col1>
        <el-button type="primary" :plain="true" @click="upload()">上传<i class="el-icon-upload el-icon--right"></i></el-button>
      </el-col>
      <!-- 显示列表 -->
      <el-col :span= col2 :offset= offset1 v-if= showTable>
        <el-table
          :stripe= true
          :data="tableData"
          :height= height1
          style="width: 100%">
          <el-table-column
          prop="textarea"
          label="座右铭"
          :width= width1>
          </el-table-column>
          <el-table-column
          prop="name"
          label="昵称"
          :width= width2>
          </el-table-column>
          <el-table-column
          prop="create_time"
          label="时间">
          </el-table-column>
          <el-table-column
            v-show= "false"
            fixed="right"
            label="操作"
            width="120"
            >
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" circle :disabled= showData @click.native.prevent="delMotto(scope.$index, tableData)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
  </el-main>
</template>


<script>

import { uploadMotto } from '../../api/motto'
import { getMottos } from '../../api/motto'
import { delMottos } from '../../api/motto'
 

export default {
  props: {
    msg: String,
  },
  data () {
    return {
      //  留言内容
      textarea: '',
      text: '',
      // 座右铭
      tableData: [
        {textarea: '你在发光', name: '唐尼', create_time: '2020-12-12'},
      ],
      // 布局格式
      col1: 0,
      col2: 0,
      col3: 0,
      offset1: 0,
      offset2: 0,
      height1: 0,
      width1: 0,
      width2: 0,
      // 显实设置
      showData: true,
      showTable: false
    }
  },
  methods: {
      // 上传
    upload () {
      if (this.textarea) {
          uploadMotto ({"textarea": this.textarea, "name": this.text})
          .then(response => {
            if (response.status == 200){
              const data = response.data
              if (data.code % 2 == 1){
                this.$message.success(data.msg)
                this.getMotto()
                this.text = ''
                this.textarea = ''
              } else {
                this.$message.error(data.msg)
              }
            }
          })
          .catch(function () { // 请求失败处理
            this.$message.error('找不到服务器哎')
          })
        } else {
          this.$message.warning("请填写内容哦")
        }
    },
    // 获取座右铭数据
    getMotto () {
      getMottos ()
      .then(response => {
        if (response.status == 200){
          const data = response.data
          this.tableData = data.data
        }
      })
      .catch(function () {          // 请求失败处理
        this.$message.error('找不到服务器哎')
      })
    },
    // 获取布局样式
    getStyle () {
      if (this.msg === "Home"){
        this.col1= 3,
        this.col2= 14,
        this.col3= 8,
        this.offset1= 5,
        this.offset2= 1
        this.height1= 250,
        this.width1= 700,
        this.width2= 150,
        this.showTable= true
      } else if (this.msg === "Info") {
        this.col1= 3,
        this.col2= 14,
        this.col3= 8,
        this.offset1= 5,
        this.offset2= 1
        this.height1= 550,
        this.width1= 600,
        this.width2= 150,
        this.showData= false,
        this.showTable= true
      }
    },
    // 删除某一条
    delMotto (index, rows) {
      const mid = rows[index]['m_id']
      console.log(mid);
      delMottos ({'m_id': mid})
      .then(response => {
        if (response.status == 200){
          const data = response.data
          if (data.code % 2 == 1){
            this.$message.success(data.msg)
            this.getMotto()
          } else {
            this.$message.error(data.msg)
          }
        }
      })
      .catch(function () {           // 请求失败处理
        this.$message.error('找不到服务器哎')
      });
    }
  },
  mounted () {
    this.getMotto()
    this.getStyle ()
  },
}
</script>


