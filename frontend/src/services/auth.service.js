export class AuthService {
    static setAuth(value) {
        window.localStorage.setItem('auth', value)
    }
    static isAuth() {
        let value = window.localStorage.getItem('auth')
        return value == 'true' ? true : false
    }
}