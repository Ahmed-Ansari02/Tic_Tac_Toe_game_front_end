import React from 'react'
import Login_box from '../../components/Login_box'

function Login_screen({user_login, socket}) {
  return (
    <div><Login_box user_login={user_login} socket={socket}/></div>
  )
}

export default Login_screen