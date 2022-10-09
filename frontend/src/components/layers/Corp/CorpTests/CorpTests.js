import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import CorpTestEditor from "./CorpTestEditor/CorpTestEditor"

import './CorpTests.css'
import { ALL_TESTS_API } from './../../../../confige/api.confige';
import axios from "axios";

function CorpTests() {

    const [tests, setTests] = useState([])

    const [add, setAdd] = useState(false)

    const addToggler = () => setAdd(!add)

    useEffect(
        () => {
            let title = document.querySelector('title')
            title.innerText = 'Тесты'
            axios.get(ALL_TESTS_API).then(
                (res) => {
                    console.log(res.data)
                    setTests(res.data)
                }
            )
        }, []
    )

    return (
        <div className="CorpTests container card">
            <button
                className='add-btn'
                onClick={addToggler}
            >
                Добавить тест
            </button>
            {
                add == true &&
                <CorpTestEditor toggler={addToggler} />
            }
            {
                tests.map(
                    (value, index) => {
                        return (
                            <div
                                key={index}
                                className='task'
                            >
                                <h3>{value.title}</h3>
                                <p>{value.description}</p>
                                {
                                    JSON.parse(value.answers).map(
                                        (answer, i) => {
                                            return (
                                                <div className='field' key={i}>
                                                    <input
                                                        type='checkbox'
                                                        checked={i == value.correctAnswer}
                                                        readOnly
                                                    />
                                                    <p>{answer}</p>
                                                </div>
                                            )
                                        }
                                    )
                                }
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}

export default CorpTests