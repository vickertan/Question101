import "./App.scss";
import HomePage from "./HomePage";
import GeneralPlayground from "./GeneralPlayground";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppBar from "./AppBar";
import QuestionCollContext from "./QuestionCollContext";

function App() {
  console.log("Render app");

  const [_, setUser] = useState(null);

  const questionColl = collection(db, "questions");

  const [questionList, setQuestionList] = useState([]);

  // Fetch data from firestore
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Get real-time data update
        onSnapshot(questionColl, (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setQuestionList(data);
          console.log("Questions fetched");
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuestions();
  }, []);

  // Rerender app on auth state changed
  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <QuestionCollContext.Provider value={questionColl}>
        <header>
          <AppBar />
        </header>
        <Routes>
          <Route
            path="/playground"
            element={<GeneralPlayground questionList={questionList} />}
          />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </QuestionCollContext.Provider>
    </BrowserRouter>
  );
}

export default App;
