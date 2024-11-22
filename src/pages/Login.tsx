import image from "../assets/images/Login Art.png";
import { useState, FormEvent } from "react";
import mobile from "../assets/images/mobile.png";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import Button from "../components/Button";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import OAuth from "../components/OAuth";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  console.log(formData);
  const Navigate = useNavigate();
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        Navigate("/Profile");
      }
    } catch (error) {
      console.log(error);
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
                  <input
                    type="password"
                    id="password"
                    value={password}
                    name="password"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder="Enter your password"
                    onChange={onChange}
                  />
                </div>

                <Link
                  to="/forgot-password"
                  className="text-right text-blue-500"
                >
                  Forgot Password?
                </Link>
                <button
                  type="submit"
                  className="w-full bg-indigo-700 text-white font-semibold py-2 rounded-md hover:bg-indigo-600 transition duration-200"
                >
                  Login
                </button>
              </form>
            </div>

            <div>
              <div className="flex flex-row justify-between items-center mb-8">
                <hr className="border-t-4 border-gray-300 w-[109px]" /> or Sign
                In with
                <hr className="border-t-4 border-gray-300  w-[109px]" />
              </div>

              <div className="flex flex-row justify-between mb-8 md:flex-col space-y-4">
                <OAuth />
                <Button icon={FaFacebook} text="facebook" />
              </div>

              <p className="text-center">
                Don't you have an account?
                <Link to="/Register" className="text-blue-500">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
