import { useContext, useEffect, useRef, useState } from "react";
import { SongContext } from "../../context/songContext";
import { publicUrl } from "../../config/api";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 401ef41 (upload still loading data to ram)
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
<<<<<<< HEAD

import "./AudioPlayer.css";
import { SongAttributes } from "../../types/Audio";

=======
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';

import "./AudioPlayer.css";
>>>>>>> a715526 (audio player layout/ basic functionality)
=======

import "./AudioPlayer.css";
import { SongAttributes } from "../../types/Audio";

>>>>>>> 401ef41 (upload still loading data to ram)
type Props = {
  className: string;
};

const AudioPlayer = ({ className }: Props) => {
  const song = useContext(SongContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
<<<<<<< HEAD
<<<<<<< HEAD
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
=======
>>>>>>> a715526 (audio player layout/ basic functionality)
=======
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
>>>>>>> 401ef41 (upload still loading data to ram)
  const [seek, setSeek] = useState(0);
  const [seekMax, setSeekMax] = useState(100);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [durationTime, setDurationTime] = useState("0:00");

  const audioRef = useRef<HTMLAudioElement>(null);
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 401ef41 (upload still loading data to ram)
  const containerRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);
  let i = 0;
  const songList = [
    {
      artist: "AnomaLies x Kurapika",
      title: "Psycho",
      url: publicUrl + "someSong/2471676226772517.mp3",
    },
    {
      artist: "Tove lo",
      title: "Habits",
      url: publicUrl + "someSong/6041676222653564.mp3",
    },
    {
      artist: "Idk",
      title: "Some lofi",
      url: publicUrl + "someSong/music.mp3",
    },
  ];
<<<<<<< HEAD

  function playPause() {
    audioRef.current && !isPlaying ? audioRef.current?.play() : audioRef.current?.pause();
=======

  function playPause() {
    !isPlaying ? audioRef.current?.play() : audioRef.current?.pause();
>>>>>>> a715526 (audio player layout/ basic functionality)
=======

  function playPause() {
    audioRef.current && !isPlaying ? audioRef.current?.play() : audioRef.current?.pause();
>>>>>>> 401ef41 (upload still loading data to ram)
    setIsPlaying((prev) => !prev);
  }

  function muteUnmute() {
    setIsMute((prev) => !prev);
  }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 401ef41 (upload still loading data to ram)
  function loopUnloop() {
    setIsLooping((prev) => !prev);
  }

  function shuffleUnshuffle() {
    setIsShuffling((prev) => !prev);
  }

  function favoriteUnfavorite() {
    setIsFavorite((prev) => !prev);
  }
  function prevSong() {
    if (songList.length > 0 && index > 0) {
      setIndex((i) => i - 1);
      i--;
      console.log(index, i);

      audioRef.current?.pause();
      setIsPlaying(false);
      song?.setCurrentSong(songList[index] as SongAttributes);
      
      if(audioRef.current) audioRef.current.autoplay = true;
      setIsPlaying(true);
    }
  }
  function nextSong() {
    if (songList.length > 0 && index < songList.length) {
      setIndex((i) => i + 1);
      i++;
      console.log(index,i);
      audioRef.current?.pause();
      setIsPlaying(false);
      song?.setCurrentSong(songList[index] as SongAttributes);
      
      if(audioRef.current) audioRef.current.autoplay = true;
      setIsPlaying(true);
    }
  }
  /** */
<<<<<<< HEAD
=======
>>>>>>> a715526 (audio player layout/ basic functionality)
=======
>>>>>>> 401ef41 (upload still loading data to ram)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 401ef41 (upload still loading data to ram)
    if (containerRef.current) {
      containerRef.current.style.setProperty("--seek-before-width", (seek / seekMax) * 100 + "%");
    }

    if(audioRef.current?.ended && !isLooping) nextSong();
<<<<<<< HEAD
=======
>>>>>>> a715526 (audio player layout/ basic functionality)
=======
>>>>>>> 401ef41 (upload still loading data to ram)
  }

  function audioSeek(value: number) {
    if (audioRef.current) audioRef.current.currentTime = value;
    setSeek(value);
  }

  function changeVolume(value: number) {
<<<<<<< HEAD
<<<<<<< HEAD
    if (containerRef.current)
      containerRef.current.style.setProperty("--volume-before-width", (value / 100) * 100 + "%");
=======
>>>>>>> a715526 (audio player layout/ basic functionality)
=======
    if (containerRef.current)
      containerRef.current.style.setProperty("--volume-before-width", (value / 100) * 100 + "%");
>>>>>>> 401ef41 (upload still loading data to ram)
    if (audioRef.current) audioRef.current.volume = value / 100;
    setVolume(value);
  }

  useEffect(() => {
    if (volume == 0) setIsMute(true);
    else setIsMute(false);
  }, [volume]);

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 401ef41 (upload still loading data to ram)
  useEffect(()=>{
    if (containerRef.current)
      containerRef.current.style.setProperty("--volume-before-width", (volume / 100) * 100 + "%");
  },[])

<<<<<<< HEAD
=======
>>>>>>> a715526 (audio player layout/ basic functionality)
=======
>>>>>>> 401ef41 (upload still loading data to ram)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 401ef41 (upload still loading data to ram)
    navigator.mediaSession.setActionHandler("pause", () => {
      audioRef.current && audioRef.current?.pause();
      setIsPlaying(false);
    });
    navigator.mediaSession.setActionHandler("play", () => {
      audioRef.current && audioRef.current?.play();
      setIsPlaying(true);
    });
<<<<<<< HEAD
  }

  return (
    <div
      className={`player-container | z-0 flex w-full justify-center bg-slate-900 backdrop-blur-md bg-opacity-80 p-2 md:p-1 ${className}`}
      ref={containerRef}
    >
      <div className="flex w-full md:w-11/12">
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
          loop={isLooping}
        />
        <div className="action flex justify-evenly items-center w-1/12 md:w-2/12">
          <button className="hidden md:flex text-neutral-300" onClick={prevSong}>
            <SkipPreviousIcon />
          </button>
          <button className="flex text-3xl text-neutral-300" onClick={playPause}>
            {isPlaying ? <PauseIcon fontSize="inherit" /> : <PlayArrowIcon fontSize="inherit" />}
          </button>
          <button className="hidden md:flex" onClick={nextSong}>
            <SkipNextIcon />
          </button>
          <button className="hidden lg:flex" onClick={shuffleUnshuffle}>
            <ShuffleIcon className={isShuffling ? "text-rose-600" : "text-neutral-300"} />
          </button>
          <button className="hidden lg:flex" onClick={loopUnloop}>
            <RepeatOneIcon className={isLooping ? "text-rose-600" : "text-neutral-300"} />
          </button>
        </div>
        <div className="duration hidden md:flex w-10/12 md:w-6/12 lg:w-9/12">
          <div id="current-time" className="w-2/12 lg:w-1/12 flex items-center justify-center text-sm">
            {currentTime}
          </div>
          <input
=======
=======
>>>>>>> 401ef41 (upload still loading data to ram)
  }

  return (
    <div
      className={`player-container | z-0 flex w-full justify-center bg-slate-900 backdrop-blur-md bg-opacity-80 p-2 md:p-1 ${className}`}
      ref={containerRef}
    >
      <div className="flex w-full md:w-11/12">
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
          loop={isLooping}
        />
        <div className="action flex justify-evenly items-center w-1/12 md:w-2/12">
          <button className="hidden md:flex text-neutral-300" onClick={prevSong}>
            <SkipPreviousIcon />
          </button>
          <button className="flex text-3xl text-neutral-300" onClick={playPause}>
            {isPlaying ? <PauseIcon fontSize="inherit" /> : <PlayArrowIcon fontSize="inherit" />}
          </button>
          <button className="hidden md:flex" onClick={nextSong}>
            <SkipNextIcon />
          </button>
          <button className="hidden lg:flex" onClick={shuffleUnshuffle}>
            <ShuffleIcon className={isShuffling ? "text-rose-600" : "text-neutral-300"} />
          </button>
          <button className="hidden lg:flex" onClick={loopUnloop}>
            <RepeatOneIcon className={isLooping ? "text-rose-600" : "text-neutral-300"} />
          </button>
        </div>
<<<<<<< HEAD
        <input
>>>>>>> a715526 (audio player layout/ basic functionality)
=======
        <div className="duration hidden md:flex w-10/12 md:w-6/12 lg:w-9/12">
          <div id="current-time" className="w-2/12 lg:w-1/12 flex items-center justify-center text-sm">
            {currentTime}
          </div>
          <input
>>>>>>> 401ef41 (upload still loading data to ram)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 401ef41 (upload still loading data to ram)

          <div id="duration-time" className="w-2/12 lg:w-1/12 flex items-center justify-center text-sm">
            {durationTime}
          </div>
<<<<<<< HEAD
        </div>
        <div className="volume-container hidden lg:flex w-10 relative  items-center justify-center">
          <div className="volume flex relative items-center justify-center">
            <div className="input-container ">
              <input
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
            <button className="volume-btn text-neutral-300 flex items-center justify-center" onClick={muteUnmute}>
              {!isMute ? <VolumeUpIcon fontSize="small"/> : <VolumeOffIcon fontSize="small"/>}
            </button>
          </div>
        </div>

        <div className="info w-full md:w-4/12 lg:w-3/12 flex">
          <div className="artwork hidden w-10 lg:flex items-center justify-center">
            <img
              src={publicUrl + "artworks/sary.png"}
              className="w-full aspect-square object-cover rounded-sm"
            />
          </div>
          <div className="about  md:flex w-4/5 lg:w-8/12 flex-col p-1 px-3 justify-evenly">
            <div className="artist text-sm overflow-hidden whitespace-nowrap truncate text-neutral-300">
              {song?.currentSong?.artist}
            </div>
            <div className="title overflow-hidden whitespace-nowrap truncate">{song?.currentSong?.title}</div>
          </div>
          <button className="action w-1/5 md:w-max flex items-center justify-center" onClick={favoriteUnfavorite}>
            {isFavorite ? (
              <FavoriteIcon className="mx-2 text-rose-600" />
            ) : (
              <FavoriteBorderIcon className="mx-2 text-neutral-300" />
            )}
          </button>
        </div>
      </div>
=======
          
        <div id="duration-time" className="w-2/12 lg:w-1/12 flex items-center justify-center text-sm">
          {durationTime}
=======
>>>>>>> 401ef41 (upload still loading data to ram)
        </div>
        <div className="volume-container hidden lg:flex w-10 relative  items-center justify-center">
          <div className="volume flex relative items-center justify-center">
            <div className="input-container ">
              <input
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
            <button className="volume-btn text-neutral-300 flex items-center justify-center" onClick={muteUnmute}>
              {!isMute ? <VolumeUpIcon fontSize="small"/> : <VolumeOffIcon fontSize="small"/>}
            </button>
          </div>
        </div>

        <div className="info w-full md:w-4/12 lg:w-3/12 flex">
          <div className="artwork hidden w-10 lg:flex items-center justify-center">
            <img
              src={publicUrl + "artworks/sary.png"}
              className="w-full aspect-square object-cover rounded-sm"
            />
          </div>
          <div className="about  md:flex w-4/5 lg:w-8/12 flex-col p-1 px-3 justify-evenly">
            <div className="artist text-sm overflow-hidden whitespace-nowrap truncate text-neutral-300">
              {song?.currentSong?.artist}
            </div>
            <div className="title overflow-hidden whitespace-nowrap truncate">{song?.currentSong?.title}</div>
          </div>
          <button className="action w-1/5 md:w-max flex items-center justify-center" onClick={favoriteUnfavorite}>
            {isFavorite ? (
              <FavoriteIcon className="mx-2 text-rose-600" />
            ) : (
              <FavoriteBorderIcon className="mx-2 text-neutral-300" />
            )}
          </button>
        </div>
      </div>
<<<<<<< HEAD

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
>>>>>>> a715526 (audio player layout/ basic functionality)
=======
>>>>>>> 401ef41 (upload still loading data to ram)
    </div>
  );
};

export default AudioPlayer;
