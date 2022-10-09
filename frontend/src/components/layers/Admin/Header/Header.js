import { Link, NavLink } from 'react-router-dom'
import './Header.css'

function Header(props) {

    const links = [
        {
            name: 'Личный кабинет',
            to: '/lk'
        },
        {
            name: 'Выйти',
            to: '/auth/login'
        }
    ]

    return (
        <header className="Header">
            <div className='container blocks'>
                <div className='block icon'>
                    Битва королевств
                </div>
                <div className='block links'>
                    {
                        links.map(
                            (value, index) => {
                                return (
                                    <NavLink
                                        to={value.to}
                                        key={index}
                                    >
                                        {value.name}
                                    </NavLink>
                                )
                            }
                        )
                    }
                </div>
            </div>
        </header>
    )
}

export default Header