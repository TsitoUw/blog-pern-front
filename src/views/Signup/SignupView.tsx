import { FormEvent, useState } from "react";
import userService from "../../services/user.service";
import { Signup } from "../../types/User";
import ReturnBtn from "../../components/shared/ReturnBtn";
import { useNavigate } from "react-router-dom";

const SignupView = () => {
  const [name, setName] = useState<string>("");
  const [artistname, setArtistname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const navigate = useNavigate()

  async function submit(e: FormEvent) {
    e.preventDefault();
    const user: Signup = {
      name,
      artistname,
      username,
      email,
      password,
      passwordConfirmation,
    };

    const res = await userService.signup(user);
    if(res.data.user) navigate("/signin");
  }

  return (
      <div className="login | h-screen flex justify-center items-center">
      <ReturnBtn to="/welcome"/>
        <div className="card-container">
          <div className="card-title">Sign up</div>
          <form className="card-content" onSubmit={submit}>
            <input
              type="text"
              className="input-text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="input-text"
              placeholder="Artist name*"
              value={artistname}
              onChange={(e) => setArtistname(e.target.value)}
            />
            <input
              type="text"
              className="input-text"
              placeholder="Username*"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              className="input-text"
              placeholder="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="input-text"
              placeholder="Password*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="input-text"
              placeholder="Confirm password*"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <button className="button-main" type="submit">
              register
            </button>
          </form>
        </div>
      </div>
  );
};

export default SignupView;
