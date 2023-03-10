<template>
  <el-card class="property">
    <general-top
      titleName="物业费列表"
      :isBtnShow="false"
      :searchFn="searchProperty"
      :resetFn="resetProperty"
    />
    <el-table :data="propertyList" stripe style="width: 100%" border>
      <el-table-column type="index" width="60" label="序号" />
      <el-table-column prop="remark" label="物业费介绍" width="230" />
      <el-table-column prop="fees" label="物业费费用" width="100" />
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
      <el-table-column label="缴费状态" width="130">
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
              @click="editPropertyBtn(scope.row)"
              v-if="isAdmin"
            >
              编辑
            </el-link>
            <el-link
              type="success"
              :icon="HelpFilled"
              :underline="false"
              v-if="!isAdmin && scope.row.status === '未缴费'"
              @click="paymentBtn(scope.row.id)"
            >
              缴费
            </el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <my-dialog
      title-name="编辑投诉"
      :confirm-fn="() => putEditPropertyAction(realname, offset)"
      ref="editPropertyDialogRef"
    >
      <el-form
        label-width="100px"
        :model="editPropertyForm"
        style="max-width: 460px"
        :rules="editPropertyRule"
        ref="editPropertyFormRef"
      >
        <el-form-item label="物业费介绍" prop="position">
          <el-input v-model="editPropertyForm.remark" />
        </el-form-item>
        <el-form-item label="物业费费用" prop="area">
          <el-input v-model="editPropertyForm.fees" />
        </el-form-item>
        <el-form-item label="缴费状态" prop="des">
          <el-radio-group v-model="editPropertyForm.status">
            <el-radio label="未缴费">未缴费</el-radio>
            <el-radio label="已缴费">已缴费</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="起始时间" prop="des">
          <el-date-picker
            v-model="editPropertyForm.createtime"
            type="date"
            placeholder="Pick a day"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="截止时间" prop="des">
          <el-date-picker
            v-model="editPropertyForm.endtime"
            type="date"
            placeholder="Pick a day"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
      </el-form>
    </my-dialog>
    <my-dialog
      title-name="缴纳物业费"
      ref="paymentDialogRef"
      :confirm-fn="payFees"
    >
      <el-form label-width="100px" style="max-width: 460px">
        <el-form-item label="缴纳金额">
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
import { EditPen, HelpFilled } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import generalTop from '@/components/general-top/general-top.vue'
import { propertyStore } from '@/store/property/property'
import { storeToRefs } from 'pinia'
import { renderTime } from '@/utils/render-time'
import MyPagination from '@/components/my-pagination/my-pagination.vue'
import { useEditProperty } from './hooks/useEditProperty'
import LocalCache from '@/utils/cache'
import MyDialog from '@/components/my-dialog/my-dialog.vue'
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

const payFees = async () => {
  await store.updatePropertyStatusAction(propertyId.value)
  await store.getPropertyListAction()
  paymentDialogRef.value.close()
}

const store = propertyStore()
const { propertyList, total } = storeToRefs(store)
const { isAdmin } = LocalCache.getCache('user')
const paymentDialogRef = ref()

const paymentBtn = (id: number) => {
  propertyId.value = id
  paymentDialogRef.value.open()
}
// 编辑物业费用的hooks
const {
  editPropertyDialogRef,
  editPropertyFormRef,
  editPropertyForm,
  editPropertyBtn,
  editPropertyRule,
  putEditPropertyAction,
  propertyId
} = useEditProperty()

// 页码改变的回调
let offset = ref(0) // 偏移量
const pageChange = (currentPage: number) => {
  offset.value = (currentPage - 1) * 10
  store.getPropertyListAction(realname.value, offset.value)
}
// 搜素房屋
let realname = ref('') //搜索的文本
const searchProperty = (realName: string) => {
  realname.value = realName
  store.getPropertyListAction(realname.value)
}

// 重置房屋信息
const paginationRef = ref()
const resetProperty = () => {
  realname.value = ''
  paginationRef.value.resetPage()
  store.getPropertyListAction()
}

onMounted(() => {
  store.getPropertyListAction()
})
</script>
<style scoped lang="less">
.el-link {
  margin-right: 20px;
}
</style>
