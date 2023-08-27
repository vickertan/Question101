import "./style.css";
import HomePage from "./HomePage";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  console.log("Render app");
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      } else {
        setUser(null);
      }
    });
  });

  console.log(user ? user.displayName : "No user");

  return <HomePage />;
}

export default App;
