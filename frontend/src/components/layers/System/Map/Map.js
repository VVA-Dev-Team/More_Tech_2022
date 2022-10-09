import { useSelector } from 'react-redux'
import './Map.css'
import { useEffect } from 'react';
import axios from 'axios';
import { ALL_API, BATTLE_API } from '../../../../confige/api.confige';
import { useState } from 'react';

function Map(props) {

    const [users, setUsers] = useState([])

    useEffect(
        () => {
            axios.get(ALL_API).then(
                res => {
                    let users = res.data.user.filter(
                        value => value.role == 'USER'
                    )
                    console.log(users)
                    setUsers(users)
                }
            )
        }, []
    )

    const id = useSelector(
        state => state.userData.user.id
    )

    let battle = (userId) => {
        let obj = {
            reward: 1,
            attacking: id,
            defending: userId
        }

        // var data = JSON.stringify({
        //     'reward': 1,
        //     'attacking': id,
        //     'defending': userId
        // })
        let data = new FormData();
        data.append('reward', 1);
        data.append('attacking', id);
        data.append('defending', userId);

        var config = {
            method: 'post',
            url: BATTLE_API,
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            data
        };

        axios(config)
            .then(function (res) {
                console.log(res.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="Map container">
            <div className='users'>
                {
                    users.map(
                        (value, index) => {
                            return (
                                <div key={index} className='user card'>
                                    <h3>{value.castleName}</h3>
                                    <iframe src="https://app.vectary.com/p/2AY9mL3stNciwm0ovXs35o" frameborder="0" width="100%" style={{ aspectRatio: 1, zoom: 0.1 }}></iframe>
                                    <div className='user-info'>
                                        <p>Уровень: 10</p>
                                        <p>Место в рейтинге: 1</p>
                                    </div>
                                    {
                                        id != value.id &&
                                        <>
                                            <div className='user-btns'>
                                                <button
                                                    onClick={
                                                        () => {
                                                            battle(value.id)
                                                        }
                                                    }
                                                >
                                                    Напасть
                                                </button>
                                                <button>
                                                    Продать землю
                                                </button>
                                            </div>
                                            {/* <button>
                                                Посмотреть карту
                                            </button> */}
                                        </>
                                    }

                                </div>
                            )
                        }
                    )
                }

            </div>
        </div>
    )
}

export default Map