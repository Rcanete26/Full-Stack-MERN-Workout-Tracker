import React from "react";
import ExerciseList from "../components/ExerciseList";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function HomePage({ setExercise }) {
  // Use the history for updating
  const history = useHistory();

  // Use state to bring in the data
  const [exercises, setExercises] = useState([]);

  // RETRIEVE the list of movies
  const loadExercise = async () => {
    const response = await fetch("/exercises");
    const data = await response.json();
    setExercises(data);
  };

  // UPDATE a movie
  const onEdit = async (excercise) => {
    setExercise(excercise);
    history.push("/edit-exercise");
  };

  // DELETE a movie
  const onDeleteExercise = async (_id) => {
    const response = await fetch(`/exercises/${_id}`, { method: "DELETE" });
    if (response.status === 204) {
      // const getResponse = await fetch('/exercises');
      // const excercise = await getResponse.json();
      setExercises(exercises.filter((exercise) => exercise._id !== _id));
    } else {
      console.error(
        `Failed to delete exercise with _id = ${_id}, status code = ${response.status}`
      );
    }
  };

  // LOAD the movies
  useEffect(() => {
    loadExercise();
  }, []);

  // DISPLAY the movies
  return (
    <>
      <article>
        <h2>List of Excercises</h2>
        <p>Here are the current exercises that you have registered</p>
        <ExerciseList
          exercises={exercises}
          onEdit={onEdit}
          onDelete={onDeleteExercise}
        />
      </article>
    </>
  );
}

export default HomePage;
