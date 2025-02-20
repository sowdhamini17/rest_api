import './App.css';
import React,{useState,useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [users,setUsers]=useState([])
  const [newName,setNewName]= useState("");
  const [newEmail,setNewEmail]=useState("");
  
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res)=>res.json())
      .then((data)=>setUsers(data))
  },[])
  const handleChange = (id, field, value) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, [field]: value } : user
      )
    );
  }
  const addUser=()=>{
    const name=newName.trim();
    const email=newEmail.trim();
    if(name && email){
      fetch("https://jsonplaceholder.typicode.com/users",
      {
        method:"POST",
        body:JSON.stringify({
          name,
          email

        }),
        headers:{"Content-Type":"application/json; charset=UTF-8"}
      })
      .then((res)=>res.json())
      .then((data)=>{
        console.log(data)
        // const newUser = { ...data, id: Date.now() }; 
        setUsers([...users,data])
        toast.success("User added successfully!");
        // return data; 
        setNewName("");
        setNewEmail("");
      })
    }
  }
  function handleUpdate(id){
      const updatedData=users.find((user)=>user.id === id)
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
        method:"PATCH",
        body:JSON.stringify(updatedData),
        headers:{
          "Content-Type":"application/json; charset=UTF-8"
        }
  })
     .then((res)=>res.json())
     .then((data)=>{
        console.log("User updated:", data);
        setUsers(users.map((user) => (user.id === id ? data : user)));
        toast.success("User updated successfully!");
     }
     
     )
     
     setNewName("")
     setNewEmail("")

  }
  function deleteUser(id){
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
        method:"DELETE",
        
  })
   .then((res)=>res.json())
   .then((data)=>
      {  
        
        setUsers(users.filter((user) => user.id !== id)); // ✅ Correct Usage
      
      
      })
  }
  return (
    <div className="App">
       <ToastContainer position="top-right" autoClose={3000} />
      <table border="1" cellPadding={3}>
        <thead>
          
          <th>id</th>
          <th>name</th>
          <th>email</th>
          <th>website</th>
          <th>username</th>
          <th>action</th>
        </thead>
        <tbody>
         {users.map((user)=>
          <tr key={user.id || uuidv4()}>
            <td>{user.id}</td>
            <td>
              <input
                 type='text'
                 value={user.name}
                 onChange={(e)=>{handleChange(user.id, "name", e.target.value)}}
            /></td>
            <td>
              <input
                type='email'
                value={user.email}
                onChange={(e)=>{handleChange(user.id,"email", e.target.value)}}
            /></td>
            <td>{user.website}</td>
            <td>{user.username}</td>
            <td>
              <button className='b1' onClick={()=>handleUpdate(user.id)}>update</button>
              <button className="b2" onClick={()=>deleteUser(user.id)}>DELETE</button> </td>
          </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              <input
               type='text'
               value={newName}
               onChange={(e)=>setNewName(e.target.value)}
               />
            </td>
            <td>
              <input
               type='email'
               value={newEmail}
               onChange={(e)=>setNewEmail(e.target.value)}
               />
            </td>
            <td></td>
            <td></td>
            <button onClick={addUser}>add</button>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App
