import "./App.scss";
import AppBar from "./AppBar";
import Deck from "./Deck";
import HomePage from "./HomePage";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestionCollContext from "./QuestionCollContext";

function App() {
  console.log("Render app");

  const [user, setUser] = useState({
    name: "",
    uid: "",
  });
  const [questionList, setQuestionList] = useState([]);

  const questionCollRef = collection(db, "questions");

  // Upload new user's data or load existing user's data
  useEffect(() => {
    const uploadUserData = async () => {
      try {
        await setDoc(doc(db, "people", user.uid), {
          username: user.name,
          id: user.uid,
        });
        console.log(`${user.name}'s data uploaded!`);
      } catch (e) {
        console.error(e);
      }
    };

    const getUserData = async () => {
      const userData = await getDoc(
        doc(db, "people", user.uid ? user.uid : "anonymous")
      );
      if (userData.exists()) {
        console.log(userData.data());
      } else if (user.name && user.uid) {
        uploadUserData();
      }
    };

    getUserData();
  }, [user]);

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
        setUser({
          name: u.displayName,
          uid: u.uid,
        });
      } else {
        setUser({
          name: null,
          uid: null,
        });
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
            element={<Deck questionList={questionList} user={user} />}
          />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </QuestionCollContext.Provider>
    </BrowserRouter>
  );
}

export default App;
