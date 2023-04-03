const path = {
  home: '/',
  profile: '/user/profile',
  login: '/login',
  register: '/register',
  logout: '/logout',
  productDetail: ':nameId',
  changePassword: '/user/password',
  historyPurchases: '/user/history_purchases',
  cart: '/cart',
  user: '/user'
} as const

export default path
