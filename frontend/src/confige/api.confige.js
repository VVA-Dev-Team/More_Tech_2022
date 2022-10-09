const API = 'http://moretech.api.vvadev.ru:5000/api'

export const REG_API = API + '/user/registration'
export const LOGIN_API = API + '/user/login'
export const CHECK_API = API + '/user/check?id='
export const ALL_API = API + '/user/all'

export const BATTLE_API = API + '/battles/battle'
export const COMFIRM_API = BATTLE_API + '/confirm'
export const BATTLE_INFO_API = BATTLE_API + '?battleId='
export const USER_BATTLES_API = BATTLE_API + '/get-user-battles?userId='
export const QUE_BATTLE = API + '/battles/questions?questionId='

export const MAP_API = API + '/map/?userId='

export const TASKS_API = API + '/task'
export const TESTS_API = API + '/battles/questions'
export const ALL_TESTS_API = TESTS_API + '/all'

export const SHOP_API = API + '/shop'

export default API