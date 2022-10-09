import { useState } from 'react'
import './Battle.css'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { BATTLE_INFO_API, COMFIRM_API, QUE_BATTLE } from '../../../../confige/api.confige';

function Battle(props) {

    const battleId = useSelector(
        state => state.userData.battle.id
    )

    const id = useSelector(
        state => state.userData.user.id
    )

    const [test, setTest] = useState([

    ])

    const [queIdList, setQueIdList] = useState([])

    useEffect(
        () => {
            axios.get(BATTLE_INFO_API + battleId).then(
                res => {
                    let questions = JSON.parse(res.data.questionIds)
                    setQueIdList(questions)
                    console.log(questions)
                }
            )
        }, []
    )

    const [answers, setAnswers] = useState([])

    const [current, setCurrent] = useState(test[0])
    const [chosen, setChosen] = useState(-1)

    const [last, setLast] = useState(false)
    const [end, setEnd] = useState({
        flag: false,
        result: {
            time: 0,
            right: 0
        }
    })


    const [start, setStart] = useState(0)

    const [index, setIndex] = useState(0)

    let startBattle = () => {
        if (queIdList.length != 0) {
            axios.get(QUE_BATTLE + queIdList[index]).then(
                res => {
                    console.log(res.data)
                    setTest([res.data])
                    setCurrent(res.data)
                    setStart(Date.now())
                }
            )
        }
    }

    let next = () => {
        setAnswers([...answers, chosen])
        setChosen(-1)
        let i = index
        i++
        setIndex(i)
        if (i != queIdList.length) {
            axios.get(QUE_BATTLE + queIdList[i]).then(
                res => {
                    setTest([...test, res.data])
                    setCurrent(res.data)
                }
            )
        }
        if (i == queIdList.length - 1) {
            setLast(true)
        }
    }

    let getResult = () => {
        console.log(test)
        let right = 0
        for (let i = 0; i < answers.length; i++) {
            if (answers[i] == test[i].correctAnswer) {
                right++
            }
        }
        if (test[test.length - 1].correctAnswer == chosen) {
            right++
        }
        let time = Math.floor((Date.now() - start) / 1000)
        setEnd({
            flag: true,
            result: {
                time,
                right
            }
        })
        let obj = {
            time,
            correctAnswers: right,
            battleId,
            userId: id
        }

        console.log(obj)
        var data = JSON.stringify(obj);

        var config = {
            method: 'post',
            url: COMFIRM_API,
            headers: {
                'Content-Type': 'application/json'
            },
            data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <div className='modal'>
            <div className='modal-content test'>
                {
                    start == 0
                    &&
                    <>
                        <h3>Битва</h3>
                        <p>Чтобы победить эту битву Вам нужно ответить на вопросы максимально быстро и правильно!</p>
                        <p>Желаем удачи: выиграет сильнейший!</p>
                        <button
                            onClick={startBattle}
                        >
                            Начать
                        </button>
                    </>
                }
                {
                    end.flag == false && start != 0
                    &&
                    <>
                        <h3>{current.title}</h3>
                        <p>{current.description}</p>
                        {
                            current.answers.map(
                                (value, index) => {
                                    return (
                                        <p
                                            key={index}
                                            className={`answer ${chosen == index && 'chosen'}`}
                                            onClick={
                                                () => {
                                                    setChosen(index)
                                                }
                                            }
                                        >
                                            {value}
                                        </p>
                                    )

                                }
                            )
                        }
                        {
                            last == false
                                ?
                                <button
                                    onClick={next}
                                >
                                    Далее
                                </button>
                                :
                                <button
                                    onClick={getResult}
                                >
                                    Закончить
                                </button>
                        }
                    </>
                }
                {
                    end.flag == true && start != 0
                    &&
                    <>
                        <h3>Результаты</h3>
                        <p>Время: {end.result.time} секунды</p>
                        <p>Правильных ответов: {end.result.right} из {test.length}</p>
                    </>
                }
            </div>
        </div>
    )
}

export default Battle