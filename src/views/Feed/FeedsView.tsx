import authService from "../../services/auth.service";
import { UserContext } from "../../context/userContext";
import { useContext, useEffect, useState } from "react";
import PlayArrow from "@mui/icons-material/PlayArrowOutlined";
import songService from "../../services/song.service";
import { SongContext } from "../../context/songContext";
import { SongAttributes, SongMassive } from "../../types/Audio";
import defaultSongArtwork from "../../assets/default-artwork.png";
import { publicUrl } from "../../config/api";
import { Pause } from "@mui/icons-material";
import { SongStateContext } from "../../context/songStateContext";
import "./FeedsView.css"

const FeedsView = () => {
  const user = useContext(UserContext);
  const songc = useContext(SongContext);
  const state = useContext(SongStateContext);

  const [songs, setSongs] = useState<Array<SongMassive>>([]);

  function signout() {
    authService.signout();
    user?.setCurrentUser(null);
  }

  async function getSongs() {
    const songs = await songService.get();
    setSongs(songs);
  }

  useEffect(() => {
    getSongs();
  }, []);

  function playThis(song: SongMassive) {
    if(state?.isPlaying && song.filename === songc?.currentSong?.filename ){
      state.setIsPlaying(isPlaying => !isPlaying);
    }else{
      const payload: SongMassive = {
        artist: song.artist,
        title: song.title,
        artwork: song.artwork,
        filename: song.filename,
      };
      songc?.setCurrentSong(payload);
    }
  }

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="w-11/12 flex flex-col ">
<p className="w-full text-center text-neutral-600 m-3 text-sm">Due to vercel limitations we can't yet upload anything here 🥲. I'm trying to find another solution</p>
        <p className="p-2 text-neutral-400">Fresh songs</p>
        <div className="songs flex flex-col lg:flex-row justify-evenly max-w-full overflow-hidden overflow-x-auto items-center gap-3 lg:gap-5 p-2 md:pl-24">
          {songs.length > 0 
            ? songs.map((song, index) => {
                return ( 
                  <div className="song flex flex-row lg:flex-col justify-start lg:justify-evenly items-center w-full gap-5 lg:gap-2 rounded-md bg-slate-900 p-2 shadow-md lg:p-0 lg:shadow-none lg:bg-transparent" key={index}>
                    <div className="artwork">
                      <div className="ctn artwork w-24 lg:w-48 h-24 lg:h-48 aspect-square bg-emerald-500 rounded-xl relative flex items-center justify-center overflow-hidden">
                        <img
                          src={song.artwork ? publicUrl + "/artwork/" + song.artwork : defaultSongArtwork}
                          className="image | max-w-full w-full aspect-square object-cover"
                          alt={`${song.artist} - ${song.title} artwork`}
                          decoding="async"
                          loading="lazy"
                        />
                        <button
                          className="button | absolute lg:top-[38%] top-[20%] lg:left-[38%] left-[20%] text-5xl flex items-center justify-center bg-transparent hover:bg-rose-600 transition-all delay-200 hover:bg-opacity-70 hover:backdrop-blur-sm rounded-full p-1"
                          onClick={() => playThis(song)}
                          aria-label={`play-pause ${song.artist} ${song.title}`}
                        >
                          { (state?.isPlaying && song.filename === songc?.currentSong?.filename) ? <Pause fontSize="inherit"/> : <PlayArrow fontSize="inherit" />}
                        </button>
                      </div>
                    </div>
                    <div className="info flex flex-col w-full items-start justify-end lg:items-center">
                      <div className="title">
                        {song.title}
                      </div>
                      <div className="artist text-neutral-400 text-sm">
                        {song.artist}
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
        <p className="p-2 text-neutral-400">Your Playlists</p>
        <button name='logout' className="w-full" onClick={signout}>
          signout
        </button>
      </div>
    </div>
  );
};

export default FeedsView;
