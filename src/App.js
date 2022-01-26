import { useState, useEffect } from "react";
import "./App.css";
import RandomUser from "./RandomUser";

function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      let userData;
      try {
        const response = await fetch("https://randomuser.me/api/?results=15");
        userData = await response.json();
      } catch (error) {
        console.log(error);
        userData = [];
      }
      setAllUsers(userData.results);
      setUsers(userData.results);
    })();
  }, []);

  const filterCards = event => {
    const value = event.target.value.toLowerCase();
    const filteredUsers = allUsers.filter(user => (`${user.name.first} ${user.name.last}`.toLowerCase().includes(value)));
    setUsers(filteredUsers);
  }

  return (
    <div className="App">
      <h1>Рандомные юзеры</h1>
      <input className="search-box" onInput={filterCards} placeholder="Поиск..."/>
      <div className="cards-container">

      {users.map((user, index) => (
        <RandomUser key={index} userData={user} />
        ))}
      </div>
    </div>
  );
}

export default App;
