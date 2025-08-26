import React, { useState, useEffect, useContext } from "react";
import Post from "../components/Post"
import { UserContext } from "../App";

const Home = () => {

  const [data, setData] = useState([])

  const updateData = (deletedPostId) => {
    const updatedPost = data.filter((post) => post._id != deletedPostId);
    setData(updatedPost)
  }

  useEffect(() => {
    fetch("/allpost", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        console.log(result.post)
        setData(result.post || [])
      })
      .catch(err => {
        console.error("Error fetching posts:", err)
        setData([]) 
      })
  }, [])

  return (
    <div className="home">
      {/* itrating in data */}
      {
        data.map(item => {
          return (
            <Post item={item} updateData={updateData} />
          )

        })
      }
    </div >
  )
}
export default Home
