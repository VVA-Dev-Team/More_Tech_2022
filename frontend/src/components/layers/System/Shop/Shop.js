import { SHOP_API } from '../../../../confige/api.confige'
import './Shop.css'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

function Shop () {

    const [goods, setGoods] = useState([])

    useEffect(
        () => {
            let title = document.querySelector('title')
            title.innerText = 'Задачи'
            axios.get(SHOP_API).then(
                res => {
                    console.log(res.data)
                    setGoods(res.data)
                }
            )
        }, []
    )

    return(
        <div className="Shop container card">
            {
                
                goods.map(
                    (value, index) => {
                        return (
                            <div
                                key={index}
                                className='task'
                            >
                                <h3>{value.title}</h3>
                                <p>Описание: {value.description}</p>
                                <p>Стоимость: {value.price}</p>
                                <button>
                                    Купить
                                </button>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}

export default Shop