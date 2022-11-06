import React from 'react'
import { useState } from 'react'
import {Link , useNavigate} from "react-router-dom"
import axios from "axios"


import ("./login.css")
    function Login(props) {

        let nav=useNavigate()
const {token , setToken , userName , setUserName} = props
        const [info, setInfo] = useState({
            email: "",
            password: ""
        })

        const [email, setEmail] = useState("")

        const userLogin = (e) => {
            e.preventDefault();
            if (info.email === "") {
                alert("provide email")
                return
            } else if (info.password === "") {
                alert("provide password")
                return
            }
            const config = { headers: { "Content-Type": "application/json" } }
            axios.post("http://localhost:8080", info, config)
                .then((res) => {
                    console.log(res.data.token);
                    setToken(res.data.token);
                    setUserName(res.data.userName);
                })
                .catch((e) => { alert(e.response.data.message) });

                if(token){  
                    nav("/body")
                }
        }

        return (
            <div className='formholder'>
                <h1>LOGIN</h1>
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
                    <button className='loginB' onClick={userLogin} > LOGIN </button>
                </form>
              <Link to= "/register">
              <p className='link'> I AM NOT A USER</p>
              </Link>
            </div>
        )
    }

export default Login