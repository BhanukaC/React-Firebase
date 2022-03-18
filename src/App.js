import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { useState,useEffect } from 'react';
import './App.css';
import { db } from "./firebase-config"

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db, "users");
  
  async function createUser() {
    await addDoc(userCollectionRef, { name: newName, age: Number(newAge) });
  }

  async function updateUser(id, age) {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
   await updateDoc(userDoc,newFields)
  }

  async function deleteUser(id) {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  }


  useEffect(() => {
    async function getUsers() {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
    }
    
    getUsers();

   },[]);
  return (
    <div className="App">
      <input placeholder='Name..' onChange={(event) => {
        setNewName(event.target.value);
      }}/>
      <input type="number" placeholder='Age..' onChange={(event) => {
        setNewAge(event.target.value);
      }}/>
<button onClick={createUser}>Create User</button>


      {users.map((user) => {
        return <div>
          <h1>Name: {user.name}</h1>
          <h1>Age: {user.age}</h1>
          <button onClick={() => {
            updateUser(user.id, user.age);
          }}>Increase Age</button>
          <button onClick={() => {
            deleteUser(user.id);
          }}>Delete User</button>
     </div>})}
    </div>
  );
}

export default App;
