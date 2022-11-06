import React from 'react'



import ("./header.css")
function Header(props) {
  
  return (
    <div className='headerHoder'>
       <span>{props.userName}</span>
    </div>
  )
}

export default Header