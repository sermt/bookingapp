import React, { useContext, useState } from "react";
import './login.css';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleLogin = async () => {
    dispatch({ type: "LOGIN_START" });

    try {
      const opcionesFetch = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      };

      const resp = await fetch(
        "http://localhost:3001/api/auth/login", 
        opcionesFetch
      );

      if (!resp.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await resp.json();
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      navigate('/');
    } catch (err) {
      console.error('Error:', err);
      dispatch({ type: "LOGIN_FAILURE", payload: err|| "Something went wrong" });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          className="lInput"
        />
        <button disabled={loading} onClick={handleLogin} className="lButton">
          {loading ? "Cargando..." : "Login"}
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
