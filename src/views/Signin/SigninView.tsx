import { FormEvent, useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import authService from "../../services/auth.service";

const SigninView = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const user = useContext(UserContext)

  const navigate = useNavigate()

  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    // user?.setCurrentUser({email, password })
    const response = await authService.signin(email, password);
    console.log(response);  
  }

  return (
    <div className="login | h-screen flex justify-center items-center">
      <div className="card-container">
        <div className="card-title">
          Sign in
        </div>
        <form className="card-content" onSubmit={submit}>
          <input type="text" className="input-text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" className="input-text" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <button className="button-main" type="submit">sign in</button>
        </form>
      </div>
    </div>
  )
}

export default SigninView