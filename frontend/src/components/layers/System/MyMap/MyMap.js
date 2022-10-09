import { useState } from 'react'
import './MyMap.css'

import Battle from '../Battle/Battle'
import AddBuild from '../AddBuild/AddBuild'
import Spline from '@splinetool/react-spline'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { MAP_API } from '../../../../confige/api.confige'
import axios from 'axios'

import farm from '../../../../assets/farm_0.png'

function MyMap() {

    const [build, setBuild] = useState(-1)

    const [add, setAdd] = useState(false)
    let addToggler = () => setAdd(!add)

    const id = useSelector(
        state => state.userData.user.id
    )

    const [change, setChange] = useState(false)
    const toggler = () => setChange(!change)

    useEffect(
        () => {
            if (id != -1) {
                axios.get(MAP_API + id).then(
                    (res) => {
                        console.log(res.data)
                    }
                )
            }
        }, [id]
    )

    return (
        <div className="container card">
            {
                change == true &&

                <div className='modal'
                onClick={
                    (e) => {
                        if (e.target.className == 'modal') {
                            toggler()
                        }
                    }
                }>
                    <div className='modal-content'>
                        <img
                            className='modal-icon'
                            src={farm}
                        />
                        <h2>Крепость</h2>
                        <p>Уровень 10</p>
                        <div className='modal-btns'>
                            <button>Улучшить</button>
                            <button>Продать территорию и здание</button>
                        </div>
                    </div>
                </div>
            }
            {
                add == true &&
                <AddBuild toggler={addToggler} />
            }
            <div className="builds">
                <div className='build' onClick={toggler}>
                    {/* <div className='build-img'>
                        <img
                            src={draft}
                        />
                    </div> */}
                    <iframe src="https://app.vectary.com/p/3NBaZGeNQStX4eIL0ENfdv" frameborder="0" zoom={0.15} width="100%" style={{ aspectRatio: 1, zoom: 0.1 }}></iframe>
                    <div className='build-info'>
                        <h3>Ферма</h3>
                        <h4>Уровень 4</h4>
                    </div>
                </div>
                <div className='build'>
                    
                    <iframe src="https://app.vectary.com/p/0vSQ2WQFGvCLIk8mx180KE" frameborder="0" width="100%" style={{ aspectRatio: 1, zoom: 0.1 }}></iframe>
                    <div className='build-info'>
                        <h3>Шахта</h3>
                        <h4>Уровень 4</h4>
                    </div>
                </div>
                <div className='build'>
                    <iframe src="https://app.vectary.com/p/3enColQ0upnm4bbrJ5Jv23" frameborder="0" width="100%" style={{ aspectRatio: 1, zoom: 0.1 }}></iframe>
                    <div className='build-info'>
                        <h3>Лесопилка</h3>
                        <h4>Уровень 4</h4>
                    </div>
                </div>
                <div className='build'>
                    <iframe src="https://app.vectary.com/p/3LqYmmOQZN0xxP6EZBJ0Tu" frameborder="0" width="100%" style={{ aspectRatio: 1, zoom: 0.1 }}></iframe>
                    <div className='build-info'>
                        <h3>Склад</h3>
                        <h4>Уровень 4</h4>
                    </div>
                </div>
                <div className='build'>
                    <iframe src="https://app.vectary.com/p/1vdXIIKT0SsLQwQeD4uOR1" frameborder="0" width="100%" style={{ aspectRatio: 1, zoom: 0.1 }}></iframe>
                    <div className='build-info'>
                        <h3>Деревня</h3>
                        <h4>Уровень 4</h4>
                    </div>
                </div>
                <div
                    className='add-btn'
                    onClick={addToggler}
                >
                    <h3>Новое здание</h3>
                </div>
            </div>
        </div>
    )
}

export default MyMap