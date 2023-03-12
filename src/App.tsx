import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/userContext";
import { Suspense, lazy, useEffect, useState } from "react";
import ProtectedRoute from "./components/container/ProtectedRoute";
import UserAttributes from "./types/User";

import tokenService from "./services/TokenService";
import userService from "./services/user.service";
import { SongContext } from "./context/songContext";
import { SongAttributes } from "./types/Audio";
import { SongStateContext } from "./context/songStateContext";
import Loader from "./components/parts/Loader";

const HomeView = lazy(()=> import("./views/Home/HomeView"));
const SignupView = lazy(()=>import("./views/Signup/SignupView"));
const SigninView = lazy(()=>import("./views/Signin/SigninView"));
const Layout = lazy(()=>import("./components/parts/Layout"));
const FeedsView = lazy(()=>import("./views/Feed/FeedsView"));
const UploadSongView = lazy(()=>import("./views/UploadSong/UploadSongView"));
const NotFound = lazy(()=>import("./views/Error/NotFound"));

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
            <Suspense fallback={<Loader/>}>

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
            </Suspense>

          </Router>
          </SongStateContext.Provider>

        </SongContext.Provider>
      </UserContext.Provider>
  );
}

export default App;
