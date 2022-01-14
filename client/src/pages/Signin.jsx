import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from 'materialize-css'
import { UserContext } from "../App";

const Signin = () => {

  const { state, dispatch } = useContext(UserContext)
  const navigate = useNavigate() //for redirecting
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const ValidateData = () => {
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      })
    }).then(res => res.json())
      .then(data => {
        // console.log(data)
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
          M.toast({ html: "invalid email address", classes: "#e53935 red darken-1" })
          return
        }
        if (data.error) {
          M.toast({ html: data.error, classes: "#e53935 red darken-1" })
        }
        else {
          localStorage.setItem("jwt", data.token)
          localStorage.setItem("user", JSON.stringify(data.user))
          dispatch({ type: "USER", payload: data.user })

          M.toast({ html: "Successfully Signined!", classes: "#66bb6a green lighten-1" })
          navigate('/')  // redirect
        }
      }).catch(err => {
        console.log(err.toString())
      })
  }


  return (
    <div>
      <div className="mycard">
        <div className="auth-card input-field" >
          <h2>Instagram</h2>
          <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="btn waves-effect waves-light #42a5f5 blue lighten-1" onClick={() => ValidateData()}>Login</button>
          <h6>
            <Link to="/signup">Dont have an account?</Link>
          </h6>
        </div>
      </div>
    </div>
  );
};
export default Signin;
