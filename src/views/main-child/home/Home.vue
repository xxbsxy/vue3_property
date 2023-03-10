<template>
  <el-card class="home">
    <general-top
      titleName="房屋列表"
      btnName="添加房屋"
      :add-fn="addHomeBtn"
      :search-fn="searchHome"
      :reset-fn="resetHome"
      :is-btn-show="isAdmin"
    />
    <!-- 投诉列表 -->
    <el-table :data="homeList" stripe style="width: 100%" border>
      <el-table-column type="index" width="60" label="序号" />
      <el-table-column prop="position" label="房屋位置" width="130" />
      <el-table-column prop="area" label="房屋面积" width="130" />
      <el-table-column prop="des" label="房屋描述" width="350" />

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
              @click="() => editHomeBtn(scope.row)"
            >
              编辑
            </el-link>
            <el-link
              type="danger"
              :icon="Delete"
              :underline="false"
              @click="() => deleteHome(scope.row.id, realname, offset)"
              v-if="isAdmin"
            >
              删除
            </el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加房间的对话框 -->
    <my-dialog
      title-name="添加房屋"
      :confirm-fn="() => putAddHomeAction(realname, offset)"
      ref="addHomeDialogRef"
    >
      <el-form
        label-width="100px"
        :model="addHomeForm"
        style="max-width: 460px"
        :rules="addHomeRule"
        ref="addHomeFormRef"
      >
        <el-form-item label="房屋位置" prop="position">
          <el-input v-model="addHomeForm.position" />
        </el-form-item>
        <el-form-item label="房屋面积" prop="area">
          <el-input v-model="addHomeForm.area" />
        </el-form-item>
        <el-form-item label="房屋描述" prop="des">
          <el-input v-model="addHomeForm.des" />
        </el-form-item>
      </el-form>
    </my-dialog>
    <!-- 编辑房屋内容 -->
    <my-dialog
      title-name="编辑房屋"
      :confirm-fn="() => putEditHomeAction(realname, offset)"
      ref="editHomeDialogRef"
    >
      <el-form
        label-width="100px"
        :model="editHomeForm"
        style="max-width: 460px"
        :rules="editHomeRule"
        ref="editHomeFormRef"
      >
        <el-form-item label="房屋位置" prop="position">
          <el-input v-model="editHomeForm.position" :disabled="!isAdmin" />
        </el-form-item>
        <el-form-item label="房屋面积" prop="area">
          <el-input v-model="editHomeForm.area" :disabled="!isAdmin" />
        </el-form-item>
        <el-form-item label="房屋描述" prop="des">
          <el-input v-model="editHomeForm.des" />
        </el-form-item>
      </el-form>
    </my-dialog>
    <!-- 分页信息 -->
    <my-pagination
      :total="total"
      :pageChange="pageChange"
      ref="paginationRef"
    />
  </el-card>
</template>

<script setup lang="ts">
import generalTop from '@/components/general-top/general-top.vue'
import { EditPen, Delete } from '@element-plus/icons-vue'
import { renderTime } from '@/utils/render-time'
import { onMounted, ref } from 'vue'
import { homeStore } from '@/store/home/home'
import { storeToRefs } from 'pinia'
import MyDialog from '@/components/my-dialog/my-dialog.vue'
import MyPagination from '@/components/my-pagination/my-pagination.vue'
import { useDeleteHome } from './hooks/useDeleteHome'
import { useAddHome } from './hooks/useAddHome'
import { useEditHome } from './hooks/useEditHome'
import LocalCache from '@/utils/cache'

const store = homeStore()
const { homeList, total } = storeToRefs(store)
const { isAdmin } = LocalCache.getCache('user')

// 添加房屋的hooks
const {
  addHomeDialogRef,
  addHomeFormRef,
  addHomeForm,
  addHomeBtn,
  addHomeRule,
  putAddHomeAction
} = useAddHome()

// 编辑房屋的hooks
const {
  editHomeDialogRef,
  editHomeFormRef,
  editHomeForm,
  editHomeRule,
  editHomeBtn,
  putEditHomeAction
} = useEditHome()

// 删除房屋的hooks
const { deleteHome } = useDeleteHome()

// 页码改变的回调
let offset = ref(0) // 偏移量
const pageChange = (currentPage: number) => {
  offset.value = (currentPage - 1) * 10
  store.getHomeListAction(realname.value, offset.value)
}

// 搜素房屋
let realname = ref('') //搜索的文本
const searchHome = (realName: string) => {
  realname.value = realName
  store.getHomeListAction(realname.value)
}

// 重置房屋信息
const paginationRef = ref()
const resetHome = () => {
  realname.value = ''
  paginationRef.value.resetPage()
  store.getHomeListAction()
}

onMounted(() => {
  store.getHomeListAction()
})
</script>
<style scoped lang="less">
.el-link {
  margin-right: 20px;
}
</style>
