export interface IUser {
  id: number
  username: string
  realname: string
  sex: string
  age: number
  password: string
  phone: string
  role: string
  createtime: string
  updatetime: string
}

export interface IUserListResult {
  userList: IUser[]
  total: number
}

export interface IEditUser {
  username: string
  realname: string
  sex: string
  age: number | string
  phone: string
  role?: string
}
export interface IAddUser {
  username: string
  realname: string
  password: string
  sex: string
  age: number | string
  phone: string
  role?: string
}
