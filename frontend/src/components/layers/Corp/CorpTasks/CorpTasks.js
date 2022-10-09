
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TASKS_API } from '../../../../confige/api.confige';
import CorpTaskEditor from './CorpTaskEditor/CorpTaskEditor';

import './CorpTasks.css'

function CorpTasks(props) {

    const [tasks, setTasks] = useState([])

    const [add, setAdd] = useState(false)

    const addToggler = () => setAdd(!add)

    useEffect(
        () => {
            let title = document.querySelector('title')
            title.innerText = 'Задачи'
            axios.get(TASKS_API).then(
                res => {
                    console.log(res.data)
                    setTasks([...res.data])
                }
            )
        }, []
    )

    let deleteTask = (index) => {
        var data = new FormData();
        data.append('id', index);

        var config = {
            method: 'delete',
            url: 'http://moretech.api.vvadev.ru:5000/api/task',
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
        <div className="Tasks container card">
            <button
                className='add-btn'
                onClick={addToggler}
            >
                Добавить задание
            </button>
            {
                add == true &&
                <CorpTaskEditor toggler={addToggler} />
            }
            {
                tasks.map(
                    (value, index) => {
                        return (
                            <div
                                key={index}
                                className='task'
                            >
                                <h3>{value.title}</h3>
                                <p>Описание: {value.description}</p>
                                <p>Стоимость: {value.reward}</p>
                                <button
                                    onClick={
                                        () => {
                                            deleteTask(value.id)
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

export default CorpTasks