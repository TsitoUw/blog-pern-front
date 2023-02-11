import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/parts/Layout";
import SigninView from "./views/Signin/SigninView";
import ProtectedRoute from "./components/container/ProtectedRoute";
import { UserContext } from "./context/userContext";
import { useEffect, useState } from "react";
import UserAttributes from "./types/User";
import NotFound from "./views/Error/NotFound";
import HomeView from "./views/Home/HomeView";
import FeedsView from "./views/Feed/FeedsView";
import SignupView from "./views/Signup/SignupView";
import tokenService from "./services/TokenService";
import userService from "./services/user.service";

function App() {
  const [currentUser, setCurrentUser] = useState<UserAttributes | null>(null);
  // get user on reload
  async function getThisUser(){
    const uid = tokenService.getUser()?.uid;
    if(uid){
      const user = await userService.getUser(uid);
      if(user) setCurrentUser(user as unknown as UserAttributes)
      
    }
  }

  useEffect(()=>{
    getThisUser();
  },[]);
  
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Router>
        <Routes>
          <Route path="/signup" element={<ProtectedRoute child={<SignupView />} reversed={true}/>} />
          <Route path="/signin" element={<ProtectedRoute child={<SigninView />} reversed={true}/>} />
          <Route path="/welcome" element={<ProtectedRoute child={<HomeView />} reversed={true}/>} />
          <Route path="/" element={<Layout />}>
            <Route path="" element={<FeedsView />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
