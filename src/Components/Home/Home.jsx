import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../Firebase/Firebase.init";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useState } from "react";
const auth = getAuth(app);
const Home = () => {
    const [user, setUser]= useState(null)
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const handleShow = () => {
      setShowPassword(true)
    }
    const handleHide =() => {
      setShowPassword(false)
    }
  const handleSubmit = (e) => {
    e.preventDefault();
    const from = e.target;
    const name = from.name.value;
    const email = from.email.value;
    const phone = from.phone.value;
    const password = from.password.value;
    setError('')
    if(password.length < 6) {
      setError('Password must be 6 characters long')
      return
    }else if(!/[A-Z]/.test(password)){
      setError('Please enter one uppercase letter')
      return
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        if (user) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Account create Success",
            showConfirmButton: false,
            timer: 1500,
          });
          
        }
        setUser(user)
      })
      .catch((err) => {
        if(err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${err.message}`,
                footer: '<a href="#">Why do I have this issue?</a>'
              });
        }
      });
      
  };
  console.log(user?.email)
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now! </h1>
          <p className="py-6">
           {user?.email}
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>
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
                <span className="label-text">Phone</span>
              </label>
              <input
                name="phone"
                type="text"
                placeholder="phone"
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
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="input input-bordered"
                required
              />
             
              { showPassword ? 
              <span>Show</span>
              :
              <button>Hide</button>
              }
              <label className="label">
                <Link to="/login" className="label-text-alt link link-hover">
                  Have an account? 
                </Link>
              </label>
              <p className="text-red-500">{error}</p>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">SignIn</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
