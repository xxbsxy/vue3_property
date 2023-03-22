export interface IUser {
  id: number
  phone: string
  realname: string
  username: string
}

export interface ICarList {
  id: number
  position: string
  fees: number
  area: string
  car_num: string
  remark: string
  createtime: string
  updatetime: string
  user: IUser
}

export interface ICarListObject {
  carList: ICarList[]
  total: number
}
export interface IAddCarData {
  position: string
  area: string
  fees: string
  remark: string
}
