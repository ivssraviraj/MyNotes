import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';

const SignUp = () => {
    let history = useHistory();
    const [userDetails, setuserDetails] = useState({name:'',email:'',password:'',cpassword:''});

    const onChange = (e)=>{
        //setCredentials({...credentials,[e.target.name]:e.target.value});
        setuserDetails({...userDetails,[e.target.id]:e.target.value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(userDetails);
        if(userDetails.password !== userDetails.cpassword){
            alert("Passwords do not match!!!");
            return;
        }
        const response = await fetch('http://localhost:5000/api/auth/createUser',{
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json',
            },
            body : JSON.stringify({name:userDetails.name, email:userDetails.email, password: userDetails.password}) 
          });
          const json = await response.json();
          if(json.success){
            //setAuthToken(json.authToken); 
            history.push('/');
          } else{
              alert(json.error);
          }
          console.log(json);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" onChange={onChange} value={userDetails.name} required/>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} value={userDetails.email} required/>
                    <div id="emailHelp" class ="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" onChange={onChange} value={userDetails.password} minLength={5} required/>
                </div>
                <div class="mb-3">
                    <label for="cpassword" class="form-label">Confirm Password</label>
                    <input type="password" class="form-control" id="cpassword" onChange={onChange} value={userDetails.cpassword} minLength={5} required/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
