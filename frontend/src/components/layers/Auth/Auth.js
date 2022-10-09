import { Outlet } from "react-router"

import './Auth.css'

function Auth(props) {

    return (
        <div className="container Auth">
            <div className="form-container">
                <Outlet />
            </div>
        </div>
    )
}

export default Auth