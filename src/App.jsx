import "./App.scss";
import AppBar from "./AppBar";
import Deck from "./Deck";
import HomePage from "./HomePage";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, doc, setDoc } from "firebase/firestore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestionCollContext from "./QuestionCollContext";

function App() {
  console.log("Render app");

  const [_, setUser] = useState(null);

  const questionCollRef = collection(db, "questions");
  const peopleCollRef = collection(db, "people");

  const [questionList, setQuestionList] = useState([]);

  // Fetch data from firestore
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Get real-time data update
        onSnapshot(questionCollRef, (snapshot) => {
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
        const uploadUserData = async () => {
          try {
            await setDoc(doc(db, "people", u.uid), {
              name: u.displayName,
            });
            console.log(`${u.displayName}'s data uploaded`);
          } catch (e) {
            console.error(e);
          }
        };

        setUser(u);
        // uploadUserData if there is no data of the user in database, this is to prevent resetting user's data every login;
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <QuestionCollContext.Provider value={questionCollRef}>
        <header>
          <AppBar />
        </header>
        <Routes>
          <Route
            path="/playground"
            element={<Deck questionList={questionList} />}
          />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </QuestionCollContext.Provider>
    </BrowserRouter>
  );
}

export default App;
