import react, { useState } from "react";
import axios from "axios";
import Layout from "../core/Layout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Redirect, useHistory } from "react-router-dom";
import { authenticate, isAuth } from "../core/helpers";

const Signin = () => {

    const history = useHistory();

    const [values, setValues] = useState({ 
        email: "",
        password: "",
        error: "",
        success: false
    })

    const {email, password, success, error} = values;

    const handleChange = (e) => {
        setValues({...values, error: false, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      axios({
        url: `http://localhost:8000/api/signin`,
        method: "POST",
        data: {email, password}
      }).then((response) => {
        authenticate(response, () => {
          console.log(response);
          setValues({...values, error: false, success: true});
          toast.success(response.data.message);
          isAuth() && isAuth().role == 1 ? history.push("/admin/dashboard") : history.push("/user/dashboard");
        })
      }).catch((error) => {
        console.log(error);
        setValues({...values, success: false, error: true});
        toast.error(error.response.data.error);
      }) 
    }

    const signinForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" name="email" className="form-control" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" name="password" className="form-control" onChange={handleChange}/>
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
    )

    return(
        <Layout title="Signin" description= "Signin Description" className="container col-md-9 offset-md-2">
            <ToastContainer/>
            {isAuth() && <Redirect to="/" />}
            {signinForm()}
        </Layout>
    )
}

export default Signin;