import { SongMassive } from "../types/Audio";
import axios from "./axios";

class SongService {
  async get(){
    const res:any = await axios.get("/songs/")
    return res.data.songs as Array<SongMassive>;
  }
}

export default new SongService();