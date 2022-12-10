<template>
  <el-card class="complaint">
    <general-top
      title-name="报修列表"
      btn-name="添加报修"
      placeholder="请输入报修人查询"
      :add-fn="addRepair"
      :search-fn="searchRepair"
      :reset-fn="resetRepair"
      :is-btn-show="!isAdmin"
    ></general-top>
    <!-- 投诉列表 -->
    <el-table :data="repairList" stripe style="width: 100%" border>
      <el-table-column type="index" width="60" label="序号" />
      <el-table-column prop="content" label="报修内容" width="300" />
      <el-table-column prop="place" label="报修地点" width="150" />
      <el-table-column label="报修人" width="130">
        <template #default="scope">
          {{ scope.row.user.realname }}
        </template>
      </el-table-column>
      <el-table-column label="联系方式" width="180">
        <template #default="scope">
          {{ scope.row.user.phone }}
        </template>
      </el-table-column>
      <el-table-column label="报修时间" width="200">
        <template #default="scope">
          {{ renderTime(scope.row.createtime, false) }}
        </template>
      </el-table-column>
      <el-table-column label="当前状态" width="130">
        <template #default="scope">
          <el-tag
            class="ml-2"
            type="danger"
            v-if="scope.row.status === '未处理'"
            >{{ scope.row.status }}</el-tag
          >
          <el-tag
            class="ml-2"
            type="warning"
            v-if="scope.row.status === '处理中'"
            >{{ scope.row.status }}</el-tag
          >
          <el-tag
            class="ml-2"
            type="success"
            v-if="scope.row.status === '已处理'"
            >{{ scope.row.status }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="200px">
        <template #default="scope">
          <div class="control">
            <el-link
              type="primary"
              :icon="EditPen"
              :underline="false"
              @click="editRepair(scope.row)"
            >
              编辑
            </el-link>
            <el-link
              type="danger"
              :icon="Delete"
              :underline="false"
              @click="deleteRepair(scope.row.id, realname, offset)"
            >
              删除
            </el-link>
            <el-link
              type="warning"
              :icon="Setting"
              :underline="false"
              v-if="isAdmin"
              @click="handelRepair(scope.row)"
            >
              处理
            </el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑投诉内容 -->
    <my-dialog
      title-name="编辑报修"
      :confirm-fn="() => putEditRepairAction(realname, offset)"
      ref="editRepairDialogRef"
    >
      <el-form
        label-width="100px"
        :model="editRepairForm"
        style="max-width: 460px"
        :rules="editRepairRule"
        ref="editRepairFormRef"
      >
        <el-form-item label="报修内容" prop="content">
          <el-input v-model="editRepairForm.content" />
        </el-form-item>
        <el-form-item label="报修地点" prop="place">
          <el-input v-model="editRepairForm.place" />
        </el-form-item>
      </el-form>
    </my-dialog>

    <my-dialog
      title-name="处理投诉"
      :confirm-fn="() => putEditRepairAction(realname, offset)"
      ref="handleRepairDialogRef"
    >
      <el-form
        label-width="100px"
        :model="editRepairForm"
        style="max-width: 460px"
        ref="editRepairFormRef"
      >
        <el-form-item>
          <el-radio-group v-model="editRepairForm.status">
            <el-radio label="未处理">未处理</el-radio>
            <el-radio label="处理中">处理中</el-radio>
            <el-radio label="已处理">已处理</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </my-dialog>
    <!-- 添加报修的对话框 -->
    <my-dialog
      title-name="添加报修"
      :confirm-fn="() => putAddRepairAction(realname, offset)"
      ref="addRepairDialogRef"
    >
      <el-form
        label-width="100px"
        :model="addRepairForm"
        style="max-width: 460px"
        :rules="addRepairRule"
        ref="addRepairFormRef"
      >
        <el-form-item label="报修内容" prop="content">
          <el-input v-model="addRepairForm.content" />
        </el-form-item>
        <el-form-item label="报修地点" prop="place">
          <el-input v-model="addRepairForm.place" />
        </el-form-item>
      </el-form>
    </my-dialog>
    <!-- 分页 -->
    <my-pagination
      ref="paginationRef"
      :total="total"
      :page-change="handelPageChange"
    ></my-pagination>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { repairStore } from '@/store/repair/repair'
import { storeToRefs } from 'pinia'
import { EditPen, Delete, Setting } from '@element-plus/icons-vue'
import { renderTime } from '@/utils/render-time'
import LocalCache from '@/utils/cache'
import GeneralTop from '@/components/general-top/general-top.vue'
import MyDialog from '@/components/my-dialog/my-dialog.vue'
import MyPagination from '@/components/my-pagination/my-pagination.vue'
import { useEditRepair } from './hooks/useEditRepair'
import { useDeleteRepair } from './hooks/useDeleteRepair'
import { useAddRepair } from './hooks/useAddRepair'

const store = repairStore()
const { repairList, total } = storeToRefs(store)
const { userId, isAdmin } = LocalCache.getCache('user')
// 添加报修的hooks
const {
  addRepairDialogRef,
  addRepairFormRef,
  addRepairForm,
  addRepairRule,
  addRepair,
  putAddRepairAction
} = useAddRepair(userId)

// 编辑报修的hooks
const {
  editRepairDialogRef,
  handleRepairDialogRef,
  editRepairFormRef,
  editRepairForm,
  editRepairRule,
  handelRepair,
  editRepair,
  putEditRepairAction
} = useEditRepair()

let offset = ref(0)
let realname = ref('')

// 删除报修的hooks
const { deleteRepair } = useDeleteRepair()

// 页码改变的回调
const handelPageChange = (currentPage: number) => {
  offset.value = (currentPage - 1) * 10
  store.getRepairListAction(realname.value, offset.value)
}

// 搜素报修
const searchRepair = (realName: string) => {
  realname.value = realName
  store.getRepairListAction(realname.value)
}

// 重置报修
const paginationRef = ref()
const resetRepair = () => {
  realname.value = ''
  paginationRef.value.resetPage()
  store.getRepairListAction()
}

onMounted(() => {
  store.getRepairListAction()
})
</script>
<style scoped lang="less">
.el-link {
  margin-right: 20px;
}
</style>
