import { useDispatch } from 'react-redux';
import { useRoutes } from 'react-router';
import './App.css';
import Router from './router/Router';
import { useEffect } from 'react';
import { setUser } from './store/user.reducer';
import { useNavigate } from 'react-router-dom';

function App() {

  const router = useRoutes(Router)

  const nav = useNavigate()

  let id = -1
  let role = 'USER'

  if (window.localStorage.user != undefined) {
    id = JSON.parse(window.localStorage.user).id
    role = JSON.parse(window.localStorage.user).role
  }
  else {
    nav('/auth/login')
  }
  // else {
  //   switch(role) {
  //     case 'USER': {
  //         nav('/lk')
  //         break
  //     }
  //     case 'ADMIN': {
  //         nav('/admin')
  //         break
  //     }
  //     case 'SHOPER': {
  //         nav('/shoper/shop')
  //         break
  //     }
  //     case 'CORP': {
  //         nav('/editor/users')
  //         break
  //     }
  //     default: {
  //         return
  //     }
  // }
  // }

  const dispatch = useDispatch()

  useEffect(
    () => {
      dispatch(setUser(id, role))
    }, []
  )

  return (
    <div className="App">
      {router}
    </div>
  );
}

export default App;
