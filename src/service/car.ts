import type { IUpdateCarData } from '@/store/car/type'
import myRequest from './api'

export function getCarList(realname?: string, offset?: number) {
  return myRequest.request({
    url: '/car',
    params: { realname, offset }
  })
}
export function deleteCar(id: number) {
  return myRequest.request({
    method: 'DELETE',
    url: `/car/${id}`
  })
}
interface IAddCarData {
  position: string
  area: string
  fees: string
  car_num?: string
  remark: string
}
export function addCar(data: IAddCarData) {
  return myRequest.request({
    method: 'POST',
    url: `/car`,
    data
  })
}

export function updateCar(data: IUpdateCarData, id: number) {
  return myRequest.request({
    method: 'PUT',
    url: `/car/${id}`,
    data
  })
}
