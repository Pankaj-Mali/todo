import React from 'react'
import Header from './header'
import {Link} from "react-router-dom"


import ("./body.css")
function Body(props) {

const {token , setToken, userName} =props

const logout= ()=>{
  setToken(null)
}




  return (
  <>
  <Header userName={userName}></Header>
    <div className='maincontainer'>
        <div className='left'>
            <p>TODO LIST</p>
            <div className='history'>
                <h1>HISTORY</h1>

            </div>

            <div className='logout'>
              <a href='/'>
                <button className='logoutButton' onClick={logout}>LOGOUT</button>
                </a>
            </div>
    
        </div>
        <div className='right'>
          <div className='addHolder'>
            <Link to="/addtodo"><button className='addtodo'>add todo</button></Link>
          </div>
        </div>
    </div>
  </>
  )
}

export default Body