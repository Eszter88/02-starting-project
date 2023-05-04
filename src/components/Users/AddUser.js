import React, { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import styles from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";

function AddUser(props) {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredUserage, setEnteredUserage] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    props.onAddUser(enteredUsername, enteredUserage);

    if (
      enteredUsername.trim().length === 0 ||
      enteredUserage.trim().length === 0
    ) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }

    if (+enteredUserage < 1) {
      //+ensures it is number not a string
      setError({
        title: "Invalid Age",
        message: "Please enter a valid age (>0).",
      });
      return;
    }
    setEnteredUsername("");
    setEnteredUserage("");
    console.log(enteredUsername, enteredUserage);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={enteredUsername}
            onChange={(event) => setEnteredUsername(event.target.value)}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            value={enteredUserage}
            onChange={(event) => setEnteredUserage(event.target.value)}
          />
          <Button type="submit"> Add User</Button>
        </form>
      </Card>
    </div>
  );
}

export default AddUser;
