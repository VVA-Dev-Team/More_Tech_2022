import { Outlet } from 'react-router'
import Header from './Header/Header'

function Merch (props) {

    return(
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

export default Merch