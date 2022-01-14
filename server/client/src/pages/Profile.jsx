import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";
import { useNavigate } from "react-router";


const Profile = () => {

    const { state, dispatch } = useContext(UserContext)
    const navigate = useNavigate()
    const [post, setPost] = useState([])
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

    useEffect(() => {
        if (state) {
            fetch(`/user/${state._id}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            }).then(res => res.json())
                .then(result => {
                    dispatch({ type: "UPDATE", payload: { following: result.user.following, followers: result.user.followers } })
                    localStorage.setItem("user", JSON.stringify(result.user))
                    setPost(result.posts)
                })
        }

    }, [url])

    useEffect(() => {
        if (image) {
            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", "insta-clone")
            data.append("cloud_name", "xenotoxin")
            console.log(data)
            fetch("https://api.cloudinary.com/v1_1/xenotoxin/image/upload", {
                method: "post",
                body: data
            })
                .then(res => res.json())
                .then(data => {
                    setUrl(data.url)
                    localStorage.setItem("user", JSON.stringify({
                        ...state,
                        pic: data.url
                    }))
                    dispatch({ type: "UPDATEPIC", payload: data.url })
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }, [image])

    useEffect(() => {
        if (url) {
            fetch("/updatepic", {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    pic: url,
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        M.toast({ html: data.error, classes: "#e53935 red darken-1" })
                    }
                    else {
                        M.toast({ html: "Updated Successfully!", classes: "#66bb6a green lighten-1" })
                        navigate('/profile')
                    }
                }).catch(err => {
                    console.log(err)
                })
        }  
    }, [url])
    




    return (
        <div className="Container">
            <div className="profile-container1">
                <div className="profile-pic">
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src={state ? state.pic : "https://res.cloudinary.com/xenotoxin/image/upload/v1638857724/default-profile-pic-e1513291410505_saksl6.jpg"} alt="no image" />
                    <div style={{ left: "-50px", width: "30px" }} className="file-field input-field">
                        <div >
                            <i style={{color:"blue"}} className="small material-icons right" >account_circle</i>
                            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                        </div>
                    </div>
                </div>
                <div className="bio">
                    <section style={{margin:"0px -30px 10px -250px"}} class="profile-info ">
                        <div class="Container">
                            <h4 class="username">{state ? state.name : "Loading..."}</h4>
                            <h5 className="bio">
                                {state ? state.email : "Loading..."}
                            </h5>
                            <div className="info">
                                <h6>{post.length} post</h6>
                                <h6>{state? state.followers.length : 0 } followers</h6>
                                <h6>{state? state.following.length : 0 } following</h6>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div className="navigate-container ">
                <div className="navigate">
                    <Link to="/profile">posts</Link>
                    <Link to="/mysaved">Saved</Link>
                    <Link to="/tagged">tagged</Link>
                </div>
            </div>
            <div className="post-Container">
                {
                    post.map(item => {
                        return (
                            <img key={item._id} className="post" src={item.photo} alt={item.title} />

                        )
                    })
                }
            </div>

        </div>
    )
};
export default Profile;
