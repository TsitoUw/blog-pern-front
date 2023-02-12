import { Dispatch, SetStateAction, createContext } from "react";
import { SongAttributes } from "../types/Audio";

export const SongContext = createContext<{
  currentSong:SongAttributes|null,
  setCurrentSong:Dispatch<SetStateAction<SongAttributes|null>>
}|null>(null)