import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const Profile = () => {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);

  const [formData, setFormData] = useState({
    name: auth.currentUser?.displayName,
    email: auth.currentUser?.email,
  });

  const onSubmit = async () => {
    try {
      if (auth.currentUser && auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, { name });
      }
    } catch (error) {
      toast.error("could update profile details");
      console.log(error);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const { name, email } = formData;

  const Navigate = useNavigate();

  const onLogOut = () => {
    auth.signOut();
    Navigate("/");
  };

  return (
    <>
      <h1>welcome {name}</h1>
      <button onClick={onLogOut}>sign out</button>
      <div>
        <p>Personal Details</p>
        <p
          onClick={() => {
            if (changeDetails) {
              onSubmit();
            }
            setChangeDetails((prevState) => !prevState);
          }}
        >
          {changeDetails ? "done" : "change details"}
        </p>

        <form>
          <input
            type="text"
            id="name"
            disabled={!changeDetails}
            value={name || ""}
            onChange={onChange}
          />

          <input
            type="email"
            id="email"
            disabled={!changeDetails}
            value={email || ""}
            onChange={onChange}
          />
        </form>
      </div>
    </>
  );
};

export default Profile;
