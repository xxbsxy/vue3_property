<template>
  <el-card class="complaint">
    <general-top
      title-name="投诉列表"
      btn-name="添加投诉"
      placeholder="请输入投诉人查询"
      :add-fn="addComplaint"
      :is-btn-show="!isAdmin"
      :search-fn="searchComplaint"
      :reset-fn="resetComplaint"
    ></general-top>
    <!-- 投诉列表 -->
    <el-table :data="complaintList" stripe style="width: 100%" border>
      <el-table-column type="index" width="60" label="序号" />
      <el-table-column prop="content" label="投诉内容" width="250" />
      <el-table-column prop="type" label="投诉类型" width="130" />
      <el-table-column prop="remark" label="备注" width="130" />

      <el-table-column label="投诉人" width="100">
        <template #default="scope">
          {{ scope.row.user.realname }}
        </template>
      </el-table-column>
      <el-table-column label="联系方式" width="150">
        <template #default="scope">
          {{ scope.row.user.phone }}
        </template>
      </el-table-column>
      <el-table-column label="投诉时间" width="200">
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
      <el-table-column label="处理人" width="130">
        <template #default="scope">
          {{ scope.row.handle_user ? scope.row.handle_user : '无' }}
        </template>
      </el-table-column>
      <el-table-column label="联系方式" width="130">
        <template #default="scope">
          {{ scope.row.handle_phone ? scope.row.handle_phone : '无' }}</template
        >
      </el-table-column>
      <el-table-column label="操作" min-width="200px">
        <template #default="scope">
          <div class="control">
            <el-link
              type="primary"
              :icon="EditPen"
              :underline="false"
              @click="editContent(scope.row)"
            >
              编辑
            </el-link>
            <el-link
              type="danger"
              :icon="Delete"
              :underline="false"
              @click="deleteComplaint(scope.row.id, realname, offset)"
            >
              删除
            </el-link>
            <el-link
              type="warning"
              :icon="Setting"
              :underline="false"
              @click="handleComplaint(scope.row)"
              v-if="isAdmin"
            >
              处理
            </el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑投诉内容 -->
    <my-dialog
      title-name="编辑投诉"
      :confirm-fn="() => putEditComplaintAction(realname, offset)"
      ref="editComplaintDialogRef"
    >
      <el-form
        label-width="100px"
        :model="editComplaintForm"
        style="max-width: 460px"
        :rules="editComplaintRule"
        ref="editComplaintFormRef"
      >
        <el-form-item label="投诉内容" prop="content">
          <el-input v-model="editComplaintForm.content" />
        </el-form-item>
        <el-form-item label="投诉类型" prop="type">
          <el-input v-model="editComplaintForm.type" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="editComplaintForm.remark" />
        </el-form-item>
        <el-form-item label="处理人" prop="handle_user">
          <el-input v-model="editComplaintForm.handle_user" />
        </el-form-item>
        <el-form-item label="联系方式" prop="handle_phone">
          <el-input v-model="editComplaintForm.handle_phone" />
        </el-form-item>
      </el-form>
    </my-dialog>

    <!-- 处理投诉 -->
    <my-dialog
      title-name="处理投诉"
      :confirm-fn="() => putEditComplaintAction(realname, offset)"
      ref="handleComplaintDialogRef"
    >
      <el-form
        label-width="100px"
        :model="editComplaintForm"
        :rules="editComplaintRule"
        style="max-width: 460px"
        ref="editComplaintFormRef"
      >
        <el-form-item>
          <el-radio-group v-model="editComplaintForm.status">
            <el-radio label="未处理">未处理</el-radio>
            <el-radio label="处理中">处理中</el-radio>
            <el-radio label="已处理">已处理</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="处理人" prop="handle_user">
          <el-input v-model="editComplaintForm.handle_user" />
        </el-form-item>
        <el-form-item label="联系方式" prop="handle_phone">
          <el-input v-model="editComplaintForm.handle_phone" />
        </el-form-item>
      </el-form>
    </my-dialog>
    <!-- 添加投诉的对话框 -->
    <my-dialog
      title-name="添加投诉"
      :confirm-fn="() => putAddComplaintAction(realname, offset)"
      ref="addComplaintDialogRef"
    >
      <el-form
        label-width="100px"
        :model="addComplaintForm"
        style="max-width: 460px"
        :rules="addComplaintRule"
        ref="addComplaintFormRef"
      >
        <el-form-item label="投诉内容" prop="content">
          <el-input v-model="addComplaintForm.content" />
        </el-form-item>
        <el-form-item label="投诉类型" prop="type">
          <el-input v-model="addComplaintForm.type" />
        </el-form-item>
        <el-form-item label="投诉内容" prop="remark">
          <el-input v-model="addComplaintForm.remark" />
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
import { complaintStore } from '@/store/complaint/complaint'
import { storeToRefs } from 'pinia'
import { EditPen, Delete, Setting } from '@element-plus/icons-vue'
import { renderTime } from '@/utils/render-time'
import LocalCache from '@/utils/cache'
import GeneralTop from '@/components/general-top/general-top.vue'
import MyDialog from '@/components/my-dialog/my-dialog.vue'
import MyPagination from '@/components/my-pagination/my-pagination.vue'

import { useAddComplaint } from './hooks/useAddComplaint'
import { useEditComplaint } from './hooks/useEditComplaint'
import { useDeleteComplaint } from './hooks/useDeleteComplaint'
const store = complaintStore()
const { complaintList, total } = storeToRefs(store)
const { userId, isAdmin } = LocalCache.getCache('user')
// 添加投诉的hooks
const {
  addComplaintDialogRef,
  addComplaintForm,
  addComplaintRule,
  addComplaintFormRef,
  addComplaint,
  putAddComplaintAction
} = useAddComplaint(userId)
// 编辑投诉和处理投诉的hooks
const {
  editComplaintDialogRef,
  handleComplaintDialogRef,
  editComplaintForm,
  editComplaintFormRef,
  editComplaintRule,
  editContent,
  putEditComplaintAction,
  handleComplaint
} = useEditComplaint()
// 删除投诉诉的hooks
const { deleteComplaint } = useDeleteComplaint()

// 页码改变的回调
let offset = ref(0)
const handelPageChange = (newPage: number) => {
  offset.value = (newPage - 1) * 10
  store.getComplaintListAction(realname.value, offset.value)
}

// 根据投诉人搜素
let realname = ref('')
const searchComplaint = (realName: string) => {
  realname.value = realName
  store.getComplaintListAction(realName)
}
// 重置
const paginationRef = ref()
const resetComplaint = () => {
  realname.value = ''
  paginationRef.value.resetPage()
  store.getComplaintListAction()
}
onMounted(() => {
  store.getComplaintListAction()
})
</script>
<style scoped lang="less">
.el-link {
  margin-right: 20px;
}
</style>
