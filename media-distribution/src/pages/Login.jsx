import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  async function getToken() {
    const data = new URLSearchParams();
    data.set("client_id", process.env.REACT_APP_CLIENT_ID);
    data.set("username", process.env.REACT_APP_USERNAME);
    data.set("password", process.env.REACT_APP_PASSWORD);
    data.set("grant_type", process.env.REACT_APP_GRANT_TYPE);
    data.set("scope", process.env.REACT_APP_SCOPE);
    axios
      .post(process.env.REACT_APP_AUTH_SERVICE_URL, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        localStorage.setItem("accessToken", response?.data?.id_token);
      })
      .catch((eerr) => {
        console.log(eerr);
      });
  }
  useEffect(() => {
    console.log(process.env.REACT_APP_CLIENT_ID);
    console.log(process.env);
    if (localStorage?.getItem("accessToken")) {
      navigate("/upload");
    } else {
      getToken();
    }
  }, []);
  return <div className=""></div>;
}

export default Login;
