import type { IEditUser, IAddUser } from '@/store/user/type'
import myRequest from './api'

export function getUserList(username?: string, offset: number = 0) {
  return myRequest.request({
    url: '/user',
    params: {
      username,
      offset
    }
  })
}
export function editUser(data: IEditUser, id: number) {
  return myRequest.request({
    method: 'PUT',
    url: `/user/${id}`,
    data
  })
}

export function deleteUser(id: number) {
  return myRequest.request({
    method: 'DELETE',
    url: `/user/${id}`
  })
}
export function addUser(data: IAddUser) {
  return myRequest.request({
    method: 'POST',
    url: `/user`,
    data
  })
}
