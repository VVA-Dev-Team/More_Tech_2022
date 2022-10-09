import { Outlet } from 'react-router'
import Header from './Header/Header'

function Shoper (props) {

    return(
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

export default Shoper