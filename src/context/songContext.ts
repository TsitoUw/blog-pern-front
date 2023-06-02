import { Dispatch, SetStateAction, createContext } from "react";
import { SongAttributes, SongMassive } from "../types/Song";

export const SongContext = createContext<{
  currentSong:SongAttributes|SongMassive|null,
  setCurrentSong:Dispatch<SetStateAction<SongAttributes|SongMassive|null>>
}|null>(null)