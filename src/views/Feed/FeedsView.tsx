import authService from "../../services/auth.service";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import PlayArrow from "@mui/icons-material/PlayArrow";

const FeedsView = () => {
  const user = useContext(UserContext);

  function signout() {
    authService.signout();
    user?.setCurrentUser(null);
  }

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="w-11/12 flex flex-col">
        <p className="p-2 text-yellow-200 text-center">I'm still working on other functionality, this feeds isn't working yet</p>
        <p className="p-2 text-neutral-400">New artists</p>
        <div className="new-artist flex justify-center gap-5 p-2">
          <div className="artist | flex flex-col items-center justify-center p-1">
            <div className="profile-pic w-52 h-52 aspect-square bg-emerald-500 rounded-md"></div>
            <div className="name">name</div>
          </div>
          <div className="artist | flex flex-col items-center justify-center p-1">
            <div className="profile-pic w-52 h-52 aspect-square bg-emerald-500 rounded-md"></div>
            <div className="name">name</div>
          </div>
          <div className="artist | flex flex-col items-center justify-center p-1">
            <div className="profile-pic w-52 h-52 aspect-square bg-emerald-500 rounded-md"></div>
            <div className="name">name</div>
          </div>
          <div className="artist | flex flex-col items-center justify-center p-1">
            <div className="profile-pic w-52 h-52 aspect-square bg-emerald-500 rounded-md"></div>
            <div className="name">name</div>
          </div>
          <div className="artist | flex flex-col items-center justify-center p-1">
            <div className="profile-pic w-52 h-52 aspect-square bg-emerald-500 rounded-md"></div>
            <div className="name">name</div>
          </div>
        </div>
        <p className="p-2 text-neutral-400">Most liked songs</p>
        <div className="songs flex justify-center gap-5 p-2">
          <div className="song | flex flex-col items-center justify-center p-1">
            <div className="artwork w-52 h-52 aspect-square bg-emerald-500 rounded-3xl relative flex items-center justify-center">
              <div className="absolute top-[30%] left-[30%] text-8xl flex items-center justify-center">
                <PlayArrow fontSize="inherit" />
              </div>
            </div>
            <div className="name">name</div>
          </div>
          <div className="song | flex flex-col items-center justify-center p-1">
            <div className="artwork w-52 h-52 aspect-square bg-emerald-500 rounded-3xl relative flex items-center justify-center">
              <div className="absolute top-[30%] left-[30%] text-8xl flex items-center justify-center">
                <PlayArrow fontSize="inherit" />
              </div>
            </div>
            <div className="name">name</div>
          </div>
          <div className="song | flex flex-col items-center justify-center p-1">
            <div className="artwork w-52 h-52 aspect-square bg-emerald-500 rounded-3xl relative flex items-center justify-center">
              <div className="absolute top-[30%] left-[30%] text-8xl flex items-center justify-center">
                <PlayArrow fontSize="inherit" />
              </div>
            </div>
            <div className="name">name</div>
          </div>
          <div className="song | flex flex-col items-center justify-center p-1">
            <div className="artwork w-52 h-52 aspect-square bg-emerald-500 rounded-3xl relative flex items-center justify-center">
              <div className="absolute top-[30%] left-[30%] text-8xl flex items-center justify-center">
                <PlayArrow fontSize="inherit" />
              </div>
            </div>
            <div className="name">name</div>
          </div>
          <div className="song | flex flex-col items-center justify-center p-1">
            <div className="artwork w-52 h-52 aspect-square bg-emerald-500 rounded-3xl relative flex items-center justify-center">
              <div className="absolute top-[30%] left-[30%] text-8xl flex items-center justify-center">
                <PlayArrow fontSize="inherit" />
              </div>
            </div>
            <div className="name">name</div>
          </div>
        </div>
        <p className="p-2 text-neutral-400">Your Playlists</p>
        <div className="playlist p-2">
          <div className="card-container">
            <div className="card-content">
              <p>song 1</p>
              <p>song 2</p>
            </div>
          </div>
        </div>
      <button onClick={signout}>signout</button>
      </div>
    </div>
  );
};

export default FeedsView;
