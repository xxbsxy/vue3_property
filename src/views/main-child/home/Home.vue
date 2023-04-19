<template>
  <div class="home">
    <el-row :gutter="30">
      <el-col :span="5" v-for="item in list" :key="item.num">
        <el-card class="box-card">
          <img :src="item.url" />
          <div class="right-area">
            <div class="top">{{ item.title }}</div>
            <div class="buttom">{{ item.num }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="6">
        <el-card class="welcome">
          <img src="@/assets/img/home/tx.png" class="avatar" />
          <h1>欢迎登录</h1>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card id="main"></el-card>
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="8">
        <el-card id="pie-left"></el-card>
      </el-col>
      <el-col :span="8">
        <el-card id="pie-middle"></el-card>
      </el-col>
      <el-col :span="8">
        <el-card id="pie-right"></el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { init } from './hook/useEcharts'
import user from '@/assets/img/home/user.svg'
import car from '@/assets/img/home/car.svg'
import home from '@/assets/img/home/home.svg'
import complaint from '@/assets/img/home/complaint.svg'
import repair from '@/assets/img/home/repair.svg'

import { loginStore } from '@/store/login/login'
import { storeToRefs } from 'pinia'
const store = loginStore()
const { data } = storeToRefs(store)

const list = reactive([
  { title: '用户总数', num: data.value?.userList?.user_num, url: user },
  { title: '停车位总数', num: data.value?.carList?.car_num, url: car },
  { title: '房屋总数', num: data.value?.homeList?.home_num, url: home },
  { title: '报修总数', num: data.value?.repairList?.repair_num, url: repair },

  {
    title: '投诉总数',
    num: data.value?.complaintList?.complaint_num,
    url: complaint
  }
])
onMounted(async () => {
  await store.getDataListAction()
  init()
})
</script>
<style scoped lang="less">
.box-card {
  position: relative;
  height: 100px;
  .right-area {
    position: absolute;
    right: 20px;
    top: 25px;
    text-align: center;
    .top {
      margin-bottom: 15px;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.45);
    }
    .buttom {
      font-size: 20px;
      font-weight: 700;
    }
  }
}
#main,
.welcome {
  margin-top: 30px;
  height: 400px;
  text-align: center;
  h1 {
    margin-top: 40px;
  }
}
#pie-left,
#pie-right,
#pie-middle {
  margin-top: 30px;
  height: 300px;
}
#piee {
  margin-top: 30px;
  height: 200px;
}
.avatar {
  margin-top: 30px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>
