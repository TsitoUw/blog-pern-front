import { FormEvent, useContext, useState } from "react"
import { UserContext } from "../../context/userContext";
import authService from "../../services/auth.service";
import ReturnBtn from "../../components/shared/ReturnBtn";

const SigninView = () => {
  const [uid, setUid] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const user = useContext(UserContext)

  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    try {
      const response = await authService.signin(uid, password);
      user?.setCurrentUser(response.data.user)
    } catch (error) {
     console.log(error); 
    }

  }

  return (
    <div className="login | h-screen flex justify-center items-center">
      <ReturnBtn/>
      <div className="card-container">
        <div className="card-title">
          Sign in
        </div>
        <form className="card-content" onSubmit={submit}>
          <input type="text" className="input-text" placeholder="Identifient" value={uid} onChange={(e)=>setUid(e.target.value)}/>
          <input type="password" className="input-text" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <button className="button-main" type="submit">login</button>
        </form>
      </div>
    </div>
  )
}

export default SigninView