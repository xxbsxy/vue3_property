import myRequest from './api'

export function getRepairList(
  realname?: string,
  offset?: number,
  size?: number
) {
  return myRequest.request({
    url: '/repair',
    params: { realname, offset, size }
  })
}

export function getUserRepairList(id: number, offset?: number, size?: number) {
  return myRequest.request({
    url: `/repair/${id}`,
    params: { offset, size }
  })
}
export function updateRepair(
  content: string,
  place: string,
  status: string,
  id: number
) {
  return myRequest.request({
    method: 'PUT',
    url: `/repair/${id}`,
    data: {
      content,
      place,
      status
    }
  })
}
export function deleteRepair(id: number) {
  return myRequest.request({
    method: 'DELETE',
    url: `/repair/${id}`
  })
}
export function addRepair(content: string, place: string, userId: number) {
  return myRequest.request({
    method: 'POST',
    url: `/repair`,
    data: {
      content,
      place,
      userId
    }
  })
}
