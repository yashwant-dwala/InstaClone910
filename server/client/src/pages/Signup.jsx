import React,{useState} from "react";
import { Link ,useNavigate} from "react-router-dom";
import M from 'materialize-css'

const Signup = () => {
  const navigate=useNavigate()
  const [name, setName] = useState("")
  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")
  const PostData = () => {
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      })
    }).then(res => res.json())
      .then(data => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
          M.toast({ html: "invalid email address", classes: "#e53935 red darken-1" })
          return
        }
        if (data.error) {
          M.toast({html:data.error,classes:"#e53935 red darken-1"}) 
        }
        else {
          M.toast({ html: data.message, classes: "#66bb6a green lighten-1" })
          navigate('/signin')
        }
      }).catch(err => {
        console.log(err)
      })
  }

  
    return (
        <div>
        <div className="mycard">
        <div className="auth-card input-field" >
          <h2>Instagram</h2>
            <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
          <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button className="btn waves-effect waves-light #42a5f5 blue lighten-1" onClick={()=>PostData()}>Sign-up</button>
                    <h6>
                        <Link to="/signin">Already have an account?</Link>
                    </h6>
        </div>
      </div>
    </div>
    )
};
export default Signup;
