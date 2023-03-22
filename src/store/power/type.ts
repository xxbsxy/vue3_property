export interface Home {
  id: number
  position: string
}

export interface User {
  id: number
  phone: string
  realname: string
  username: string
}

export interface PowerList {
  id: number
  remark: string
  water_fees: number
  electric_fees: number
  gas_fees: number
  status: string
  createtime: string
  endtime: string
  home: Home
  user: User
}

export interface IPowerListRes {
  powerList: PowerList[]
  total: number
}
export interface IUpdateData {
  remark: string
  water_fees: string | number
  gas_fees: string | number
  electric_fees: string | number
  status: string
  createtime: string
  endtime: string
}
