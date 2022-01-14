import React, { useState,useEffect } from "react"
import { Link,useNavigate } from "react-router-dom"
import M from "materialize-css"




const CreatePost = () => {

    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

    // ease the time taken in all async operations
    useEffect(() => {
        if (url) {
            // async operation
            fetch("/createpost", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":"Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title,
                    body,
                    pic:url,
                })
            }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({html:data.error,classes:"#e53935 red darken-1"}) 
                }
                else {
                    M.toast({ html: "Created Post Successfully!", classes: "#66bb6a green lighten-1" })
                    navigate('/')
                }
            }).catch(err => {
                console.log(err)
            })
        }    
    },[url]) // dependence array useEffect comes into picture if any element of array changes


    const PostDetails = () => {

        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "insta-clone")
        data.append("cloud_name", "xenotoxin")
        

        // take time //async
        fetch("https://api.cloudinary.com/v1_1/xenotoxin/image/upload",{
            method: "post",
            body:data
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
            setUrl(data.url) //async operation take time
            })
            .catch(err => {
                console.log(err)
            })        
    }

    return (
        <div className="card input-filed">
            <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input type="text" placeholder="body" value={body} onChange={(e) => setBody(e.target.value)}/>
            <div className="file-field input-field">
                <div className="btn #1976d2 blue darken-1">
                    <span>Upload image</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input type="text" className="file-path validate" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #1976d2 blue darken-1" onClick={()=>PostDetails()}>Submit Post</button>
        </div>
    )
}
export default CreatePost