import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "../SignUpPage/SignUpForm";
import "./Login.css"
export default function Login() {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleForm = () => setIsLoginForm(!isLoginForm);

  const handleRegisterSuccess = () => {
    setIsLoginForm(true); 
  };
  
  return (
    <div id="login">
      <div className="container">
        <div className="section-header">
          <h3>{isLoginForm ? "Sign In" : "Sign Up"}</h3>
          <p>
            {isLoginForm
              ? "Don't have an account?"
              : "Already have an account?"}
            <button onClick={toggleForm}>
              {isLoginForm ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>

        <div className="form-container">
          {isLoginForm 
            ? <LoginForm /> 
            : <SignUpForm onSuccess={handleRegisterSuccess} />} 
        </div>
      </div>
    </div>
  );
}
