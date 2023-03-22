<template>
  <el-card class="power">
    <general-top
      titleName="物业费列表"
      :isBtnShow="false"
      :searchFn="searchPower"
      :resetFn="resetPower"
    />
    <el-table :data="powerList" stripe style="width: 100%" border>
      <el-table-column type="index" width="60" label="序号" />
      <el-table-column prop="water_fees" label="水费" width="100" />
      <el-table-column prop="electric_fees" label="电费费" width="100" />
      <el-table-column prop="gas_fees" label="燃气费" width="100" />
      <el-table-column label="备注" width="80">
        <template #default="scope">
          {{ scope.row.remark === null ? '无' : scope.row.remark }}
        </template>
      </el-table-column>
      <el-table-column label="起始时间" width="140">
        <template #default="scope">
          {{ renderTime(scope.row.createtime) }}
        </template>
      </el-table-column>
      <el-table-column label="截止时间" width="140">
        <template #default="scope">
          {{ renderTime(scope.row.endtime) }}
        </template>
      </el-table-column>
      <el-table-column label="缴费状态" width="100">
        <template #default="scope">
          <el-tag
            class="ml-2"
            type="danger"
            v-if="scope.row.status === '未缴费'"
            >{{ scope.row.status }}</el-tag
          >
          <el-tag
            class="ml-2"
            type="success"
            v-if="scope.row.status === '已缴费'"
            >{{ scope.row.status }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="所属房屋" width="130">
        <template #default="scope">
          {{ scope.row.home.position }}
        </template>
      </el-table-column>
      <el-table-column label="房主" width="130">
        <template #default="scope">
          {{ scope.row.user.realname ? scope.row.user.realname : '/' }}
        </template>
      </el-table-column>
      <el-table-column label="联系方式" width="180">
        <template #default="scope">
          {{ scope.row.user.phone ? scope.row.user.phone : '/' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100px">
        <template #default="scope">
          <div class="control">
            <el-link
              type="primary"
              :icon="EditPen"
              :underline="false"
              v-if="isAdmin"
              @click="() => editPowerBtn(scope.row)"
            >
              编辑
            </el-link>
            <el-link
              type="success"
              :icon="HelpFilled"
              :underline="false"
              v-if="!isAdmin && scope.row.status === '未缴费'"
              @click="() => payBtn(scope.row)"
            >
              缴费
            </el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑水电费 -->
    <my-dialog
      title-name="编辑水电费"
      ref="editPowerDialogRef"
      :confirmFn="() => putUpdatePower(realname, offset)"
    >
      <el-form
        label-width="100px"
        :model="editPowerForm"
        style="max-width: 460px"
        :rules="editPowerRule"
        ref="editPowerFormRef"
      >
        <el-form-item label="水费" prop="water_fees">
          <el-input v-model="editPowerForm.water_fees" />
        </el-form-item>
        <el-form-item label="电费" prop="electric_fees">
          <el-input v-model="editPowerForm.electric_fees" />
        </el-form-item>
        <el-form-item label="燃气费" prop="gas_fees">
          <el-input v-model="editPowerForm.gas_fees" />
        </el-form-item>
        <el-form-item label="备注" prop="position">
          <el-input v-model="editPowerForm.remark" />
        </el-form-item>
        <el-form-item label="缴费状态" prop="des">
          <el-radio-group v-model="editPowerForm.status">
            <el-radio label="未缴费">未缴费</el-radio>
            <el-radio label="已缴费">已缴费</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="起始时间" prop="des">
          <el-date-picker
            v-model="editPowerForm.createtime"
            type="date"
            placeholder="Pick a day"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="截止时间" prop="des">
          <el-date-picker
            v-model="editPowerForm.endtime"
            type="date"
            placeholder="Pick a day"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
      </el-form>
    </my-dialog>
    <my-dialog
      title-name="缴纳水电燃气费"
      ref="paymentDialogRef"
      :confirm-fn="payFees"
    >
      <el-form label-width="100px" style="max-width: 460px">
        <el-form-item label="缴纳总金额">
          <el-input v-model="fees" disabled />
        </el-form-item>
        <el-form-item label="缴纳方式">
          <el-select v-model="pay" class="m-2" placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </my-dialog>
    <!-- 分页信息 -->
    <my-pagination
      :total="total"
      ref="paginationRef"
      :pageChange="pageChange"
    />
  </el-card>
</template>

<script setup lang="ts">
import { powerStore } from '@/store/power/power'
import { onMounted, ref } from 'vue'
import LocalCache from '@/utils/cache'
import { EditPen, HelpFilled } from '@element-plus/icons-vue'
import { renderTime } from '@/utils/render-time'
import { storeToRefs } from 'pinia'
import MyDialog from '@/components/my-dialog/my-dialog.vue'
import generalTop from '@/components/general-top/general-top.vue'
import MyPagination from '@/components/my-pagination/my-pagination.vue'
import { useEditPower } from './hooks/useEditPower'
const store = powerStore()
const { powerList, total } = storeToRefs(store)
const { isAdmin } = LocalCache.getCache('user')
const options = [
  {
    value: '微信支付',
    label: '微信支付'
  },
  {
    value: '支付宝支付',
    label: '支付宝支付'
  },
  {
    value: '银行卡支付',
    label: '银行卡支付'
  }
]
const pay = ref('微信支付')
const fees = ref(300)
const {
  editPowerDialogRef,
  editPowerFormRef,
  editPowerForm,
  editPowerRule,
  powerId,
  editPowerBtn,
  putUpdatePower
} = useEditPower()

//缴纳费用
const payFees = async () => {
  await store.updatePowerStatusAction(powerId.value)
  await store.getPowerListAction()
  paymentDialogRef.value.close()
}

// 点击缴费显示对话框
const paymentDialogRef = ref()
const payBtn = (item: any) => {
  fees.value = item.water_fees + item.electric_fees + item.gas_fees
  powerId.value = item.id
  paymentDialogRef.value.open()
}

// 搜素房屋
let realname = ref('') //搜索的文本
const searchPower = (realName: string) => {
  realname.value = realName
  store.getPowerListAction(realname.value)
}

// 重置
const paginationRef = ref()
const resetPower = () => {
  realname.value = ''
  paginationRef.value.resetPage()
  store.getPowerListAction()
}

// 页码改变
let offset = ref(0) // 偏移量
const pageChange = (currentPage: number) => {
  offset.value = (currentPage - 1) * 10
  store.getPowerListAction(realname.value, offset.value)
}
onMounted(() => {
  store.getPowerListAction()
})
</script>
<style scoped lang="less"></style>
