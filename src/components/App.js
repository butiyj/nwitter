import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [changeName, setChangeName] = useState(false);

  useEffect(() => {
    const auth = authService;
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setUserObj(user);
        } else {
          setUserObj(null);
        }
        setInit(true);
      },
      []
    );
  });
  const refreshUser = () => setChangeName((prev) => !prev);

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
    </>
  );
}
export default App;
