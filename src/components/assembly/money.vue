<template>
  <el-main>
    <el-row>
      <!-- 详情 -->
      <el-col :span= 14 :push= 2>
        <!-- 圆形百分比图 -->
        <el-progress type="circle" :percentage="100" show-text></el-progress>收入
        <el-progress type="circle" :percentage="75"></el-progress>理财
        <el-progress type="circle" :percentage="50"></el-progress>美食
        <el-progress type="circle" :percentage="25"></el-progress>购物
        <el-progress type="circle" :percentage="1"></el-progress>交通
        <el-progress type="circle" :percentage="0"></el-progress>还款
        <div style="margin: 50px 0;"></div>
        <!-- 输入金额框 -->
        <el-col :span= 4>
          <el-input
          placeholder="请输入金额"
          suffix-icon="el-icon-money"
          v-model="moneys"
          clearable
          ></el-input>
          <div style="margin: 20px 20px;"></div>
        </el-col>
        <!-- 输入备注框 -->
        <el-col :span= 6 :push= 1>
          <el-input
          placeholder="备注"
          suffix-icon="el-icon-edit"
          v-model="remarks"
          clearable
          ></el-input>
        </el-col>
        <!-- 选择类型 -->
        <el-col :span= 11 :push= 1>
          <el-radio-group v-model="radio">
            <el-radio-button label="收入"></el-radio-button>
            <el-radio-button label="理财"></el-radio-button>
            <el-radio-button label="美食"></el-radio-button>
            <el-radio-button label="购物"></el-radio-button>
            <el-radio-button label="交通"></el-radio-button>
            <el-radio-button label="还款"></el-radio-button>
          </el-radio-group>
        </el-col>
        <!-- 上传按钮 与 详情按钮 -->
        <el-col :span= 1 :push= 1><el-button type="success" icon="el-icon-upload" circle @click="upload()"></el-button></el-col>
        <el-col :span= 1 :push= 1><el-button type="success" icon="el-icon-caret-bottom" circle @click= show()></el-button></el-col>
        <div style="margin: 50px 0;"></div>
        <!-- 详情记录表 -->
        <el-table
          v-if= isShow
          :data="historyData"
          height="450"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="时间">
                  <span>{{ props.row.date }}</span>
                </el-form-item>
                <el-form-item label="消费金额">
                  <span>￥{{ props.row.moneys }}</span>
                </el-form-item>
                <el-form-item label="资产">
                  <span>￥{{ props.row.total }}</span>
                </el-form-item>
                <el-form-item label="类型">
                  <span>{{ props.row.type }}</span>
                </el-form-item>
                <el-form-item label="余额">
                  <span>￥{{ props.row.balance }}</span>
                </el-form-item>
                <el-form-item label="备注">
                  <span>{{ props.row.remarks }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="moneys"
            label="金额"
            width="180">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            width="180">
          </el-table-column>
          <el-table-column
            prop="remarks"
            label="备注">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click.native.prevent="selMoney(scope.$index, historyData)" type="text" icon="el-icon-edit"></el-button>
              <el-dialog title="" :visible.sync="dialogFormVisible" :modal= "diaShow">
                <el-form :model="form" :inline="true">
                  <el-form-item label="金额:" :label-width="formLabelWidth">
                    <el-col :span= 15><el-input v-model="form.moneys"></el-input></el-col>
                  </el-form-item>
                  <el-form-item label="备注:" :label-width="formLabelWidth">
                    <el-col :span= 25><el-input v-model="form.remarks"></el-input></el-col>
                  </el-form-item>
                  <el-form-item label="类型:" :label-width="formLabelWidth">
                      <el-radio-group v-model="form.radio">
                        <el-radio-button label="收入"></el-radio-button>
                        <el-radio-button label="理财"></el-radio-button>
                        <el-radio-button label="美食"></el-radio-button>
                        <el-radio-button label="购物"></el-radio-button>
                        <el-radio-button label="交通"></el-radio-button>
                        <el-radio-button label="还款"></el-radio-button>
                      </el-radio-group>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="upMoney()">确 定</el-button>
                </div>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <!-- 历史记录时间线 -->
      <el-col :span= 3 :push= 4>
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :color="activity.color"
            :type="activity.type"
            :size="activity.size"
            :timestamp="activity.timestamp">
            {{activity.content}}
          </el-timeline-item>
        </el-timeline>
      </el-col>
    </el-row>
    <el-backtop></el-backtop>
  </el-main>
</template>

<script>
import { selectMoney } from '../../api/money'
import { updateMoney } from '../../api/money'
import { createMoney } from '../../api/money'

export default {
  data () {
    return {
      // 金额 备注 类型
      moneys: null,
      remarks: '',
      radio: '',
      // 历史记录数据
      activities: [{
        content: '支持使用图标',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        icon: 'el-icon-s-goods',
        type: 'primary'
      }, {
        content: '支持自定义颜色',
        timestamp: '2018-04-03 20:46',
        size: 'large',
        icon: 'el-icon-s-marketing',
        type: 'primary'
      }, {
        content: '支持自定义尺寸',
        timestamp: '2018-04-03 20:46',
        size: 'large',
        icon: 'el-icon-food',
        type: 'primary'
      }, {
        content: '默认样式的节点',
        timestamp: '2018-04-03 20:46',
        size: 'large',
        icon: 'el-icon-truck',
        type: 'primary'
      }],
      // 表历史记录数据
      historyData: [{
        date: '2016-05-03',
        moneys: 5.20,
        remarks: '上海市普陀区金沙江路 1518 弄',
        type: "美食",
        total: 30000,
        balance: 1200
      },{
        date: '2016-05-03',
        moneys: 5.20,
        remarks: '上海市普陀区金沙江路 1518 弄',
        type: "交通",
        total: 30000,
        balance: 1200
      }],
      // 是否显示表格数据
      isShow: false,
      // 修改金额弹框数据
      dialogFormVisible: false,
      form: {
          remarks: '',
          moneys: '',
          radio: ''
        },
      formLabelWidth: '50px',
      // 遮灯罩
      diaShow: false
    };
  },
  methods: {
    // 显示表格详情
    show() {
      if (this.isShow) {
        this.isShow= false
      } else {
        this.isShow= true
      }
    },
    // 上传金额记录
    upload () {
      if (this.radio && this.moneys && this.remarks) {
        const form = {
          moneys: this.moneys,
          remarks: this.remarks,
          radio: this.radio
        }
        createMoney (form)                             // 发送请求
        .then(response => {
          if (response.status == 200) {                // 成功处理数据
            if (response.data.code % 2 == 1) {
              this.$message.success(response.data.msg)
            } else {
              this.$$message.error(response.data.msg)
            }
          }
        })
        .eatch (function () {                          // 失败发送失败消息
          this.$message.error('找不到服务器')
        })
      } else {
        this.$message.warning('数据填写完整在提交好吗？')
      }
    },
    // 打开编辑
    selMoney (index, tData) {
      // console.log(index, tData[index]);
      // this.$prompt('')
      this.dialogFormVisible= true
      this.form.remarks = tData[index].remarks
      this.form.moneys = tData[index].moneys
      this.form.radio = tData[index].type
    },
    // 上传修改
    upMoney () {
      // console.log(this.form);
      const formData = this.form
      if (this.radio && this.moneys && this.remarks){
        updateMoney (formData)                         // 发送请求
        .then(response => {
          if (response.status == 200){                 // 成功处理数据
            if (response.date.code % 2 ==1){
              this.$message.success(response.data.msg)
            } else {
              this.$$message.error(response.data.msg)
            }
          }
        })
        .eatch(function () {                           // 失败发送失败消息
          this.$message.error('找不到服务器') 
        })
      } else {
        this.$message.warning('数据填写完整在提交好吗？')
      }
    },
    // 
    getMoney () {
      selectMoney ()
      .then (response => {
        if (response.status == 200) {
          const data = response.data
          if (data.code % 2 == 1) {
            console.log(data);
            this.$$message.success(data.msg)
          } else {
            this.$$message.error(data.msg)
          }
        }
      })
      .catch (function () {
        this.$message.error('找不到服务器哎')
      })
    }
  },
  mounted () {
    // this.getMoney()
  }
}
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>