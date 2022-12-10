<template>
  <el-card class="user">
    <general-top
      :search-fn="searchUser"
      :reset-fn="reset"
      :add-fn="clickAddBtn"
      title-name="用户列表"
      btn-name="添加用户"
    ></general-top>
    <!-- 用户列表 -->
    <el-table :data="userList" stripe style="width: 100%" border>
      <el-table-column type="index" width="60" label="序号" />
      <el-table-column prop="username" label="用户名" width="140" />
      <el-table-column prop="realname" label="真实姓名" width="140" />
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="phone" label="联系方式" width="170" />
      <el-table-column label="创建时间" width="170">
        <template #default="scope">
          {{ renderTime(scope.row.createtime) }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="170">
        <template #default="scope">
          {{ renderTime(scope.row.updatetime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180px">
        <template #default="scope">
          <div class="control">
            <el-link
              type="primary"
              :icon="EditPen"
              :underline="false"
              @click="editUser(scope.row)"
            >
              编辑
            </el-link>
            <el-link
              type="danger"
              :icon="Delete"
              :underline="false"
              @click="
                deleteUser(scope.row.id, scope.row.username, username, offset)
              "
            >
              删除
            </el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑用户的对话框 -->
    <my-dialog
      ref="editDialogRef"
      :confirm-fn="() => putEditUserAction(username, offset)"
      title-name="编辑用户"
    >
      <el-form
        label-width="100px"
        :model="editForm"
        style="max-width: 460px"
        :rules="editUserRules"
        ref="editUserFormRef"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="editForm.realname" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="editForm.age" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="editForm.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="editForm.phone" />
        </el-form-item>
      </el-form>
    </my-dialog>
    <!-- 添加用户的对话框 -->
    <my-dialog
      ref="addDialogRef"
      title-name="添加用户"
      :confirm-fn="() => putAddUserAction(username, offset)"
    >
      <el-form
        label-width="100px"
        :model="addUserForm"
        style="max-width: 460px"
        :rules="addUserRules"
        ref="addUserFormRef"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="addUserForm.realname" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="addUserForm.age" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="addUserForm.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addUserForm.phone" />
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
import { EditPen, Delete } from '@element-plus/icons-vue'
import { userStore } from '@/store/user/user'
import { storeToRefs } from 'pinia'
import { renderTime } from '@/utils/render-time'
import { useEditUser } from './hooks/useEditUser'
import { useAddUser } from './hooks/useAddUser'
import { useDeleteUser } from './hooks/useDeleteUser'
import MyDialog from '@/components/my-dialog/my-dialog.vue'
import MyPagination from '@/components/my-pagination/my-pagination.vue'
import GeneralTop from '@/components/general-top/general-top.vue'
const store = userStore()
const { userList, total } = storeToRefs(store)
// 编辑用户的hooks
const {
  editForm,
  editUserRules,
  editDialogRef,
  editUserFormRef,
  putEditUserAction,
  editUser
} = useEditUser()
// 添加用户的hooks
const {
  addUserForm,
  addUserRules,
  addDialogRef,
  addUserFormRef,
  putAddUserAction,
  clickAddBtn
} = useAddUser()
// 删除用户的hooks
const { deleteUser } = useDeleteUser()

// 搜素用户
let username = ref('')
const searchUser = async (userName: string) => {
  username.value = userName
  await store.getUserList(username.value, offset.value)
}

// 页码改变的回调函数
let offset = ref(0) // 偏移量
const handelPageChange = async (newPage: number) => {
  offset.value = (newPage - 1) * 10
  await store.getUserList(username.value, offset.value)
}

// 重置
const paginationRef = ref()
const reset = async () => {
  username.value = ''
  paginationRef.value.resetPage()
  await store.getUserList()
}

// 获取用户数据
onMounted(() => {
  store.getUserList()
})
</script>
<style scoped lang="less">
.user {
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    margin-top: 15px;
    .add-btn {
      margin-right: 3px;
    }
    .name {
      margin-left: 3px;
      font-weight: 400;
      font-size: 18px;
    }
  }
  .control {
    .el-link {
      margin-right: 20px;
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
}
</style>
