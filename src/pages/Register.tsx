import image from "../assets/images/Login Art.png";
import { useState, FormEvent } from "react";
import mobile from "../assets/images/mobile.png";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { FaFacebook, FaRegEyeSlash } from "react-icons/fa";
import Button from "../components/Button";
import { db } from "../../firebaseConfig";
import { toast } from "react-toastify";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import OAuth from "../components/OAuth";

const Register = () => {
  const Navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
      } else {
        console.error("No user is currently signed in.");
      }
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
      } else {
        throw new Error("No current user found.");
      }
      const userData = {
        name,
        email,
        timeStamp: serverTimestamp(), // Add timestamp here
      };

      // Save to Firestore
      await setDoc(doc(db, "users", user.uid), userData);
      toast.success("Registration successful!");
      Navigate("/");
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="md:flex flex-row justify-center mx-20">
        <div className="basis-1/2 order-1">
          <div className="m-6 hidden md:block w-full ">
            <img src={image} alt="login art for desktop" />
          </div>
          <div className="m-6 md:hidden">
            <img src={mobile} alt="login art for mobile" />
          </div>
        </div>
        <div className="p-6 flex flex-col w-[388px] h-[600px] md:flex-row h-screen basis-1/2 order-end justify-center items-center  ">
          <div className="flex flex-col space-y-6 mx-auto">
            <div className="flex flex-col space-y-4">
              <h1 className="text-2xl font-bold">Welcome Back </h1>

              <p className="text-sm ">
                Today is a new day. It's your day. You shape it. Sign in to
                start managing your projects.
              </p>
            </div>

            <div>
              <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
                <div>
                  <label className="mb-2">Name</label>
                  <input
                    type="input"
                    id="name"
                    value={name}
                    name="name"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder="Enter your name"
                    onChange={onChange}
                  />
                </div>
                <div>
                  <label className="mb-2">Email</label>
                  <input
                    type="input"
                    id="email"
                    value={email}
                    name="email"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder="Enter your email"
                    onChange={onChange}
                  />
                </div>

                <div>
                  <label className="mb-2">Password</label>
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      name="password"
                      required
                      className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                      placeholder="Enter your password"
                      onChange={onChange}
                    />
                    <FaRegEyeSlash
                      size={20}
                      className="absolute right-3 cursor-pointer text-gray-500"
                      onClick={() => setShowPassword((prevState) => !prevState)}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2">Confirm Password</label>
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password2"
                      value={password2}
                      name="password2"
                      required
                      className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                      placeholder="Re-Enter your password"
                      onChange={onChange}
                    />
                    <FaRegEyeSlash
                      size={20}
                      className="absolute right-3 cursor-pointer text-gray-500"
                      onClick={() => setShowPassword((prevState) => !prevState)}
                    />
                  </div>
                </div>

                <Link
                  to="/forget-password"
                  className="text-right text-blue-500"
                >
                  Forgot Password?
                </Link>
                <button
                  type="submit"
                  className="w-full bg-indigo-700 text-white font-semibold py-2 rounded-md hover:bg-indigo-600 transition duration-200"
                >
                  Sign Up
                </button>
              </form>
            </div>

            <div>
              <div className="flex flex-row justify-between items-center mb-8">
                <hr className="border-t-4 border-gray-300 w-[109px]" /> or sign
                up with
                <hr className="border-t-4 border-gray-300  w-[109px]" />
              </div>

              <div className="flex flex-row justify-between mb-8 md:flex-col space-y-4">
                <OAuth />
                <Button icon={FaFacebook} text="facebook" />
              </div>

              <p className="text-center">
                Already have an account?
                <NavLink to="/Login" className="text-blue-500">
                  Login
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
