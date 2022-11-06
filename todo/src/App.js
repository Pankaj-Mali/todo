
import { BrowserRouter,Route,Routes} from "react-router-dom"
import Login from "./login";
import Body from "./body";
import Register from "./resister";
import { useState } from "react";
import Todoform from "./todoform";


function App() {
  const [ token , setToken] = useState("")
  const [userName , setUserName] = useState("")
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login token={token} setToken={setToken}  userName={userName} setUserName={setUserName}></Login>}  />
        <Route path="/body" element={<Body token={token} setToken={setToken}  userName={userName} setUserName={setUserName} ></Body>}  />
        <Route path="/addtodo" element={<Todoform token={token} setToken={setToken}  ></Todoform>} />
        <Route path="/register" element={<Register></Register>} />
      </Routes>
      </BrowserRouter>
 
    </div>
  );
}

export default App;
