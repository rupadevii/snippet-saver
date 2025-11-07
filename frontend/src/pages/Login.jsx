import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL;
  const isFormValid = !errors.email && !errors.password;
  const emailValidator = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  function handleChange(e) {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value.trim()})

    let error = ""
    
    if(name === "email" && !emailValidator.test(value.trim())){
      error = "Enter valid email!"
    }
    
    if(name === "password" && value.trim().length<8){
        error = "Enter valid password!";
    }

    setErrors(prev => ({...prev, [name]: error}));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    let submitErrors = {};
    
    Object.entries(formData).forEach(([key, value]) => {
      if(value.trim() === "") submitErrors[key] = `${key[0].toUpperCase() + key.slice(1)} is required!`
    })

    setErrors(submitErrors);

    if (formData.email && formData.password) {
      try {
        const res = await fetch(`${URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        console.log(data)
        if (res.ok) {
          if (data.token) {
            localStorage.setItem("token", data.token);
          }
          setTimeout(() => {
            navigate("/snippets");
          }, 1000);
        }
        else{
          setMsg(data.msg)
        }
      } catch(error) {
        setMsg("Login failed. Try again!");
        console.log(error);
      }
    }
  };

  // console.log(msg)

  return (
    <main className="flex justify-center items-center pt-24">
      <div className="rounded-3xl px-5 py-14 bg-stone-900 text-white shadow-2xl text-center w-[300px] md:w-[400px] lg:w-[450px]">
        <h2 className="text-2xl mb-7">
          Save your code snippets here. <br />
          Access them easily. <br />
          Anytime.
        </h2>
        <form
          noValidate
          className="flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
        >
          {msg && <p className="text-red-600">{msg}</p>}
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            className="m-2 p-3 w-75 border border-zinc-500 rounded-sm"
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-600 self-start ml-14">{errors.email}</p>
          )}

          <input
            name="password"
            type="password"
            placeholder="Enter password"
            value={formData.password}
            className="m-2 p-3 w-75 border border-zinc-500 rounded-sm"
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-600 self-start ml-14">{errors.password}</p>
          )}

          <p className="my-3 text-zinc-400">
            Don't have an account?{" "}
            <span className="text-purple-900 underline hover:text-white">
              <Link to="/register">Sign Up</Link>
            </span>{" "}
            now.
          </p>
          <button
            type="submit"
            className="bg-purple-900 px-3 py-2 rounded-xl mt-2 cursor-pointer hover:bg-purple-800 disabled:bg-purple-950 disabled:cursor-not-allowed"
            disabled={!isFormValid}
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
