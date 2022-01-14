import React, { useState, useEffect, useContext } from "react";
import Post from "../components/Post"
import { UserContext } from "../App";
import { Link } from "react-router-dom";

const FollowingPosts = () => {

  const [data, setData] = useState([])

  const updateData = (deletedPostId) => {
    const updatedPost = data.filter((post) => post._id != deletedPostId);
    setData(updatedPost)
  }

  useEffect(() => {
    fetch("/getfollowingspost", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        console.log(result.post)
        setData(result.post)
      })
  }, [])

  return (
    <div className="home">
      {/* itrating in data */}
      {
        data ? data.map(item => {
          return (
            <Post item={item} updateData={updateData} />
          )

        }) : <i><Link style={{ color: "blue" }} to="/">You Don't have Followings, follow some </Link></i>
        
      } 
    </div >
  )
}
export default FollowingPosts
