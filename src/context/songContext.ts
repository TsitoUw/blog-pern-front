import { Dispatch, SetStateAction, createContext } from "react";
import { SongAttributes, SongMassive } from "../types/Audio";

export const SongContext = createContext<{
  currentSong:SongAttributes|SongMassive|null,
  setCurrentSong:Dispatch<SetStateAction<SongAttributes|SongMassive|null>>
}|null>(null)