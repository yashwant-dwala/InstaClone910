import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
// import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../config";



const Userprofile = () => {

    const { state, dispatch } = useContext(UserContext)
    const [post, setPost] = useState([])
    const [User, setUser] = useState(state)
    const [unfollowed, setUnfollowed] = useState(false)//false
    const { userId } = useParams() //way to pass variable through params
    // console.log("unfollowed : ", unfollowed)

    useEffect(() => {
    //issue follow in start also when following
        
        fetch(`/user/${userId}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setUser(result.user)
                setPost(result.posts)
                    if (!result.user.followers.includes(state._id)) setUnfollowed(true)
                // console.log("TO ME:", result)
            })
    }, [ ])

    const followUser = async (followId) => {
        try {
            const newUserData = await axiosInstance.put("/follow", { followId }, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt"), "Content-Type": "application/json"
                }
            })
            dispatch({
                type: "UPDATE", payload: {
                    ...state,
                    following: { ...state.following.filter(e => { if (e != state._id) return e }), followId }
                }
            })
            localStorage.setItem("user", JSON.stringify(state))
            setUser(newUserData.data.updatedUser)
            setUnfollowed(false)
            // console.log("Found:  ", newUserData.data)
        } catch (error) {
            console.log(error)
        }
    }
    const unfollowUser = async (followId) => {
        try {
            const newUserData = await axiosInstance.put("/unfollow", { followId }, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt"), "Content-Type": "application/json"
                }
            })
            setUser(newUserData.data.updatedUser)
            setUnfollowed(true)
            console.log("Found: ", newUserData.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="Container">
            <div className="profile-container1">
                <div className="profile-pic">
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src={User ? User.pic : "https://res.cloudinary.com/xenotoxin/image/upload/v1638857724/default-profile-pic-e1513291410505_saksl6.jpg"} alt="no image" />
                </div>
                <div className="bio">
                    <section class="profile-info ">
                        <div class="Container">
                            <h4 class="username">{User ? User.name : "Loading.."}</h4>
                            <div className="info">
                                <h6>{post.length} post</h6>
                                <h6 >{User ? User.followers.length : "Loading.."} followers</h6>
                                <h6 >{User ? User.following.length : "Loading.."} following</h6>
                            </div>
                            <div className="bio">
                                Lorem ipsum, dolor sit amet consecngh a aglk;na ma ngkraur deserun mollitia. ;
                            </div>
                        </div>
                        {unfollowed ? <button className="btn waves-effect waves-light #42a5f5 blue lighten-1" onClick={() => followUser(User._id)}>Follow</button> : <button className="btn waves-effect waves-light #42a5f5 blue lighten-1" onClick={() => unfollowUser(User._id)}> unFollow</button>}
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
export default Userprofile;
