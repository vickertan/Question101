import "./style.css";
import HomePage from "./HomePage";
import QuestionCollContext from "./QuestionCollContext";
import { useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection } from "firebase/firestore";

function App() {
  console.log("Render app");

  const [_, setUser] = useState(null);

  const questionColl = collection(db, "questions");

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      } else {
        setUser(null);
      }
    });
  });

  return (
    <QuestionCollContext.Provider value={questionColl}>
      <HomePage />
    </QuestionCollContext.Provider>
  );
}

export default App;
