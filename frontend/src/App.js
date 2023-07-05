
import React, {useState , useEffect} from 'react';
import './App.css';

function App() {

  let [user , setUsers] = useState([])

  useEffect (() => {
    users()
  }, [])

  let users = async ()=>{
    let respo = await fetch("http://127.0.0.1:8000/apis/")
    let data = await respo.json()
    console.log(data)
    setUsers(data)
  }
  return (
    <div className="App">
      <header className="App-header">
        
      My app

      {user.map((s,index) =>(
        <div>
        <h1 key={index}> name : {s.name}</h1>
        <h2 key={index}> password : {s.password}</h2>
        </div>
        ))}
 
      </header>
    </div>
  );
}
 
export default App;
