<template>
  <el-card class="car">
    <general-top
      title-name="停车位列表"
      btn-name="添加停车位"
      placeholder="请输入用户姓名查询"
      :search-fn="searchCar"
      :reset-fn="resetCar"
      :add-fn="addCarBtn"
      :is-btn-show="isAdmin"
    ></general-top>
    <el-table :data="carList" stripe style="width: 100%" border>
      <el-table-column type="index" width="60" label="序号" />
      <el-table-column prop="position" label="停车位位置" width="160" />
      <el-table-column prop="area" label="停车位面积" width="130" />
      <el-table-column prop="fees" label="停车位价格" width="130" />
      <el-table-column prop="car_num" label="车牌号码" width="130" />
      <el-table-column label="车位状态" width="130">
        <template #default="scope">
          <el-tag class="ml-2" type="danger" v-if="!scope.row.user.realname">
            空闲
          </el-tag>
          <el-tag class="ml-2" type="success" v-if="scope.row.user.realname"
            >已出售</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="130" />
      <el-table-column label="车主" width="100">
        <template #default="scope">
          {{ scope.row.user.realname ? scope.row.user.realname : '/' }}
        </template>
      </el-table-column>
      <el-table-column label="联系方式" width="150">
        <template #default="scope">
          {{ scope.row.user.phone ? scope.row.user.phone : '/' }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="150">
        <template #default="scope">
          {{ renderTime(scope.row.createtime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="200px">
        <template #default="scope">
          <div class="control">
            <el-link
              type="primary"
              :icon="EditPen"
              :underline="false"
              @click="editCarBtn(scope.row)"
            >
              编辑
            </el-link>
            <el-link
              type="danger"
              :icon="Delete"
              @click="() => deleteCar(scope.row.id, realname, offset)"
              v-if="isAdmin"
            >
              删除
            </el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <my-dialog
      title-name="添加停车位"
      :confirm-fn="() => putAddCarAction(realname, offset)"
      ref="addCarDialogRef"
    >
      <el-form
        label-width="100px"
        :model="addCarForm"
        style="max-width: 460px"
        :rules="addCarRule"
        ref="addCarFormRef"
      >
        <el-form-item label="停车位位置" prop="position">
          <el-input v-model="addCarForm.position" />
        </el-form-item>
        <el-form-item label="停车位面积" prop="area">
          <el-input v-model="addCarForm.area" />
        </el-form-item>
        <el-form-item label="停车位价格" prop="fees" type="number">
          <el-input v-model="addCarForm.fees" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="addCarForm.remark" />
        </el-form-item>
      </el-form>
    </my-dialog>
    <!-- 编辑投诉内容 -->
    <my-dialog
      title-name="编辑停车位"
      :confirm-fn="() => putEditCarAction(realname, offset)"
      ref="editCarDialogRef"
    >
      <el-form
        label-width="100px"
        :model="editCarForm"
        style="max-width: 460px"
        :rules="editCarRule"
        ref="editCarFormRef"
      >
        <el-form-item label="停车位位置" prop="position">
          <el-input v-model="editCarForm.position" :disabled="!isAdmin" />
        </el-form-item>
        <el-form-item label="停车位面积" prop="area">
          <el-input v-model="editCarForm.area" :disabled="!isAdmin" />
        </el-form-item>
        <el-form-item label="停车位价格" prop="fees" type="number">
          <el-input v-model="editCarForm.fees" :disabled="!isAdmin" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="editCarForm.remark" />
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
import GeneralTop from '@/components/general-top/general-top.vue'
import { onMounted, ref } from 'vue'
import { carStore } from '@/store/car/car'
import { storeToRefs } from 'pinia'
import { EditPen, Delete } from '@element-plus/icons-vue'
import { renderTime } from '@/utils/render-time'
import MyPagination from '@/components/my-pagination/my-pagination.vue'
import { useDeleteCar } from './hooks/useDeleteCar'
import { useAddCar } from './hooks/useAddCar'
import { useEditCar } from './hooks/useEditCar'
import LocalCache from '@/utils/cache'

const store = carStore()
const { carList, total } = storeToRefs(store)
const { isAdmin } = LocalCache.getCache('user')

// 编辑停车位的hooks
const {
  editCarDialogRef,
  editCarFormRef,
  editCarBtn,
  editCarRule,
  putEditCarAction,
  editCarForm
} = useEditCar()

// 添加停车位的hooks
const {
  addCarDialogRef,
  addCarFormRef,
  addCarForm,
  addCarBtn,
  addCarRule,
  putAddCarAction
} = useAddCar()

// 删除停车位的hooks
const { deleteCar } = useDeleteCar()

// 页码改变的回调
let offset = ref(0) // 偏移量
const pageChange = (currentPage: number) => {
  offset.value = (currentPage - 1) * 10
  store.getCarListAction(realname.value, offset.value)
}

// 搜索停车位
let realname = ref('') //搜索的文本
const searchCar = (realName: string) => {
  realname.value = realName
  store.getCarListAction(realname.value)
}
// 重置
const paginationRef = ref()
const resetCar = () => {
  realname.value = ''
  paginationRef.value.resetPage()
  store.getCarListAction()
}

onMounted(() => {
  store.getCarListAction()
})
</script>
<style scoped lang="less">
.el-link {
  margin-right: 20px;
}
</style>
