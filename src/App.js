import { useState, useEffect } from "react";
import "./App.css";
import RandomUser from "./RandomUser";
import "./Button.css";
import { listOfNationality } from "./Consts";
// import "./Button.js";

// global function with users data
function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");


  const fetchUsers = async (params = {}) => {
    const requestParams = {
      results: "15", // you can choose any number of users. I choose 15, you can even 100
      ...params,
    };
    try {
      // randomuser.me api with random users and random info about users
      const response = await fetch(
        "https://randomuser.me/api?" + new URLSearchParams(requestParams)
      );
      const userData = await response.json();
      setAllUsers(userData.results);
      setUsers(userData.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers({
      gender: localStorage.gender,
      nat: localStorage.nationality,
  });
  }, []);
  // search and filter users by Name
  const filterCards = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredUsers = allUsers.filter((user) =>
      `${user.name.first} ${user.name.last}`.toLowerCase().includes(value)
    );
    setUsers(filteredUsers);
  };
  // filter by Nationality
  const filterByNationality = (event) => {
    const value = event.target.value;
    setNationality(value);
    localStorage.setItem("nationality", value);
  };
  // filter by Gender (male,female or both)
  const filterByGender = (event) => {
    const value = event.target.value;
    setGender(value);
    localStorage.setItem("gender", value);
  };
  // global Filter by gender and nat wich uses in button Apply
  function Filter() {
    fetchUsers({
      gender: gender,
      nat: nationality,
    });
  }

  console.log(localStorage);
  return (
    <div className="App">
      <h1>Рандомные юзеры</h1>
      <input
        className="search-box"
        onInput={filterCards}
        placeholder="Поиск..."
      />

      <button onClick={Filter} class="btn-liquid">
        <span class="inner">Apply</span>
      </button>

      <p className="gender">
        Gender --
        <select value={localStorage?.gender} onChange={(e) => filterByGender(e)}>
          <option value="male"> Male </option>
          <option value="female"> Female </option>
          <option value>All</option> {/*idk how to show all genders */}
        </select>
      </p>
      <p className="nat">
        Nationality --
        {/* select by Nationality */}
        <select value={localStorage?.nationality} onChange={(e) => filterByNationality(e)}>
          {listOfNationality.map((option) => (
            <option value={option.value}>
              {option.label}
            </option>
          ))}
          ;
        </select>
      </p>

      <div className="cards-container">
        {users.map((user, index) => (
          <RandomUser key={index} userData={user} />
        ))}
      </div>
    </div>
  );
}

export default App;