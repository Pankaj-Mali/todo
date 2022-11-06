import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"


import("./register.css")
function Register() {

  let nav = useNavigate()
  const [info, setInfo] = useState({
    email: "",
    password: ""
  })

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState("")

  const userLogin = (e) => {
    e.preventDefault();
    if (info.email === "") {
      alert("provide email")
      return
    } else if (info.password === "") {
      alert("provide password")
      return
    } else if (info.password !== password) {
      alert("password dont match")
      return

    }
    const config = { headers: { "Content-Type": "application/json" } }
    axios.post("http://localhost:8080/register", info, config)
      .then((res) => {   

        setStatus(res.status);
        alert(e.response.data.message)
      })
      .catch((e) => { alert(e.response.data.res)
      });

    if (status ==200) {
      nav("/")
    }



  }

  return (
    <div className='formholder'>
      <h1>REGISTOR</h1>
      <form action='/' method='post'>
        <input type="email"
          placeholder="email"
          name="email"
          className='le'
          value={email}
          onChange={(e) => {
            let input = e.target.value
            setEmail(input)
          }}
        ></input>
        <input type="text"
          placeholder="password"
          name="password"
          value={info.password}
          className='lp'
          onChange={(e) => {
            let input = e.target.value
            setInfo({
              email: email,
              password: input
            })
          }}
        ></input>
        <input type="text"
          placeholder="password"
          name="password"
          value={password}
          className='lp'
          onChange={(e) => {
            let input = e.target.value
            setPassword(input)
          }}
        ></input>
        <button className='loginB' onClick={userLogin} > REGISTOR </button>
      </form>
      <Link to="/">
        <p className='link'> I AM A USER</p>
      </Link>
    </div>
  )
}

export default Register