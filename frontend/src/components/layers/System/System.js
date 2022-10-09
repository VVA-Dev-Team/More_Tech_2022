import { Outlet, useNavigate } from "react-router"
import Header from "./Header/Header"

import Battle from './Battle/Battle'

// import './Auth.css'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function System(props) {

    const navigate = useNavigate()

    const battle = useSelector(
        state => state.userData.battle.flag
    )

    useEffect(
        () => {
            // console.log(battle)
        }, [battle]
    )

    // console.log(battle)

    return (
        <>
            <Header />
            <Outlet />
            {
                battle == true &&
                <Battle />
            }
        </>
    )
}

export default System