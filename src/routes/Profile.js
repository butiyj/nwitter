import React, { useState } from "react";
import { authService } from "fbase";
import { signOut, updateProfile } from "firebase/auth";

import { useHistory } from "react-router-dom";

const Profile = ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    signOut(authService);
    history.push("/");
    refreshUser();
  };

  /* const getMyNweets = async () => {
    const q = query(
      collection(dbService, "nweets"),
      where("creatorID", "==", userObj.uid),
      orderBy("createAt", "desc")
    );
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((element) => {
    //   console.log(element.data());
    // });
    const unsubScribe = onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map(
        (doc) => (
          {
            id: doc.id,
            ...doc.data(),
          },
          console.log(doc.data())
        )
      );
      // console.log(nweetArr);
    });
  };
  useEffect(() => {
    getMyNweets();
  }, []); */

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display Name"
          value={newDisplayName}
          className="formInput"
        />
        <input
          type="submit"
          placeholder="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};
export default Profile;
