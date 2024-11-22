import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("email sent successfully");
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
    }
  };
  return (
    <>
      <h1>Forgot Password</h1>
      <div>
        <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="mb-2">Email</label>
            <input
              type="input"
              id="email"
              name="email"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>

          <Link to="/forget-password" className="text-right text-blue-500">
            Sign In
          </Link>
          <button
            type="submit"
            className="w-full bg-indigo-700 text-white font-semibold py-2 rounded-md hover:bg-indigo-600 transition duration-200"
          >
            Send Reset Email
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
