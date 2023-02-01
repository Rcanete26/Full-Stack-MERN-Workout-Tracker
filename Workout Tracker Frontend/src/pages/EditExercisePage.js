import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export const EditExercisePage = ({ exercise }) => {
  const [name, setName] = useState(exercise.name);
  const [reps, setReps] = useState(exercise.reps);
  const [weight, setWeight] = useState(exercise.weight);
  const [unit, setUnit] = useState(exercise.unit);
  const [date, setDate] = useState(exercise.date.toLocaleString('en-US', {timeZone:"PST"}).substring(0,10));

  const history = useHistory();

  const editExercise = async () => {
    const response = await fetch(`/exercises/${exercise._id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: name, 
        reps: reps, 
        weight: weight,
        unit: unit,
        date: date
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      alert("This Exercise has been edited!");
    } else {
      const errMessage = await response.json();
      alert(
        `Failed to update exercise. Status ${response.status}. ${errMessage.Error}`
      );
    }
    history.push("/");
  };

  return (
    <>
      <article>
        <h2>Edit a excercise in the collection</h2>
        <p>Edit any of the imputs, but all are required</p>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
            />

            <label for="reps">Number of reps</label>
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              id="reps"
            />

            <label for="weight">Weight</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              id="unit"
            />

            <label for="unit">Unit</label>
            <select
              name ='unit'
              id="unit"
              onChange={(e) => setUnit(e.target.value)}
              >
              <option value=''>What are the units?</option>
              <option value='lbs'>lbs</option>
              <option value='kgs'>kgs</option>
              <option value='mi'>mi</option>
              <option value='km'>km</option>
              
              
            </select>

            <label for="date">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              id="date"
            />

            <label for="submit">
              <button onClick={editExercise} id="submit">
                Save
              </button>{" "}
              updates to the collection
            </label>
          </fieldset>
        </form>
      </article>
    </>
  );
};
export default EditExercisePage;
