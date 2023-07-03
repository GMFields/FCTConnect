import React, { useState } from 'react';
import campus from "../img/campus.jpg";
import Cookies from 'js-cookie';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(
        `https://helical-ascent-385614.oa.r.appspot.com/rest/users/login?email=${email}&password=${password}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        const token = JSON.stringify(responseData)
        Cookies.set('token', token);
        Cookies.set('password', password);
        console.log(password);
        console.log(token); 
        console.log("fez login");
        props.onFormSwitch('home');
      } else if (response.status === 404) {
        return "User not found";
      } else if (response.status === 403) {
        const data = await response.text();
        if (data === "Account is not active, contact an admin!") {
          alert(data);
        } else {
          return "Account is not active, contact an admin!";
        }
      } else {
        return "Server error";
      }
    } catch (error) {
      console.log("bostinha");
    }
  };

  return (
    <div>
      <img src={campus} alt="" />
      <div className="auth-form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email"
            id="email"
            name="email"
          />
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            id="password"
            name="password"
          />
          <span className="forgot-password">Forgot Password?</span>
          <button type="submit">Log In</button>
        </form>
        <p>Don't have an Account?</p>
        <button onClick={() => props.onFormSwitch('register')}>Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
