import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { axiosInstance } from "../config";

export default function Post({ item, updateData }) {

    const [comment, setComment] = useState("")
    const [data, setData] = useState(item)
    const { state, dispatch } = useContext(UserContext)
    // console.log(data.postedBy.pic)

    const likePost = async (id) => {
        try {
            const res = await axiosInstance.put("/like", { "postId": id }, {
                headers: {
                    "Cotent-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            })
            setData(res.data)
        } catch (error) {
            console.log(error.message);
        }
    }
    const unlikePost = async (id) => {
        try {
            const res = await axiosInstance.put("/unlike", { "postId": id }, {
                headers: {
                    "Cotent-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            })
            setData(res.data)
        } catch (error) {
            console.log(error.message);
        }
    }
    const makeComment = async (postId, text) => {
        try {
            const res = await axiosInstance.put("/comment", { postId, text, }, {
                headers: {
                    "Cotent-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            })
            console.log("frontend: ", res.data)
            setData(res.data)
            setComment("")
        } catch (err) {
            console.log(err)
        }
    }
    const deletePost = async (postId) => {
        try {
            const res = await axiosInstance.delete(`/deletepost/${postId}`, { headers: { Authorization: "Bearer " + localStorage.getItem("jwt") } });
            updateData(postId)
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteCommet = async (postId, cmntId) => {
        try {
            const res = await axiosInstance.delete(`/deletecomment/${postId}/${cmntId}`, { headers: { Authorization: "Bearer " + localStorage.getItem("jwt") } });
            setData(res.data)
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="card home-card" key={data._id}>
            <h5 className="left" style={{ position: "absolute", zIndex: "2", margin: "auto" }}><Link to={data.postedBy._id !== state._id ? "/userprofile/" + data.postedBy._id : "/profile"}><img style={{ width: "30px", height: "30px", borderRadius: "80px", margin: "-3px 6px" }} src={data.postedBy.pic ? data.postedBy.pic : "https://res.cloudinary.com/xenotoxin/image/upload/v1638857724/default-profile-pic-e1513291410505_saksl6.jpg"} alt="no image" />{data.postedBy.name}</Link></h5>
            {data.postedBy._id === state._id && <i className="small material-icons right" onClick={() => { deletePost(data._id); }}>delete</i>}
            <div className="card-image" style={{margin:"35px auto"}} >
                <img src={data.photo} alt="" />
            </div>
            <div className="card-content " >
                {
                    data.likes.includes(state._id)
                        ?
                        <i className="small material-icons left" style={{ color: "red", zIndex: "4", position: "relative"}} onClick={() => { unlikePost(data._id) }}>favorite</i>
                        :
                        <i className="small material-icons left" style={{  zIndex: "4", position: "relative" }} onClick={() => { likePost(data._id) }}>favorite_border</i>
                }
                <h6 style={{ textAlign: "left", display: "block" }}>{data.likes.length} likes</h6>

                <h6 style={{ textAlign: "left", display: "block" }}><Link to={data.postedBy._id !== state._id ? "/userprofile/" + data.postedBy._id : "/profile"}>{data.title}</Link></h6>
                <div></div>
                <p style={{ textAlign: "left" }}>{data.body} </p>
                {data.comments.map(entry => {
                    return (
                        <div>
                            {/* <h6 className="left">Comments</h6> */}
                            <h6 style={{ textAlign: "left", display: "block" }} key={entry._id}><span style={{ fontWeight: "500" }}><Link to={entry.postedBy._id !== state._id ? "/userprofile/" + entry.postedBy._id : "/profile"}><img style={{ width: "30px", height: "30px", borderRadius: "80px", margin: "-3px 6px" }} src={entry.postedBy.pic ? entry.postedBy.pic : "https://res.cloudinary.com/xenotoxin/image/upload/v1638857724/default-profile-pic-e1513291410505_saksl6.jpg"} alt="no image" />{entry.postedBy.name} </Link></span>{entry.text}</h6><span> {entry.postedBy._id == state._id && <i className="small material-icons right" onClick={() => { deleteCommet(data._id, entry._id); }}>delete</i>}</span>
                        </div>
                    )
                })}
                <form onSubmit={(e) => { e.preventDefault(); makeComment(data._id, comment) }}>
                    <input type="text" placeholder="add a comment" value={comment} onChange={(e) => { setComment(e.target.value); }} />
                </form>
                {/* <button className="btn waves-effect waves-light #42a5f5 blue lighten-1 right" onClick={() => makeComment(comment, data._id)}>post</button> */}
            </div>
        </div >
    )
}
