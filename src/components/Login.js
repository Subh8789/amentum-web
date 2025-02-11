"use client";
import { useRouter } from "next/navigation";

const Login = () => {

  const router = useRouter();

  const handleLogin = ()=>{
    router.push("/dropoff");
  }
  return (
    <div className='container'>
      {/* <Header /> */}
      <div className='login-container'>
        <div className="loginBox">
        <p>AMENTUM WEB SOLUTION</p>
          <img src="/logo.svg" alt="OIS Services Logo" />

          <form>
            <div className="inputGroup">
              <input
                type="email"
                className="input"
                name="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="inputGroup">
              <input
                type="password"
                className="input"
                name="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="rememberMe">
              <input type="checkbox" id="remember" className="checkbox" />
              <label htmlFor="remember" className="label">Remember me</label>
            </div>

            <button onClick={()=>handleLogin()} type="button" className="loginButton">LOGIN</button>
          </form>

          <p className="forgotPassword">
            Forgot password? <a href="#" className="link">Click here to reset.</a>
          </p>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default Login;
