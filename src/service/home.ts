import myRequest from './api'

export function getHomeList(realname?: string, offset?: number) {
  return myRequest.request({
    url: '/home',
    params: {
      realname,
      offset
    }
  })
}
export function deleteHome(id: number) {
  return myRequest.request({
    method: 'DELETE',
    url: `/home/${id}`
  })
}
interface IAddHomeData {
  position: string
  area: string
  des: string
}
export function addHome(data: IAddHomeData) {
  return myRequest.request({
    method: 'POST',
    url: `/home`,
    data
  })
}
export function updateHome(data: IAddHomeData, id: number) {
  return myRequest.request({
    method: 'PUT',
    url: `/home/${id}`,
    data
  })
}
