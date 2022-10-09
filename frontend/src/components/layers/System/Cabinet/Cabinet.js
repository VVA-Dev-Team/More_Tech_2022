import Header from '../Header/Header'
import './Cabinet.css'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CHECK_API } from '../../../../confige/api.confige';
import { useNavigate } from 'react-router';

function Cabinet(props) {

    const nav = useNavigate()

    const {id, role} = useSelector(
        state => state.userData.user
    )

    const [info, setInfo] = useState({
        name: '',
        email: '',
        rubBalance: 100,
        nftBalance: 100
    })

    useEffect(
        () => {
            if (id != -1) {
                axios.get(CHECK_API + id).then(
                    (res) => {
                        console.log(res.data)
                        let user = res.data.user
                        let name = user.name
                        let email = user.email
                        setInfo({
                            ...user,
                            name, email
                        })
                    }
                )
            }
        }, [id, role]
    )

    return (
        <div className="Cabinet">
            {/* <Header /> */}
            <div className="container card blocks">
                <div className='info'>
                    <h1>Личный кабинет пользователя</h1>
                    <p>ФИО: <span>{info.name}</span></p>
                    <p>Почта: <span>{info.email}</span></p>
                    <div className='btn-line'>
                        <p>Баланс Digital rubles: <span>1000</span></p>
                        <button>Купить NFT</button>
                    </div>
                    <div className='btn-line'>
                        <p>Баланс NFT: <span>1000</span></p>
                        <button
                        onClick={
                            () => {
                                nav('/shop')
                            }
                        }
                        >
                            Открыть магазин
                            </button>
                    </div>
                    <button
                        className='history'
                    >
                        Посмотреть историю начисления и списания
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cabinet