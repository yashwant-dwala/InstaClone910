import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../App";


const NavBar = () => {
  const { state, dispatch } = useContext(UserContext)
  const navigate = useNavigate()

  const renderList = () => {
    if (state) {
      return [
        <li><Link to="/"><i className="medium material-icons">home</i></Link></li>,
        <li><Link to="/followings">followings</Link></li>,
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">Create Post</Link></li>,
        <li><button className="btn #e53935 red darken-1"
          onClick={() => {
            localStorage.clear()
            dispatch({ type: "CLEAR" })
            navigate("/signin")
          }}>Logout</button></li>
      ]
    }
    else {
      return [
        <li><Link to="/signin">Login</Link></li>,
        <li><Link to="/signup">SignUp</Link></li>
      ]
    }
  }
  return (
    <div>
    <nav>
      <div className="nav-wrapper ">
        {/* write js logic in {} */}
        <div className="logo"><Link to={state ? "/" : "/signin"} className="brand-logo left">
          Instagram
        </Link></div>
        <div className="nav-links">
          <ul id="nav-mobile" style={{ zIndex: "5" }}>
            {renderList()}
          </ul>
        </div>
      </div>
    </nav>
    </div>

    
  );
};

export default NavBar;


{/* <nav>
  <ul>
    <li class="logo">CodingNepal</li>
    <li class="btn"><span class="fas fa-bars"></span></li>
    <div class="items">
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Contact</a></li>
    </div>
    <li class="search-icon">
      <input type="search" placeholder="Search">
      <label class ="icon">
      <span class ="fas fa-search"></span>
      </label>
    </li>
  </ul>
</nav> */}


//   <nav>
    //     <div className="nav-wrapper">
    //       <Link to="/" className="brand-logo">Instagram</Link>
    //       <Link to="/" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
    //       <ul className="right hide-on-med-and-down">
    //         <li><Link to="/home">home</Link></li>
    //         <li><Link to="/followings">followings</Link></li>
    //         <li><Link to="/profile">Profile</Link></li>
    //         <li><Link to="/create">Create Post</Link></li>
    //       </ul>
    //     </div>
    //   </nav>

    //   <ul className="sidenav" id="mobile-demo">
    //     <li><Link to="sass.html">Sass</Link></li>
    //     <li><Link to="badges.html">Components</Link></li>
    //     <li><Link to="collapsible.html">Javascript</Link></li>
    //     <li><Link to="mobile.html">Mobile</Link></li>
    //   </ul>