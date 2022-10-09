import { Link, NavLink } from 'react-router-dom'
import './Header.css'

import battleIcon from '../../../../assets/battle.png'
import { useEffect } from 'react';
import { USER_BATTLES_API } from '../../../../confige/api.confige';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import { CHECK_API } from './../../../../confige/api.confige';
import { setBattle } from '../../../../store/user.reducer';

function Header(props) {

    const links = [
        {
            name: 'Личный кабинет',
            to: '/lk'
        },
        {
            name: 'Карта мира',
            to: '/map'
        },
        {
            name: 'Моя карта',
            to: '/mymap'
        },
        {
            name: 'Выйти',
            to: '/auth/login'
        }
    ]

    const [attack, setAttack] = useState([])
    const [defend, setDefend] = useState([])

    const id = useSelector(
        state => state.userData.user.id
    )

    useEffect(
        () => {
            if (id != -1) {
                let url = USER_BATTLES_API + id
                var config = {
                    method: 'get',
                    url,
                    headers: {}
                };

                axios(config)
                    .then(function (res) {
                        console.log(res.data);
                        setAttack(res.data.attackingBattles)
                        setDefend(res.data.defendingBattles)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }, [id]
    )

    const dispatch = useDispatch()

    const battle = (battleId) => {
        dispatch(setBattle(true, battleId))
    }

    return (
        <header className="Header">
            <div className='container blocks'>
                <div className='block icon'>
                    Битва королевств
                </div>
                <div className='block '>
                    <p>Баланс: 100</p>
                    <div className='battle'>
                        <img src={battleIcon} />
                        <div className='battles'>
                            {
                                attack.map(
                                    (value, index) => {

                                        return (
                                            <div
                                                className='card battle-item'
                                                key={index}
                                            >
                                                <h5>Нападение!</h5>
                                                <div className='battle-info'>
                                                    <p>Защищающийся: </p>
                                                    <p>Castle name</p>
                                                </div>
                                                <button
                                                    onClick={
                                                        () => {
                                                            battle(value.id)
                                                        }
                                                    }>
                                                    Напасть
                                                </button>
                                            </div>
                                        )
                                    }
                                )
                            }
                            {
                                defend.map(
                                    (value, index) => {
                                        return (
                                            <div
                                                className='card battle-item'
                                                key={index}
                                            >
                                                <h5>Защита!</h5>
                                                <div className='battle-info'>
                                                    <p>Нападающий: </p>
                                                    <p>Castle name</p>
                                                </div>
                                                <button
                                                    onClick={
                                                        () => {
                                                            battle(value.id)
                                                        }
                                                    }>  
                                                    Защититься
                                                </button>
                                            </div>
                                        )
                                    }
                                )
                            }
                        </div>
                    </div>
                    <div className='lines'>
                        <div className='line'></div>
                        <div className='line'></div>
                        <div className='line'></div>
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
                </div>
            </div>
        </header>
    )
}

export default Header