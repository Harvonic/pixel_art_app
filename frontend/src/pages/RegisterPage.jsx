import { useState } from "react";

function RegisterPage() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <main>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

          
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
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

        <button type="submit">Create Account</button>
      </form>
    </main>
  );
}

export default RegisterPage;