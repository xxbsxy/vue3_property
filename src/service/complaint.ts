import myRequest from './api'

export function getComplaintList(realname?: string, offset?: number) {
  return myRequest.request({
    url: '/complaint',
    params: { realname, offset }
  })
}
export function getUserComplaintList(id: number, offset?: number) {
  return myRequest.request({
    url: `/complaint/${id}`,
    params: { offset }
  })
}
export function updateComplaint(
  content: string,
  remark: string,
  type: string,
  status: string,
  handle_phone: string,
  handle_user: string,
  id: number
) {
  return myRequest.request({
    method: 'PUT',
    url: `/complaint/${id}`,
    data: {
      content,
      remark,
      type,
      status,
      handle_phone,
      handle_user
    }
  })
}
export function deleteComplaint(id: number) {
  return myRequest.request({
    method: 'DELETE',
    url: `/complaint/${id}`
  })
}
export function addComplaint(
  content: string,
  remark: string,
  type: string,
  userId: number
) {
  return myRequest.request({
    method: 'POST',
    url: `/complaint`,
    data: {
      content,
      remark,
      type,
      userId
    }
  })
}
