import { useSelector } from 'react-redux';

import './CorpUsers.css'
import { useEffect } from 'react';
import { ALL_API } from '../../../../confige/api.confige';
import axios from 'axios';
import { useState } from 'react';

function CorpUsers(props) {

    const [users, setUsers] = useState([])

    useEffect(
        () => {
            axios.get(ALL_API).then(
                res => {
                    // console.log(res.data.user)
                    let users = res.data.user.filter(
                        value => value.role == 'USER'
                    )
                    setUsers(users)
                }
             )
        }, []
    )

    return (
        <div className='container card'>
            {
                users.map(
                    (value, index) => {
                        return (
                            <div
                                key={index}
                                className='user'
                            >
                                <h3>{value.name}</h3>
                                <p>Владеет: {value.castleName}</p>
                                {/* <p>Уровень замка: {value.castleLevel}</p> */}
                                <p>Количество монет: 100{value.coins}</p>
                                <p>Количество NFT: 100{value.coins}</p>
                                <div className='user-btns'>
                                    {/* <button>Просмотреть карту</button> */}
                                    <button>Просмотреть награды</button>
                                </div>
                                <div className='user-btns'>
                                    <button>Начислить монеты</button>
                                    <button>Наградить NFT</button>
                                </div>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}

export default CorpUsers