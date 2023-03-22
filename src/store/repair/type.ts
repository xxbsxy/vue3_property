export interface IUser {
  id: number
  phone: string
  realname: string
  username: string
}

export interface IRepairList {
  id: number
  content: string
  place: string
  status: string
  remark: string
  type: string
  createtime: string
  user: IUser
}

export interface IRepairListRes {
  repairList: IRepairList[]
  total: number
}
