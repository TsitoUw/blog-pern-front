import authService from "../../services/auth.service";
import { UserContext } from "../../context/userContext";
import { useContext, useEffect, useState } from "react";
import PlayArrow from "@mui/icons-material/PlayArrow";
import songService from "../../services/song.service";
import { SongContext } from "../../context/songContext";
import { SongAttributes, SongMassive } from "../../types/Audio";

const FeedsView = () => {
  const user = useContext(UserContext);
  const songc = useContext(SongContext);

  const [songs, setSongs] = useState<Array<SongMassive>>([])

  function signout() {
    authService.signout();
    user?.setCurrentUser(null);
  }

  async function getSongs(){
    const songs = await songService.get()
    setSongs(songs);
    console.log(songs)
  }

  useEffect(()=>{
    getSongs();
  },[])

  function playThis(song:SongMassive){
   const payload:SongAttributes = {
    artist:song.artist,
    title:song.title,
    artwork:song.artwork,
    filename:song.filename
   }
   songc?.setCurrentSong(payload)
  }

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="w-11/12 flex flex-col">
        <p className="p-2 text-yellow-200 text-center">I'm still working on other functionality, this feeds isn't working yet</p>
        <p className="p-2 text-neutral-400">New artists</p>
        {/* <div className="new-artist flex justify-center gap-5 p-2">
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
        </div> */}
        <p className="p-2 text-neutral-400">Most liked songs</p>
        <div className="songs flex flex-col justify-center gap-5 p-2">
          {songs.length > 0 ? songs.map((song,index)=>{
            return(
              <div className="song" key={index}>
                {song.artist} - {song.title} 
                <button onClick={()=>playThis(song)}>P</button>
              </div>
            )
          }):null}
          {/* <div className="song | flex flex-col items-center justify-center p-1">
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
          </div> */}
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
      <button className="w-full" onClick={signout}>signout</button>
      </div>
    </div>
  );
};

export default FeedsView;
