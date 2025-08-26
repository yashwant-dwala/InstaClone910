import React, { useEffect, createContext, useReducer, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Userprofile from "./pages/Userprofile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";
import { reducer, initialState } from "./reducers/userReducer";
import FollowingPosts from "./pages/FollowingPosts";


export const UserContext = createContext();

const Routing = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    console.log(localStorage.getItem("user"));
    const user = localStorage.getItem("user");
    console.log(user)
    if (user !== "undefined") {
      dispatch({ type: "USER", payload: JSON.parse(user) });
    } else {
      navigate("/signin");
    }
  }, []);
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/followings" element={<FollowingPosts />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/userprofile/:userId" element={<Userprofile />} />
      <Route exact path="/signin" element={<Signin />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/create" element={<CreatePost />} />
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <NavBar />
        <Routing />
        <Footer />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
