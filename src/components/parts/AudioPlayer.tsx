import { useContext, useEffect, useRef, useState } from "react";
import { SongContext } from "../../context/songContext";
import { baseUrl, publicUrl } from "../../config/api";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import defaultSongArtwork from "../../assets/default-artwork.png";

import "./AudioPlayer.css";
import { SongAttributes } from "../../types/Audio";
import { SongStateContext } from "../../context/songStateContext";

type Props = {
  className: string;
};

const AudioPlayer = ({ className }: Props) => {
  const song = useContext(SongContext);
  const state = useContext(SongStateContext);

  const [isMute, setIsMute] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [seek, setSeek] = useState(0);
  const [seekMax, setSeekMax] = useState(100);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [durationTime, setDurationTime] = useState("0:00");

  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);
  let i = 0;
  const songList: Array<SongAttributes> = [
    {
      artist: "AnomaLies x Kurapika",
      title: "Psycho",
      filename: "2471676226772517.mp3",
      artwork: null,
    },
  ];

  function playPause() {
    audioRef.current && !state?.isPlaying ? audioRef.current?.play() : audioRef.current?.pause();
    if(state) state.setIsPlaying(prev => !prev);
  }

  function muteUnmute() {
    setIsMute((prev) => !prev);
  }

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
      if(state) state.setIsPlaying(false);

      song?.setCurrentSong(songList[index] as SongAttributes);

      if (audioRef.current) audioRef.current.autoplay = true;
      if(state) state.setIsPlaying(true);
    }
  }
  function nextSong() {
    if (songList.length > 0 && index < songList.length) {
      setIndex((i) => i + 1);
      i++;
      console.log(index, i);
      audioRef.current?.pause();
      if(state) state.setIsPlaying(false);

      song?.setCurrentSong(songList[index] as SongAttributes);

      if (audioRef.current) audioRef.current.autoplay = true;
      if(state) state.setIsPlaying(true);

    }
  }
  /** */
  function calclulateTime(secs: number) {
    const minutes = Math.round(secs / 60);
    const seconds = Math.round(secs % 60);
    const resSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${resSeconds}`;
  }

  function displayInfo() {
    if (audioRef.current?.readyState && audioRef.current?.readyState > 0) {
      setDurationTime(calclulateTime(audioRef.current.duration));
      setSeekMax(audioRef.current.duration);
    }
    if (audioRef.current)
      audioRef.current.onloadedmetadata = () => {
        if (audioRef.current) setSeekMax(audioRef.current.duration);
      };
  }

  if (audioRef.current) {
    audioRef.current.onprogress = () => {
      if (audioRef.current) {
        setCurrentTime(calclulateTime(audioRef.current.currentTime));
        setSeek(Math.round(audioRef.current.currentTime));
      }
      if (containerRef.current) {
        containerRef.current.style.setProperty("--seek-before-width", (seek / seekMax) * 100 + "%");
      }
    };
  }

  function audioProgress() {
    if (audioRef.current) {
      setCurrentTime(calclulateTime(audioRef.current.currentTime));
      setSeek(Math.round(audioRef.current.currentTime));
    }
    if (containerRef.current) {
      containerRef.current.style.setProperty("--seek-before-width", (seek / seekMax) * 100 + "%");
    }

    // if (audioRef.current?.ended && !isLooping) nextSong();
  }

  function audioSeek(value: number) {
    if (audioRef.current) audioRef.current.currentTime = value;
    setSeek(Math.round(value));
  }

  function changeVolume(value: number) {
    if (containerRef.current)
      containerRef.current.style.setProperty("--volume-before-width", (value / 100) * 100 + "%");
    if (audioRef.current) audioRef.current.volume = value / 100;
    setVolume(value);
  }

  useEffect(() => {
    if (volume == 0) setIsMute(true);
    else setIsMute(false);
  }, [volume]);

  useEffect(() => {
    if(state) state.setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.autoplay = true;
    }
    if(state) state.setIsPlaying(true);

    if ("mediaSession" in navigator) {
      console.log('media session here')
      navigator.mediaSession.metadata = new MediaMetadata({
        artist: song?.currentSong?.artist,
        title: song?.currentSong?.title,
        album: 'playlist 0',
        artwork: [
          {
            src:`${publicUrl}artwork/${song?.currentSong?.artwork}`,
            sizes:"192x192",
            type:"image/png"
          },
          {
            src:`${publicUrl}artwork/${song?.currentSong?.artwork}`,
            sizes:"512x512",
            type:"image/png"
          }
        ],
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        audioRef.current && audioRef.current?.pause();
        if(state) state.setIsPlaying(false);
  
      });
      navigator.mediaSession.setActionHandler("play", () => {
        audioRef.current && audioRef.current?.play();
        if(state) state.setIsPlaying(true);
      });
    }
  
  }, [song?.currentSong]);

  useEffect(()=>{
    if(state){
      if(state.isPlaying) audioRef.current?.play();
      if(!state.isPlaying) audioRef.current?.pause();
    }
  },[state])

  useEffect(() => {
    if (containerRef.current)
      containerRef.current.style.setProperty("--volume-before-width", (volume / 100) * 100 + "%");
    if(state) state.setIsPlaying(false);
  }, []);

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
          src={song?.currentSong?.filename ? baseUrl + "songs/audio/" + song?.currentSong?.filename : ""}
          ref={audioRef}
          onLoadedMetadata={displayInfo}
          onTimeUpdate={audioProgress}
          onPlay={() => {
            if(state) state.setIsPlaying(true);
          }}
          onPause={() => {
            if(state) state.setIsPlaying(false);
          }}
          muted={isMute}
          loop={isLooping}
          aria-hidden='true'
        />
        <div className="action flex justify-evenly items-center w-1/12 md:w-2/12">
          <button className="hidden md:flex text-neutral-300" onClick={prevSong} aria-label="previous controller">
            <SkipPreviousIcon />
          </button>
          <button className="flex text-3xl text-neutral-300" onClick={playPause} aria-label="play-pause controller">
            {state?.isPlaying ? <PauseIcon fontSize="inherit" /> : <PlayArrowIcon fontSize="inherit" />}
          </button>
          <button className="hidden md:flex" onClick={nextSong} aria-label="next controller">
            <SkipNextIcon />
          </button>
          <button className="hidden lg:flex" onClick={shuffleUnshuffle} aria-label="shuffle controller">
            <ShuffleIcon className={isShuffling ? "text-rose-600" : "text-neutral-300"} />
          </button>
          <button className="hidden lg:flex" onClick={loopUnloop} aria-label="repeat controller">
            <RepeatOneIcon className={isLooping ? "text-rose-600" : "text-neutral-300"} />
          </button>
        </div>
        <div className="duration hidden md:flex w-10/12 md:w-6/12 lg:w-9/12">
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
            aria-label="seek audio controller"
          />

          <div id="duration-time" className="w-2/12 lg:w-1/12 flex items-center justify-center text-sm">
            {durationTime}
          </div>
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
                aria-label="seek volume controller"
              />
            </div>
            <button className="volume-btn text-neutral-300 flex items-center justify-center" onClick={muteUnmute} aria-label="mute-unmute">
              {!isMute ? <VolumeUpIcon fontSize="small" /> : <VolumeOffIcon fontSize="small" />}
            </button>
          </div>
        </div>

        <div className="info w-full md:w-4/12 lg:w-3/12 flex">
          <div className="artwork hidden w-10 lg:flex items-center justify-center">
            <img
              src={
                song?.currentSong?.artwork ? publicUrl + "/artwork/" + song?.currentSong?.artwork : defaultSongArtwork
              }
              className="max-w-full w-full aspect-square object-cover rounded-sm"
              alt="song artwork"
              decoding="async"
              loading="eager"
            />
          </div>
          <div className="about  md:flex w-4/5 lg:w-8/12 flex-col p-1 px-3 justify-evenly">
            <div className="artist text-sm overflow-hidden whitespace-nowrap truncate text-neutral-300">
              {song?.currentSong?.artist}
            </div>
            <div className="title overflow-hidden whitespace-nowrap truncate">{song?.currentSong?.title}</div>
          </div>
          <div className="action w-1/5 md:w-max flex items-center justify-center">
            <button
              className="flex items-center justify-center aspect-square rounded-full"
              onClick={favoriteUnfavorite}
              aria-label="favorite controller"
            >
              {isFavorite ? (
                <FavoriteIcon className="mx-2 text-rose-600" />
              ) : (
                <FavoriteBorderIcon className="mx-2 text-neutral-300" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
