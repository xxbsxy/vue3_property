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
export interface ILoginResult {
  user: IUser
  token: string
}
export interface IAccount {
  username: string
  password: string
}
