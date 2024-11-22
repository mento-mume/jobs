import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { toast } from "react-toastify";

const OAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("could not authorize with Google");
      console.log(error);
    }
  };
  return (
    <button
      className="flex  w-full h-[40px] items-center bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg px-8 py-6 shadow-md"
      onClick={onGoogleClick}
    >
      sign {location.pathname === "/register" ? "up" : "in"}
    </button>
  );
};

export default OAuth;
