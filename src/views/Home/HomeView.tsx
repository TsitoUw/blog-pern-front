import { useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SongStateContext } from "../../context/songStateContext";
import NavBar from "../../components/parts/NavBar";
import defaultArtwork from '../../assets/default-artwork.png'
const HomeView = () => {
  const navigate = useNavigate();
  const songState = useContext(SongStateContext);

  useEffect(() => {
    songState?.setIsPlaying(false);
    return songState?.setIsPlaying(false);
  }, []);
  
  return (
    <div className="relative">
      <NavBar />

      <div className="hero | shadow-lg my-5 w-full bg-slate-900 min-h-[250px] flex flex-col lg:flex-row p-5 lg:px-32 h-full">

        <div className="texts | flex-[70%] flex flex-col items-center justify-center gap-2 lg:gap-7">
          <div className="w-full text-4xl lg:text-6xl font-medium">It is <span className="underline underline-offset-4">just</span> something</div>
          <div className="w-full flex text-neutral-300">
            Welcome to Musicc, discovers new artist, listen to your favorite song and so much more.
          </div>
        </div>

        <div className="trends flex-[20%] flex flex-col h-full">
          <div className="flex-[90%] w-full lg:flex items-center justify-center hidden">
            <img className="w-4/5 aspect-square overflow-hidden object-cover" src={defaultArtwork} alt="test"/>
          </div>
          <div className="w-full lg:flex-[10%] flex items-end justify-center">
            <button aria-label="go to feeds" className="button-main w-1/2" onClick={() => navigate("/")}>
              DISCOVER NOW
            </button>
          </div>
        </div>
      </div>

      <div className="content | flex flex-col p-4">
        <div className="flex flex-col items-center">
          <div className="">
            Start your journey with us, <span className="underline">upload</span> your songs follow your favorite artist save songs and so on by{" "}
            <Link to="/signup" about="signup">
              registering
            </Link>{" "}
            now.
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
