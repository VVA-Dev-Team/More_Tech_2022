
import './ShopEdit.css'
import { useRef } from 'react';
import axios from 'axios';
import { SHOP_API } from '../../../../../confige/api.confige';

function ShopEdit(props) {

    const form = useRef()

    let send = () => {
        let title = form.current[0].value
        let description = form.current[1].value
        // let url = form.current[2].value
        // if (url == '') {
        //     url = 'url'
        // }
        let price = parseInt(form.current[2].value)
        let obj = {
            title,
            description,
            price
        }
        console.log(obj)
        axios.post(SHOP_API, obj).then(
            res => {
                console.log(res.data)
            }
        ).catch(function (error) {
            console.log(error);
        });
    }


    return (
        <div
            className="ShopEdit modal"
            onClick={
                (e) => {
                    if (e.target.className == 'ShopEdit modal') {
                        props.toggler()
                    }
                    // 
                }
            }
        >
            <div className='modal-content'>
                <h2>Новая задача</h2>
                <form
                    ref={form}
                    className='modal-form'
                    onSubmit={
                        (e) => {
                            e.preventDefault()
                            send()
                        }
                    }
                >
                    <input
                        className='name'
                        type='text'
                        placeholder='Название'
                    />
                    <textarea
                        className='desc'
                        placeholder='Описание'
                    />
                    <input
                        className='name'
                        type='number'
                        placeholder='Стоимость'
                    />
                    <input
                        type='submit'
                        value='Добавить'
                        className='modal-btn'
                    />
                </form>
            </div>
        </div>
    )
}

export default ShopEdit