import axios from "axios"
import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { LOGIN_API } from "../../../../confige/api.confige"

function Login(props) {

    const nav = useNavigate()

    const form = useRef()

    let onSubmit = (e) => {
        e.preventDefault()
        let email = form.current[0].value
        let password = form.current[1].value

        let obj = {
            email,
            password
        }

        var data = new FormData();
        data.append('email', email);
        data.append('password', password);

        var config = {
            method: 'post',
            url: 'http://moretech.api.vvadev.ru:5000/api/user/login',
            data: data
        };

        axios(config)
            .then(function (response) {
                let user = response.data.user
                window.localStorage.setItem('user', JSON.stringify(user))
                let role = user.role
                switch(role) {
                    case 'USER': {
                        nav('/lk')
                        break
                    }
                    case 'ADMIN': {
                        nav('/admin')
                        break
                    }
                    case 'SHOPER': {
                        nav('/shoper/shop')
                        break
                    }
                    case 'CORP': {
                        nav('/editor/users')
                        break
                    }
                    default: {
                        return
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <form
            className="auth-form"
            ref={form}
            onSubmit={
                (e) => {
                    onSubmit(e)
                }
            }
        >
            <h1>
                Авторизация
            </h1>
            <hr />
            <div className="auth-fields">
                <input
                    className="auth-field"
                    placeholder="Почта"
                    type='email'
                />
                <input
                    className="auth-field"
                    placeholder="Пароль"
                    type='password'
                />

            </div>
            <hr />
            <input
                className="auth-button"
                type='submit'
                value='Войти'
            />
            <p>или <Link to={'/auth/reg'}>зарегистрироваться</Link></p>
        </form>
    )
}

export default Login