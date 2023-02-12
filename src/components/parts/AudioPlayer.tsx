import { useContext, useEffect, useRef, useState } from "react";
import { SongContext } from "../../context/songContext";
import { publicUrl } from "../../config/api";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';

import "./AudioPlayer.css";
type Props = {
  className: string;
};

const AudioPlayer = ({ className }: Props) => {
  const song = useContext(SongContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [seek, setSeek] = useState(0);
  const [seekMax, setSeekMax] = useState(100);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [durationTime, setDurationTime] = useState("0:00");

  const audioRef = useRef<HTMLAudioElement>(null);

  function playPause() {
    !isPlaying ? audioRef.current?.play() : audioRef.current?.pause();
    setIsPlaying((prev) => !prev);
  }

  function muteUnmute() {
    setIsMute((prev) => !prev);
  }

  function calclulateTime(secs: number) {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const resSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${resSeconds}`;
  }

  function displayInfo() {
    if (audioRef.current?.readyState && audioRef.current?.readyState > 0) {
      setDurationTime(calclulateTime(audioRef.current.duration));
      setSeekMax(audioRef.current.duration);
    }
  }

  function audioProgress() {
    if (audioRef.current) {
      setCurrentTime(calclulateTime(audioRef.current.currentTime));
      setSeek(audioRef.current.currentTime);
    }
  }

  function audioSeek(value: number) {
    if (audioRef.current) audioRef.current.currentTime = value;
    setSeek(value);
  }

  function changeVolume(value: number) {
    if (audioRef.current) audioRef.current.volume = value / 100;
    setVolume(value);
  }

  useEffect(() => {
    if (volume == 0) setIsMute(true);
    else setIsMute(false);
  }, [volume]);

  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      artist: song?.currentSong?.artist,
      title: song?.currentSong?.title,
      artwork: [
        {
          sizes: "64x64",
          src: publicUrl + "artworks/sary.png",
          type: "image/png",
        },
        {
          sizes: "128x128",
          src: publicUrl + "artworks/sary.png",
          type: "image/png",
        },
        {
          sizes: "192x192",
          src: publicUrl + "artworks/sary.png",
          type: "image/png",
        },
        {
          sizes: "256x256",
          src: publicUrl + "artworks/sary.png",
          type: "image/png",
        },
        {
          sizes: "384x384",
          src: publicUrl + "artworks/sary.png",
          type: "image/png",
        },
        {
          sizes: "512x512",
          src: publicUrl + "artworks/sary.png",
          type: "image/png",
        },
      ],
    });
  }

  return (
    <div className={`player-container | z-0 flex w-full bg-slate-900 p-4 md:p-1 ${className}`}>
      <audio
        className="hidden"
        preload="metadata"
        controls
        src={song?.currentSong?.url}
        ref={audioRef}
        onLoadedMetadata={displayInfo}
        onTimeUpdate={audioProgress}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        muted={isMute}
      />
      <div className="action flex justify-evenly items-center w-1/12 md:w-2/12">
        <button className="hidden md:flex" onClick={playPause}><SkipPreviousIcon/></button>
        <button className="flex text-3xl" onClick={playPause}>{isPlaying ? <PauseIcon fontSize="inherit"/> : <PlayArrowIcon fontSize="inherit"/>}</button>
        <button className="hidden md:flex" onClick={playPause}><SkipNextIcon/></button>
        <button className="hidden lg:flex" onClick={playPause}><ShuffleIcon/></button>
        <button className="hidden lg:flex"onClick={playPause}><RepeatOneIcon/></button>
      </div>
      <div className="duration flex w-10/12 md:w-8/12">
        <div id="current-time" className="w-2/12 lg:w-1/12 flex items-center justify-center text-sm">
          {currentTime}
        </div>
        <input
            type="range"
            name="seek-slider"
            id="seek-slider"
            className="w-8/12 lg:w-10/12"
            value={seek}
            onInput={(e) => {
              audioSeek(Number(e.currentTarget.value));
            }}
            max={seekMax}
          />
          
        <div id="duration-time" className="w-2/12 lg:w-1/12 flex items-center justify-center text-sm">
          {durationTime}
        </div>
      </div>
      <div className="volume-container hidden lg:flex w-1/12 relative  items-center justify-center">
        <div className="volume flex relative items-center justify-center">
          <div className="input-container">
            <input
              aria-orientation="vertical"
              type="range"
              name="volume-slider"
              className="volume-slider"
              value={volume}
              onInput={(e) => {
                changeVolume(Number(e.currentTarget.value));
              }}
              max="100"
            />
          </div>
          <button className="volume-btn" onClick={muteUnmute}>
            {!isMute ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </button>
        </div>
      </div>

      <div className="info w-1/12 md:w-4/12 flex">
        <div className="artwork hidden lg:w-1/5 lg:flex p-2 items-center justify-center">
          <img src={publicUrl+"artworks/sary.png"} className="w-2/5 aspect-square object-cover" alt=""/>
        </div>
        <div className="about hidden md:flex w-4/5 lg:w-3/5 flex-col p-1 justify-evenly">
          <div className="artist text-sm overflow-hidden whitespace-nowrap truncate">{song?.currentSong?.artist}</div>
          <div className="title overflow-hidden whitespace-nowrap truncate">{song?.currentSong?.title}</div>
        </div>
        <button className="action w-full md:w-1/5 flex items-center justify-center">
          <FavoriteBorderIcon />
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
