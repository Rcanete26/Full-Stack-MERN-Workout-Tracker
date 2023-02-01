// Import dependencies
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState } from "react";

// Import Components, styles, media
import Navigation from "./components/Navigation";
import "./App.css";

// Import Pages
import HomePage from "./pages/HomePage";
import AddExercisePage from "./pages/AddExercisePage";
import EditExercisePage from "./pages/EditExercisePage";

// Define the function that renders the content in routes using State.
function App() {
  const [exercise, setExercise] = useState([]);

  return (
    <>
      <Router>
        <header>
          <h1>Here are your Exercises</h1>
          <p>Awesome Excercise 1.0</p>
        </header>

        <Navigation />

        <main>
          <article className ="App-article">
          <Route path="/" exact>
            <HomePage setExercise={setExercise} />
          </Route>

          <Route path="/add-exercise">
            <AddExercisePage />
          </Route>

          <Route path="/edit-exercise">
            <EditExercisePage exercise={exercise} />
          </Route>
          </article>
        </main>

        <footer>
        <cite>&copy; 2022 Ryan Canete</cite>
        </footer>
      </Router>
    </>
  );
}

export default App;
