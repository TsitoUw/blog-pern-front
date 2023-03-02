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
import UploadSongView from "./views/UploadSong/UploadSongView";
import { SongStateContext } from "./context/songStateContext";

function App() {
  const [currentUser, setCurrentUser] = useState<UserAttributes | null>(null);
  const [currentSong, setCurrentSong] = useState<SongAttributes | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  // get user on reload
  async function getThisUser() {
    const uid = tokenService.getUser()?.uid;
    if (uid) {
      try {
        const data = await userService.getUser(uid);
        if (data) setCurrentUser(data.data.user as unknown as UserAttributes);
      } catch (err) {
        if(err && (err as any).response.status && (err as any).response.status === 404){
          tokenService.removeUser()
          setCurrentUser(null)
        }else{
          console.log(err)
        }
      }
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getThisUser();
    // setCurrentSong({
    //   artist: "Some one",
    //   title: "Take this to school, and listen",
    //   fileName: "7721677131866617.mp3",
    //   artwork: "171677131867174.jpg"
    // });
  },[]);

  return (
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <SongContext.Provider value={{ currentSong, setCurrentSong }}>
          <SongStateContext.Provider value={{isPlaying, setIsPlaying}}>
            
          <Router>
            <Routes>
              <Route path="/welcome" element={<ProtectedRoute reversed={true} />}>
                <Route path="" element={<HomeView />} />
              </Route>
              <Route path="/signup" element={<ProtectedRoute reversed={true} />}>
                <Route path="" element={<SignupView />} />
              </Route>
              <Route path="/signin" element={<ProtectedRoute reversed={true} />}>
                <Route path="" element={<SigninView />} />
              </Route>

              <Route path="/" element={<Layout />}>
                <Route path="" element={<FeedsView />} />
                <Route path="/:user">
                  <Route path="" element={<UploadSongView />} />
                  <Route path="upload" element={<UploadSongView />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          </SongStateContext.Provider>

        </SongContext.Provider>
      </UserContext.Provider>
  );
}

export default App;
