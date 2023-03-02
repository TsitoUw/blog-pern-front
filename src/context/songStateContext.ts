import { Dispatch, SetStateAction, createContext } from "react";



export const SongStateContext = createContext<{
  isPlaying:boolean,
  setIsPlaying:Dispatch<SetStateAction<boolean>>
}|null>(null)