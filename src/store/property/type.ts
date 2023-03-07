export interface IHome {
  id: number
  position: string
}

export interface IUser {
  id: number
  phone: string
  realname: string
  username: string
}

export interface IPropertyList {
  id: number
  remark: string
  fees: number
  status: string
  createtime: string
  endtime: string
  home: IHome
  user: IUser
}

export interface IPropertyListObject {
  propertyList: IPropertyList[]
  total: number
}
export interface IUpdateData {
  remark: string
  fees: string | number
  status: string
  createtime: string
  endtime: string
}
