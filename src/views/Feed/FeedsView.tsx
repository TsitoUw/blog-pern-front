import { useEffect, useState } from "react";
import { SongMassive } from "../../types/Song";
import songService from "../../services/song.service";
import SongCard from "../../components/parts/SongCard";
import "./FeedsView.css"
import Carousel from "../../components/container/Carousel";

const FeedsView = () => {
  const [songs, setSongs] = useState<Array<SongMassive>>([]);

  async function getSongs() {
    const songs = await songService.get();
    setSongs(songs);
  }

  useEffect(() => {
    getSongs();
  }, []);


  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="w-11/12 flex flex-col ">
        <p className="p-2 text-neutral-400">Fresh songs</p>
        <div className="flex items-center justify-center">
          <Carousel>
            {songs.length > 0
              ? songs.map((song, index) => {
                return (
                  <div className="content" key={index}>
                    <SongCard song={song} />
                  </div>
                );
              })
              : null}
          </Carousel>
        </div>

      </div>
    </div>
  );
};

export default FeedsView;
