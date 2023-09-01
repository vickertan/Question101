import "./style.css";
import HomePage from "./HomePage";
import QuestionCollContext from "./QuestionCollContext";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection } from "firebase/firestore";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
    <BrowserRouter>
      <QuestionCollContext.Provider value={questionColl}>
        <Routes>
          <Route path="/playground" />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </QuestionCollContext.Provider>
    </BrowserRouter>
  );
}

export default App;
