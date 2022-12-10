import myRequest from './api'

interface IAccount {
  username: string
  password: string
}

export function login(account: IAccount) {
  return myRequest.request({
    method: 'POST',
    url: '/login',
    data: account
  })
}
