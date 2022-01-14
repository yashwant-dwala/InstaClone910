import React from "react"
import { Link } from "react-router-dom"

const Post = () => {
    return (
        <div>
            <Link to="/mypost"> <img  style = {{width:"17vw",height:"36vh"}} src="https://images.unsplash.com/photo-1457269315919-3cfc794943cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80"></img></Link>
        </div>
    )
}
export default Post;
