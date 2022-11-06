import React from 'react'
import { useState } from 'react'
import axios from "axios"
import {Link , useNavigate} from "react-router-dom"

function Todoform(props) {
    const nav=useNavigate()
    const {token} = props
    const [todo , setTodo] = useState("")

    const addtodo =(e)=>{
        e.preventDefault();

        const config = { headers: {
             "Content-Type": "application/json",
             "Authorization" : token
     } }
     const info={
        status:"pendding",
        act:todo
     }
        axios.post("http://localhost:8080/add", info, config)
            .then((res) => {
                console.log(res.data.res);
            })
            .catch((e) => { alert(e.response.data.message) });
            nav("/body")

    }
  return (
    <div className='todoformholder'>
        <form>
            <lable htmlFor="todo"> enter your activity :</lable>
            <input type="text" name="todo" 
            value={todo}
            onChange={(e)=>{
                let input=e.target.value;
                setTodo(input);
            }}

            ></input>

           <Link to="/body">   <button className='addbutton' onClick={addtodo}>add to the list</button></Link>
        </form>
    </div>
  )
}

export default Todoform