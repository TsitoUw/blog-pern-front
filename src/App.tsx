import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/parts/Layout";
import SigninView from "./views/Signin/SigninView";
import ProtectedRoute from "./components/container/ProtectedRoute";
import { UserContext } from "./context/userContext";
import { useState } from "react";
import { UserAttributes } from "./types/User";
import NotFound from "./views/Error/NotFound";
import HomeView from "./views/Home/HomeView";
import FeedsView from "./views/Feed/FeedsView";

function App() {
  const [currentUser, setCurrentUser] = useState<UserAttributes | null>(null);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Router>
        <Routes>
          <Route path="/login" element={<ProtectedRoute child={<SigninView />} reversed={true}/>} />
          <Route path="/welcome" element={<ProtectedRoute child={<HomeView />} reversed={true}/>} />
          <Route path="/" element={<ProtectedRoute child={<Layout />} />}>
            <Route path="" element={<FeedsView />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
