import axios from 'axios';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { REG_API } from '../../../../confige/api.confige';
import { useNavigate } from 'react-router';

function Reg(props) {

    const nav = useNavigate()

    const roles = [
        {
            value: 'USER',
            name: 'Пользователь'
        },
        {
            value: 'ADMIN',
            name: 'Администратор'
        },
        {
            value: 'SHOPER',
            name: 'Товаровед'
        },
        {
            value: 'CORP',
            name: 'Редактор'
        },
    ]

    const [role, setRole] = useState('USER')

    const form = useRef()

    let onSubmit = () => {
        let email = form.current[0].value
        let name = form.current[1].value
        let password = form.current[2].value
        let castleName = ''
        if (role == 'USER') {
            castleName = form.current[4].value
        }
        let obj = {
            email,
            name,
            password,
            castleName,
            role
        }
        axios.post(REG_API, obj).then(
            (res) => {
                let user = res.data.user
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
            }
        )
    }

    return (
        <form
            className="auth-form"
            onSubmit={
                (e) => {
                    e.preventDefault()
                    onSubmit()
                }
            }
            ref={form}
        >
            <h1>
                Регистрация
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
                    placeholder="Имя"
                    type='text'
                />
                <input
                    className="auth-field"
                    placeholder="Пароль"
                    type='password'
                />
                <div
                    className='auth-check'
                >
                    <select onChange={
                        (e) => {
                            setRole(e.target.value)
                        }
                    }>
                        {
                            roles.map(
                                (value, index) => {
                                    return (
                                        <option
                                            value={value.value}
                                            key={index}
                                        >
                                            {value.name}
                                        </option>
                                    )
                                }
                            )
                        }
                    </select>

                </div>
                {
                    role == 'USER' &&
                    <input
                        className="auth-field"
                        placeholder="Название королевства"
                        type='text'
                    />
                }
            </div>
            <hr />
            <input
                className="auth-button"
                type='submit'
                value='Войти'
            />
            <p>или <Link to={'/auth/login'}>войти</Link></p>
        </form>
    )
}

export default Reg