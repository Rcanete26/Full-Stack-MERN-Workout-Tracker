import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const AddExercisePage = () => {
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("");
  const [date, setDate] = useState("");

  const history = useHistory();

  const AddExercise = async () => {
    const newExercise = { name, reps, weight, unit, date };
    const response = await fetch("/exercises", {
      method: "post",
      body: JSON.stringify(newExercise),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      alert("This Exercise has been added!");
    } else {
      alert(`Adding this exercise did not work! = ${response.status}`);
    }
    history.push("/");
  };

  return (
    <>
      <article>
        <h2>Add to the collection</h2>
        <p>Please fill out all the inputs to add your exercise</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <fieldset>
            <legend>Which Exercise are you adding?</legend>
            <label for="name">Exercise name</label>
            <input
              type="text"
              placeholder="Name of Exercise"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
            />

            <label for="reps">Number of Reps</label>
            <input
              type="number"
              value={reps}
              placeholder="Number of Reps"
              onChange={(e) => setReps(e.target.value)}
              id="reps"
            />

            <label for="weight">Weight</label>
            <input
              type="number"
              value={weight}
              placeholder="Weight"
              onChange={(e) => setWeight(e.target.value)}
              id="weight"
            />

            <label for="unit">Unit</label>
            <select name="unit" id="unit" onChange={(e) => setUnit(e.target.value)}>
              <option value="">What are the units?</option>
              <option value="lbs">lbs</option>
              <option value="kgs">kgs</option>
              <option value="mi">mi</option>
              <option value="km">km</option>
            
            </select>

            <label for="date">Date</label>
            <input
              type="date"
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              id="unit "
            />

            <label for="submit">
              <button type="submit" onClick={AddExercise} id="submit">
                Add
              </button>{" "}
              to the collection
            </label>
          </fieldset>
        </form>
      </article>
    </>
  );
};

export default AddExercisePage;
