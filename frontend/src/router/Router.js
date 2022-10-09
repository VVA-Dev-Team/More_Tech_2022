import { lazy } from 'react'

const Auth = lazy(() => import('../components/layers/Auth/Auth'))
const Login = lazy(() => import('../components/layers/Auth/Login/Login'))
const Reg = lazy(() => import('../components/layers/Auth/Reg/Reg'))

const System = lazy(() => import('../components/layers/System/System'))
const Cabinet = lazy(() => import('../components/layers/System/Cabinet/Cabinet'))
const Map = lazy(() => import('../components/layers/System/Map/Map'))
const MyMap = lazy(() => import('./../components/layers/System/MyMap/MyMap'))
const MyShop = lazy(()=>import('../components/layers/System/Shop/Shop'))

const Admin = lazy(() => import('../components/layers/Admin/Admin'))

const Corp = lazy(() => import('../components/layers/Corp/Corp'))
const CorpUsers = lazy(() => import('../components/layers/Corp/CorpUsers/CorpUsers'))
const CorpTasks = lazy(() => import('../components/layers/Corp/CorpTasks/CorpTasks'))
const CorpTests = lazy(() => import('../components/layers/Corp/CorpTests/CorpTests'))

const Shoper = lazy(() => import('../components/layers/Shoper/Shoper'))
const Shop = lazy(()=>import('../components/layers/Shoper/Shop/Shop'))

let Router = [
    {
        path: '/auth',
        element: <Auth />,
        children: [
            {
                path: '/auth/login',
                element: <Login />,
            },
            {
                path: '/auth/reg',
                element: <Reg />,
            }
        ]
    },
    {
        path: '/',
        element: <System />,
        children: [
            {
                path: '/lk',
                element: <Cabinet />,
            },
            {
                path: '/map',
                element: <Map />,
            },
            {
                path: '/mymap',
                element: <MyMap />
            },
            {
                path: '/shop',
                element: <MyShop />
            }
        ]
    },
    {
        path: '/admin',
        element: <Admin />,
        children: [

        ]
    },
    {
        path: '/editor',
        element: <Corp />,
        children: [
            {
                path: '/editor/users',
                element: <CorpUsers />,
            },
            {
                path: '/editor/tasks',
                element: <CorpTasks />,
            },
            {
                path: '/editor/tests',
                element: <CorpTests />,
            },
        ]
    },
    {
        path: '/shoper',
        element: <Shoper />,
        children: [
            {
                path: '/shoper/shop',
                element: <Shop/>,
            },
        ]
    }
]

export default Router