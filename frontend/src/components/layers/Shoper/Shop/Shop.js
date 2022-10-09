import axios from 'axios'
import { useEffect, useState } from 'react'
import { SHOP_API } from '../../../../confige/api.confige'
import './Shop.css'
import ShopEdit from './ShopEdit/ShopEdit'

function Shop() {

    useEffect(
        () => {
            
        }, []
    )

    const [goods, setGoods] = useState([])

    const [add, setAdd] = useState(false)

    const addToggler = () => setAdd(!add)

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

    let deleteGood = (index) => {
        var data = new FormData();
        data.append('id', index);

        var config = {
            method: 'delete',
            url: SHOP_API,
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
        <div className="Shop container card">
            <button
                className='add-btn'
                onClick={addToggler}
            >
                Добавить задание
            </button>
            {
                add == true &&
                <ShopEdit toggler={addToggler} />
            }
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
                                <button
                                    onClick={
                                        () => {
                                            deleteGood(value.id)
                                        }
                                    }
                                >
                                    Удалить
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