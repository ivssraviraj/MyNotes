import React,{useState,useContext} from 'react'
import { useHistory } from 'react-router-dom';
import NoteContext from "../context/notes/noteContext";

const Login = () => {
    let history = useHistory();
    const context = useContext(NoteContext);
    const {setAuthToken} = context;

    const [credentials, setCredentials] = useState({email:"",password:""});

    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(credentials);
        const response = await fetch('http://localhost:5000/api/auth/login',{
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json',
            },
            body : JSON.stringify({email:credentials.email, password: credentials.password}) 
          });
          const json = await response.json();
          if(json.success){
            //setAuthToken(json.authToken); 
            history.push('/');
          } else{
              alert("please enter correct credentials")
          }
          console.log(json);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" value={credentials.email} onChange={onChange} id="email" name ="email" aria-describedby="emailHelp"/>
                    <div id="emailHelp" class ="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" value={credentials.password} onChange={onChange} class="form-control" name="password" id="password"/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
