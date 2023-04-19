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
export interface ITabList {
  title: string
  path: string
  name: string
}
export interface UserList {
  user_num: number
}

export interface HomeList {
  home_num: number
}

export interface CarList {
  car_num: number
}

export interface ComplaintList {
  complaint_num: number
  complaint_not_num: number
  complaint_go_num: number
  complaint_suc_num: number
}

export interface RepairList {
  repair_num: number
  repair_not_num: number
  repair_go_num: number
  repair_suc_num: number
}

export interface PowerList {
  power_num: number
  power_not_num: number
  power_suc_num: number
}

export interface PropertyList {
  property_num: number
  property_not_num: number
  property_suc_num: number
}

export interface Data {
  userList: UserList
  homeList: HomeList
  carList: CarList
  complaintList: ComplaintList
  repairList: RepairList
  powerList: PowerList
  propertyList: PropertyList
}

export interface RootObject {
  data: Data
  code: number
}
