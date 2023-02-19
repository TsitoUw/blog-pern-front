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
import { SongContext } from "./context/songContext";
import { SongAttributes } from "./types/Audio";
import { publicUrl } from "./config/api";
import UploadSongView from "./views/UploadSong/UploadSongView";

function App() {
  const [currentUser, setCurrentUser] = useState<UserAttributes | null>(null);
  const [currentSong, setCurrentSong] = useState<SongAttributes | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // get user on reload
  async function getThisUser() {
    const uid = tokenService.getUser()?.uid;
    if (uid) {
      try {
        const user = await userService.getUser(uid);
        if (user) setCurrentUser(user as unknown as UserAttributes);
      } catch (err) {}
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setCurrentSong({
      artist: "Some one",
      title: "Take this to school, and listen",
      url: publicUrl + "someSong/music.mp3",
    });
    getThisUser();
  }, []);

  return (
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <SongContext.Provider value={{ currentSong, setCurrentSong }}>
          <Router>
            <Routes>
              <Route path="/signup" element={<ProtectedRoute reversed={true} />}>
                <Route path="" element={<SignupView />} />
              </Route>
              <Route path="/signin" element={<ProtectedRoute reversed={true} />}>
                <Route path="" element={<SigninView />} />
              </Route>
              <Route path="/welcome" element={<ProtectedRoute reversed={true} />}>
                <Route path="" element={<HomeView />} />
              </Route>

              <Route path="/" element={<Layout />}>
                <Route path="" element={<FeedsView />} />
                <Route path="/:user" element={<ProtectedRoute />}>
                  <Route path="" element={<UploadSongView />} />
                  <Route path="upload" element={<UploadSongView />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </SongContext.Provider>
      </UserContext.Provider>
  );
}

export default App;
