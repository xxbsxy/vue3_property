export interface IUser {
  id: number
  phone: string
  realname: string
  username: string
}

export interface IComplaintList {
  id: number
  content: string
  status: string
  remark: string
  type: string
  createtime: string
  user: IUser
}

export interface IComplaintListRes {
  complaintList: IComplaintList[]
  total: number
}
