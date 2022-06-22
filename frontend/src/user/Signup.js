import react, { useState } from "react";
import axios from "axios";
import { withRouter, useHistory } from 'react-router-dom';
import Layout from "../core/Layout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Signup = () => {

  const history = useHistory();

  const [values, setValues] = useState({
      name: "",
      email: "",
      password: "",
      error: "",
      success: false
  })

  const {name, email, password, success, error} = values;

  const handleChange = (e) => {
      setValues({...values, error: false, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
        url: `http://localhost:8000/api/signup`,
        method: "POST",
        data: {name, email, password}
    }).then((response) => {
        console.log(response);
        setValues({...values, success: true, error: false,name: "", email: "", password: ""});
        history.push('/signin');
        toast.success(response.data.message);
    }).catch((error) => {
        console.log(error);
        setValues({...values, success: false, error: true});
        toast.error(error.response.data.error);
    })
  }

  const signupForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input type="text" name="name" className="form-control" value={name} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input type="email" name="email" className="form-control" value={email} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input type="password" name="password" className="form-control" value={password} onChange={handleChange} />
      </div>
      <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
    </form>
  )

  return(
    <Layout title="Signup" description= "Signup Description" className="container col-md-9 offset-md-2">
      <ToastContainer/>
      {signupForm()}
    </Layout>
  )
}

export default withRouter(Signup);