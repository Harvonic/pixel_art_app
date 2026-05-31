import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function LoginPage() {

  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    //console.log(formData);

    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      await loginUser(formData);
      navigate("/feed");

    } catch(err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }

  }

  return (
    <main>
      <h1>Login</h1>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      <form onSubmit={handleSubmit}>

         <div>
          <label htmlFor="login">Login</label>
          <input
            id="login"
            name="login"
            placeholder="Enter username or email"
            value={formData.login}
            onChange={handleChange}
          />
        </div>

        <div>
           <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Log in"}
        </button>
      </form>
    </main>
  );
}

export default LoginPage;