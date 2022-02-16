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

  const filterCards = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredUsers = allUsers.filter((user) =>
      `${user.name.first} ${user.name.last}`.toLowerCase().includes(value)
    );
    setUsers(filteredUsers);
  };
  const filterByNationality = (event) => {
    const value = event.target.value;
    const filterByNationality = allUsers.filter(
      (user) => user.nat === value && value !== ""
    );
    setUsers(filterByNationality);
  };
  const filterByGender = (event) => {
    const value = event.target.value;
    const filterByGender = allUsers.filter(
      (user) => user.gender === value && value !== ""
    );
    setUsers(filterByGender);
  };

  function Filter() {
    const [nationality, setNationality] = useState("");
    const [gender, setGender] = useState("");

    // const filterCards = (event) => {
    //   const value = event.target.value.toLowerCase();
    //   const filteredUsers = allUsers.filter((user) =>
    //     `${user.name.first} ${user.name.last}`.toLowerCase().includes(value)
    //   );
    //   setUsers(filteredUsers);
    // };
    // const filterByNationality = (event) => {
    //   const value = event.target.value;
    //   const filterByNationality = allUsers.filter(
    //     (user) => user.nat === value && value !== ""
    //   );
    //   setUsers(filterByNationality);
    // };
    // const filterByGender = (event) => {
    //   const value = event.target.value;
    //   const filterByGender = allUsers.filter(
    //     (user) => user.gender === value && value !== ""
    //   );
    //   setUsers(filterByGender);
    // };
  }

  console.log(allUsers);
  return (
    <div className="App">
      <h1>Рандомные юзеры</h1>
      <input
        className="search-box"
        onInput={filterCards}
        placeholder="Поиск..."
      />

      <button type="button" id="testBtn" onClick={Filter}>
        Apply
      </button>

      <p>Gender</p>
      <select onChange={(e) => filterByGender(e)}>
        {" "}
        <option value="male"> Male </option>
        <option value="female"> Female </option>
        <option value>All</option> {/*idk how to show all genders */}
      </select>
      <p>Nationality</p>

      <select onChange={(e) => filterByNationality(e)}>
        {" "}
        <option value="AU"> Australia </option>
        <option value="BR"> Brazil </option>
        <option value="CA"> Canada </option>
        <option value="CH"> Switzerland </option>
        <option value="DE"> Germany </option>
        <option value="DK"> Denmark </option>
        <option value="ES"> Spain </option>
        <option value="FI"> Finland </option>
        <option value="FR"> France </option>
        <option value="GB"> United Kingdom </option>
        <option value="IE"> Ireland </option>
        <option value="IR"> Iran </option>
        <option value="NO"> Norway </option>
        <option value="NL"> Netherlands </option>
        <option value="NZ"> New Zealand </option>
        <option value="TR"> Turkey </option>
        <option value="US"> USA </option>
      </select>

      <div className="cards-container">
        {users.map((user, index) => (
          <RandomUser key={index} userData={user} />
        ))}
      </div>
    </div>
  );
}

export default App;
