
import './CorpTaskEditor.css'
import { useRef } from 'react';
import axios from 'axios';
import { TASKS_API } from '../../../../../confige/api.confige';

function CorpTaskEditor(props) {

    const form = useRef()

    let send = () => {
        let title = form.current[0].value
        let description = form.current[1].value
        let url = form.current[2].value
        if (url == '') {
            url = 'url'
        }
        let reward = parseInt(form.current[3].value)
        let obj = {
            title,
            description,
            url,
            reward
        }
        console.log(obj)
        axios.post(TASKS_API, obj).then(
            res => {
                console.log(res.data)
            }
        ).catch(function (error) {
            console.log(error);
        });
    }


    return (
        <div
            className="CorpTaskEditor modal"
            onClick={
                (e) => {
                    if (e.target.className == 'CorpTaskEditor modal') {
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
                        placeholder='Описание задачи'
                    />
                    <input
                        className='name'
                        type='text'
                        placeholder='Ссылка на ресурс'
                    />
                    <input
                        className='name'
                        type='number'
                        placeholder='Монет за задание'
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

export default CorpTaskEditor