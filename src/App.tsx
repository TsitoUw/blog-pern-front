import { RouterProvider } from "react-router-dom";
import { UserContext } from "./context/userContext";
import { Suspense, useEffect, useState } from "react";
import UserAttributes from "./types/User";

import tokenService from "./services/TokenService";
import userService from "./services/user.service";
import { SongContext } from "./context/songContext";
import { SongAttributes, SongMassive } from "./types/Audio";
import { SongStateContext } from "./context/songStateContext";
import Loader from "./components/parts/Loader";

import routes from "./routes";
import TokenService from "./services/TokenService";


function App() {
  const [currentUser, setCurrentUser] = useState<UserAttributes | null>(null);
  const [currentSong, setCurrentSong] = useState<SongAttributes |SongMassive| null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [lastListened, setLastListened] = useState<SongAttributes |SongMassive| null>(null);

  // get user on reload
  async function getThisUser() {
    const uid = tokenService.getUser()?.uid;
    if (uid) {
      try {
        const data = await userService.getUser(uid);
        if (data) setCurrentUser(data.data.user as unknown as UserAttributes);
      } catch (err) {
        if (err && (err as any).response.status && (err as any).response.status === 404) {
          tokenService.removeUser();
          setCurrentUser(null);
        } else {
          console.log(err);
        }
      }
    }
  }

  useEffect(() => {
    getThisUser();
  },[]);


  useEffect(() => {
    if (currentSong) {
      setLastListened(currentSong);
      TokenService.updateLastListened(currentSong as SongAttributes);
    }
  }, [currentSong]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <SongContext.Provider value={{ currentSong, setCurrentSong }}>
        <SongStateContext.Provider value={{ isPlaying, setIsPlaying }}>
          <Suspense fallback={<Loader />}>
            <RouterProvider router={routes} />
          </Suspense>
        </SongStateContext.Provider>
      </SongContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
