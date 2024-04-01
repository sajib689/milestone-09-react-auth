import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../Firebase/Firebase.init";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useState } from "react";
const auth = getAuth(app);
const Login = () => {
     const [user, setUser]= useState(null)
    const handleLogin = e => {
        
        e.preventDefault();
        const form = e.target
        const email = form.email.value 
        const password = form.password.value
        signInWithEmailAndPassword(auth, email, password)
        .then ( result => {
            const user = result.user
            if(user){
                if (user) {
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Login Success",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
            }
            setUser(user)
        })
        .catch( err => {
            if (err) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${err.message}`,
                    footer: '<a href="#">Why do I have this issue?</a>'
                  });
            }
        })
    }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
          {user?.email}
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
              name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
              name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <Link to="/" className="label-text-alt link link-hover">
                Doy want Register?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
