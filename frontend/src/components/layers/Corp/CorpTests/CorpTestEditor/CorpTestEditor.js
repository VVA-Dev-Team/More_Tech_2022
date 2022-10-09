
import './CorpTestEditor.css'
import axios from 'axios';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { TESTS_API } from '../../../../../confige/api.confige';

function CorpTestEditor(props) {

    const queForm = useRef()

    const [variants, setVariants] = useState([
        {
            id: 0,
            value: ''
        }
    ])

    const [right, setRight] = useState(0)

    useEffect(
        () => {

        }, []
    )

    let send = () => {
        // console.log(1)
        let title = queForm.current[0].value
        let description = queForm.current[1].value
        let answers = []
        let input = 2
        for (let i = 0; i < variants.length; i += 1) {
            // debugger
            console.log(queForm.current[input].value)
            answers.push(queForm.current[input].value)
            input += 2
        }
        let correctAnswer = right
        let obj = {
            title,
            description,
            answers,
            correctAnswer
        }
        axios.post(TESTS_API, obj).then(
            res => {
                console.log(res.data)
            }
        )
    }

    return (
        <div
            className="CorpTestEditor modal"
            onClick={
                (e) => {
                    if (e.target.className == 'CorpTestEditor modal') {
                        props.toggler()
                    }
                }
            }
        >
            <div className='modal-container card'>

                <h2>Добавление вопроса</h2>
                <form
                    ref={queForm}
                    className='modal-form modal-form-que'
                    onSubmit={
                        (e) => {
                            e.preventDefault()
                            send()
                        }
                    }
                >
                    <input
                        type='text'
                        placeholder='Название'
                    />
                    <textarea
                        className='desc'
                        placeholder='Вопрос'
                    />
                    {
                        variants.map(
                            (value, index) => {
                                return (
                                    <div
                                        key={index}>
                                        <input
                                            type='text'
                                            placeholder={'Ответ ' + (index + 1)}
                                        />
                                        <input
                                            type='checkbox'
                                            checked={index == right}
                                            onClick={
                                                () => {
                                                    setRight(index)
                                                }
                                            }
                                            readOnly
                                        />

                                    </div>
                                )
                            }
                        )
                    }
                    <div className='form-que-btns'>
                        <div
                            onClick={
                                () => {
                                    setVariants([
                                        ...variants,
                                        {
                                            id: variants.length,
                                            value: ''
                                        }
                                    ])
                                }
                            }
                        >
                            Добавить ответ
                        </div>
                    </div>
                    <input
                        type='submit'
                        className='modal-btn'
                        value='Сохранить тест'
                    />
                </form>

            </div>
        </div>
    )
}

export default CorpTestEditor