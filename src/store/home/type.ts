export interface IUser {
  id: number
  phone: string
  realname: string
  username: string
}

export interface IHomeList {
  id: number
  position: string
  area: string
  des: string
  type: string
  createtime: string
  updatetime: string
  user: IUser
}

export interface IHomeListObject {
  homeList: IHomeList[]
  total: number
}
export interface IAddHomeData {
  position: string
  area: string
  des: string
  type: string
}
