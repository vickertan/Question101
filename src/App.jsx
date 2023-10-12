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

function App() {
  console.log("Render app");

  const [user, setUser] = useState({
    name: "",
    email: "",
    uid: "",
  });
  const [questionList, setQuestionList] = useState([]);

  const questionCollRef = collection(db, "questions");

  // Upload new user's data or load existing user's data
  useEffect(() => {
    const uploadUserData = async () => {
      try {
        await setDoc(doc(db, "people", user.email), {
          name: user.name,
          uid: user.uid,
        });
        console.log(`${user.name}'s data uploaded!`);
      } catch (e) {
        console.error(e);
      }
    };

    const getUserData = async () => {
      const userData = await getDoc(
        doc(db, "people", user.email ? user.email : "anonymous")
      );
      if (userData.exists()) {
        console.log(userData.data());
      } else if (user.email && user.uid) {
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
          email: u.email,
          uid: u.uid,
        });
      } else {
        setUser({
          name: null,
          email: null,
          uid: null,
        });
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <header>
        <AppBar />
      </header>
      <Routes>
        <Route
          path="/playground"
          element={<Deck questionList={questionList} user={user} />}
        />
        <Route path="/" element={<HomePage user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
